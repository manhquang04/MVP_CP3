const express = require('express');
const router = express.Router();
const Trip = require('../models/Trip');
const User = require('../models/User');
const auth = require('../middleware/auth');

// @route   GET /api/trips
// @desc    Get all trips owned by or shared with current user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const trips = await Trip.find({
      $or: [
        { user: req.user.id },
        { 'collaborators.user': req.user.id }
      ]
    })
      .sort({ createdAt: -1 })
      // trả về toàn bộ itinerary để planner có đủ thông tin (hotel address, description, price,...)
      .select('destination duration vibe createdAt updatedAt user collaborators itinerary');
    
    res.json({
      success: true,
      trips
    });
  } catch (error) {
    console.error('Get trips error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   GET /api/trips/:id
// @desc    Get single trip by ID (owner or collaborator)
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findById(req.params.id)
      .populate('user', 'fullName email username')
      .populate('collaborators.user', 'fullName email username');

    if (!trip) {
      return res.status(404).json({ 
        success: false, 
        message: 'Trip not found' 
      });
    }

    const isOwner = trip.user._id.toString() === req.user.id;
    const isCollaborator = trip.collaborators.some(
      (c) => c.user && c.user._id.toString() === req.user.id
    );

    if (!isOwner && !isCollaborator) {
      return res.status(403).json({
        success: false,
        message: 'You do not have access to this trip'
      });
    }

    res.json({
      success: true,
      trip
    });
  } catch (error) {
    console.error('Get trip error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/trips
// @desc    Create a new trip (owner)
// @access  Private
router.post('/', auth, async (req, res) => {
  try {
    const { destination, duration, vibe, itinerary } = req.body;

    const trip = new Trip({
      user: req.user.id,
      destination,
      duration,
      vibe,
      itinerary
    });

    await trip.save();

    res.status(201).json({
      success: true,
      message: 'Trip created successfully',
      trip
    });
  } catch (error) {
    console.error('Create trip error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error',
      detail: error.message 
    });
  }
});

// @route   PUT /api/trips/:id
// @desc    Update a trip (owner or editor)
// @access  Private
router.put('/:id', auth, async (req, res) => {
  try {
    const { destination, duration, vibe, itinerary } = req.body;

    const trip = await Trip.findById(req.params.id);

    if (!trip) {
      return res.status(404).json({ 
        success: false, 
        message: 'Trip not found' 
      });
    }

    // Only owner or collaborator with editor role can update
    const isOwner = trip.user.toString() === req.user.id;
    const collaborator = trip.collaborators.find(c => c.user.toString() === req.user.id);
    const isEditor = collaborator && collaborator.role === 'editor';

    if (!isOwner && !isEditor) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to edit this trip'
      });
    }

    if (destination) trip.destination = destination;
    if (duration) trip.duration = duration;
    if (vibe) trip.vibe = vibe;
    if (itinerary) trip.itinerary = itinerary;
    trip.updatedAt = Date.now();

    await trip.save();

    res.json({
      success: true,
      message: 'Trip updated successfully',
      trip
    });
  } catch (error) {
    console.error('Update trip error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   DELETE /api/trips/:id
// @desc    Delete a trip (owner only)
// @access  Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const trip = await Trip.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id // only owner can delete
    });

    if (!trip) {
      return res.status(404).json({ 
        success: false, 
        message: 'Trip not found' 
      });
    }

    res.json({
      success: true,
      message: 'Trip deleted successfully'
    });
  } catch (error) {
    console.error('Delete trip error:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// @route   POST /api/trips/:id/share
// @desc    Share a trip with another user by email (owner only)
// @access  Private
router.post('/:id/share', auth, async (req, res) => {
  try {
    const { email, role = 'viewer' } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or you are not the owner'
      });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const targetUser = await User.findOne({ email: normalizedEmail });
    if (!targetUser) {
      return res.status(404).json({
        success: false,
        message: 'User with this email not found'
      });
    }

    if (targetUser._id.toString() === req.user.id) {
      return res.status(400).json({
        success: false,
        message: 'You are already the owner of this trip'
      });
    }

    const existing = trip.collaborators.find(
      (c) => c.user.toString() === targetUser._id.toString()
    );
    if (existing) {
      existing.role = role;
      existing.addedAt = new Date();
    } else {
      trip.collaborators.push({ user: targetUser._id, role });
    }

    await trip.save();

    await trip.populate('collaborators.user', 'fullName email');

    res.json({
      success: true,
      message: 'Trip shared successfully',
      collaborators: trip.collaborators
    });
  } catch (error) {
    console.error('Share trip error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// @route   DELETE /api/trips/:id/share/:userId
// @desc    Remove a collaborator from a trip (owner only)
// @access  Private
router.delete('/:id/share/:userId', auth, async (req, res) => {
  try {
    const trip = await Trip.findOne({ _id: req.params.id, user: req.user.id });
    if (!trip) {
      return res.status(404).json({
        success: false,
        message: 'Trip not found or you are not the owner'
      });
    }

    trip.collaborators = trip.collaborators.filter(
      c => c.user.toString() !== req.params.userId
    );
    await trip.save();

    res.json({
      success: true,
      message: 'Collaborator removed',
      collaborators: trip.collaborators
    });
  } catch (error) {
    console.error('Remove collaborator error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;