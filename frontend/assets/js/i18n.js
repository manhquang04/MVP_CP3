/**
 * WanderTale i18n - Multi-language support (EN/VI)
 */
window.i18n = {
    currentLang: localStorage.getItem('lang') || 'vi',

    translations: {
        en: {
            // Common
            appName: 'WanderTale',
            loading: 'Loading...',
            save: 'Save',
            cancel: 'Cancel',
            delete: 'Delete',
            edit: 'Edit',
            create: 'Create',
            search: 'Search',
            searchPlaceholder: 'Search...',
            noResults: 'No results found',
            error: 'An error occurred',
            success: 'Success',
            confirm: 'Confirm',
            back: 'Back',
            next: 'Next',
            submit: 'Submit',

            // Navigation
            home: 'Home',
            explore: 'Explore',
            planner: 'Planner',
            stories: 'Stories',
            profile: 'Profile',
            logout: 'Log Out',
            login: 'Login',
            signup: 'Sign Up',
            exploreFeatures: 'Explore Features',
            scrollToExplore: 'Scroll to explore',
            heroTurnJourney: 'Turn your journey',
            heroIntoStory: 'into a ',
            storyWord: 'Story',
            heroSubtitleCopy: 'Thoughtfully crafted journeys for modern explorers. Discover freely, travel deeply, share beautifully.',
            startAdventure: 'Start your adventure',
            poweredByAI: 'Powered by AI',
            yourAICompanion: 'Your AI Travel Companion',
            discoverAIFeatures: 'Discover how our AI-powered features transform the way you plan, explore, and share your travel experiences.',
            aiVibeCheck: 'AI Vibe Check',
            aiVibeCheckDesc: 'Match your current mood to the perfect destination. Our AI suggests hidden gems based on your aesthetic preferences and energy.',
            autoMagicTimeline: 'Auto-Magic Timeline',
            autoMagicTimelineDesc: 'Turn your chaotic camera roll into a beautifully narrated story. We automatically organize photos into a seamless journey.',
            socialSync: 'Social Sync',
            socialSyncDesc: 'Share epic journeys seamlessly across platforms. Collaborate with friends on itineraries and create shared travel memories.',
            smartRoutePlanning: 'Smart Route Planning',
            smartRoutePlanningDesc: 'AI optimizes your itinerary based on time, budget, and interests. Never miss a must-see spot or waste time on inefficient routes.',
            aiAssistant24_7: '24/7 AI Assistant',
            aiAssistant24_7Desc: 'Get instant answers about destinations, local tips, and travel hacks. Your personal travel expert, always in your pocket.',
            photoStories: 'Photo Stories',
            photoStoriesDesc: 'Transform your travel photos into stunning visual stories. AI-powered editing and automatic captioning make sharing effortless.',
            testimonialsLabel: 'Testimonials',
            trustedByExplorers: 'Trusted by explorers',
            aroundTheWorld: 'around the world',
            fromTravelers: 'from 50,000+ travelers',
            joinThousands: 'Join thousands of adventurers who\'ve discovered their perfect journey with WanderTale',
            readTravelStories: 'Read Travel Stories',
            testimonial1: 'WanderTale transformed my travels!',
            testimonial2: 'Best travel companion ever!',
            testimonial3: 'Found hidden gems!',
            testimonial4: 'Perfectly planned trips!',
            testimonial5: 'Unforgettable solo trip!',
            testimonial6: 'Amazing local guides!',
            testimonial7: 'Every detail was perfect!',
            testimonial8: 'Saved hours of planning!',
            asFeaturedIn: 'As Featured In',
            seeInAction: 'See WanderTale in Action',
            watchHow: 'Watch how travelers are using AI to plan unforgettable trips, discover hidden gems, and create stunning travel stories that go viral.',
            getStartedFree: 'Get Started Free',
            viewStories: 'View Stories',
            exploreNearby: 'Explore Nearby',
            locationPlaceholder: 'Enter city or address...',
            typePlaceholder: 'Type (e.g. restaurant, cafe, hotel...)',
            useMyLocation: 'Use my location',
            detectingLocation: 'Detecting your location...',
            quickCategories: 'Quick Categories',
            all: 'All',
            restaurants: 'Restaurants',
            cafes: 'Cafes',
            attractions: 'Attractions',
            hotels: 'Hotels',
            bars: 'Bars',
            nearbyPlaces: 'Nearby Places',
            placesCount: 'places',
            travelTales: 'Travel Tales',
            travelTalesDesc: 'Get inspired by our community\'s AI-generated travel stories.',
            allTales: 'All Tales',
            tagHealing: '#Healing',
            tagAdrenaline: '#Adrenaline',
            tagFoodie: '#Foodie',
            tagCulture: '#Culture',
            wanderTaleAIFeatures: 'WanderTale AI Features',
            discoverHowAI: 'Discover how our AI-powered travel planning and storytelling web application can help you explore Vietnam like never before.',
            aiVibeCheckDescFeature: 'Match your current mood to the perfect destination. Our AI suggests hidden gems and hotspots based on your aesthetic preferences.',
            autoMagicTimelineDescFeature: 'Turn your chaotic camera roll into a beautifully narrated story. We automatically organize your photos into a seamless journey.',
            socialSyncDescFeature: 'Share your epic journeys seamlessly across platforms. Collaborate with friends on itineraries and create shared travel memories.',
            learnMore: 'Learn more',
            startYourJourney: 'Start Your Journey',
            following: 'Following',
            followers: 'Followers',
            journeys: 'Journeys',
            myStories: 'My Stories',
            gallery: 'Gallery',
            achievements: 'Achievements',
            backToMyProfile: 'Back to My Profile',
            follow: 'Follow',
            message: 'Message',
            viewAll: 'View All',
            aiSummary: 'AI Summary',
            updateTravelPersona: 'Update your travel persona',
            changePhoto: 'Change Photo',
            websiteSocial: 'Website / Social',
            socialConnections: 'Social Connections',
            yourName: 'Your Name',
            tellWorldPlaceholder: 'Tell the world about your adventures...',
            cityCountryPlaceholder: 'City, Country',
            locationLabel: 'Location',
            backToPlanner: 'Back to Planner',
            createTripSubtitle: 'Fill in the details and let AI plan the perfect journey for you',
            destinationLabel: 'Destination',
            destinationPlaceholder: 'e.g. Da Lat, Phu Quoc, Hanoi...',
            startDateLabel: 'Start Date',
            endDateLabel: 'End Date',
            budgetLabel: 'Budget',
            budgetLow: 'Budget-friendly',
            travelVibeLabel: 'Travel vibe',
            chillCoffee: 'Chill & Coffee',
            nightlife: 'Nightlife',
            beachResort: 'Beach & Resort',
            premium: 'Premium',
            generateMyPlan: 'Generate My Plan',
            orContinueWithEmail: 'Or continue with email',
            confirmNewPassword: 'Confirm New Password',
            recentTrips: 'Recent trips',
            tripHistory: 'Trip history',
            createTrip: 'Create new trip',
            backToHome: 'Back to Home',
            backToProfile: 'Back to Profile',

            // Auth
            welcomeBack: 'Welcome back',
            readyForAdventure: 'Ready for your next adventure?',
            email: 'Email Address',
            password: 'Password',
            confirmPassword: 'Confirm Password',
            currentPassword: 'Current Password',
            newPassword: 'New Password',
            forgotPassword: 'Forgot?',
            signInToJourney: 'Sign In to Journey',
            createAccount: 'Create Account',
            joinExplorers: 'Join 20k+ explorers',
            orContinueWith: 'Or continue with',
            fullName: 'Full Name',
            username: 'Username',
            alreadyHaveAccount: 'Already have an account?',
            signinHere: 'Sign in here',
            passwordMinLength: 'Password must be at least 8 characters',
            passwordLettersNumbers: 'Password must contain both letters and numbers',
            passwordMismatch: 'Passwords do not match',
            changePassword: 'Change Password',
            updatePassword: 'Update Password',
            passwordUpdated: 'Password updated successfully. Redirecting...',

            // Planner
            selectTrip: 'Select a trip from sidebar to view details',
            orCreateNew: 'Or create a new trip',
            selectTripMap: 'Select a trip to view on map',
            confirmDelete: 'Are you sure you want to delete this trip?',
            deleteSuccess: 'Trip deleted successfully!',
            saveSuccess: 'Plan saved successfully!',
            noTrips: 'No trips yet',

            // Trip types
            hotel: 'Hotel',
            food: 'Food',
            sightseeing: 'Sightseeing',
            nature: 'Nature',
            shopping: 'Shopping',
            cafe: 'Cafe',
            entertainment: 'Entertainment',

            // Trip details
            day: 'Day',
            minutes: 'min',
            tripDetails: 'Trip Details',
            itinerary: 'Itinerary',
            savePlan: 'Save Plan',
            editPlan: 'Edit Plan',
            destination: 'Destination',
            duration: 'Duration',
            budget: 'Budget',
            vibe: 'Vibe',
            startDate: 'Start Date',
            endDate: 'End Date',

            // Create trip
            planYourTrip: 'Plan Your Trip',
            whereTo: 'Where do you want to go?',
            howLong: 'How many days?',
            budgetLevel: 'Budget level',
            travelVibe: 'Travel vibe',
            generatePlan: 'Generate Plan',
            generating: 'Generating...',
            days: 'days',

            // Budget levels
            budget: 'Budget',
            moderate: 'Moderate',
            comfortable: 'Comfortable',
            luxury: 'Luxury',

            // Vibe options
            adventure: 'Adventure',
            relax: 'Relax',
            culture: 'Culture',
            foodie: 'Foodie',
            photography: 'Photography',

            // Profile
            myProfile: 'My Profile',
            editProfile: 'Edit Profile',
            changeAvatar: 'Change Avatar',
            bio: 'Bio',
            memberSince: 'Member since',
            myTrips: 'My Trips',
            savedPlaces: 'Saved Places',
            settings: 'Settings',
            accountSettings: 'Account Settings',

            // Map
            viewOnMap: 'View on Map',
            getDirections: 'Get Directions',
            nearby: 'Nearby',

            // Stories
            communityStories: 'Community Stories',
            shareStory: 'Share Your Story',
            readMore: 'Read More',
            writeStory: 'Write a Story',
            publishStory: 'Publish Story',

            // Features
            features: 'Features',
            feature1Title: 'AI-Powered Planning',
            feature1Desc: 'Get personalized itineraries tailored to your preferences',
            feature2Title: 'Local Insights',
            feature2Desc: 'Discover hidden gems with recommendations from locals',
            feature3Title: 'Smart Maps',
            feature3Desc: 'Navigate easily with integrated mapping and directions',

            // Hero
            heroTitle: 'Explore the unseen side of Vietnam',
            heroSubtitle: 'Connect with locals, find hidden gems, and write your own travel narrative',
            getStarted: 'Get Started',
            learnMore: 'Learn More',

            // Errors
            loginFailed: 'Login failed. Please try again.',
            signupFailed: 'Signup failed. Please try again.',
            required: 'This field is required',
            invalidEmail: 'Please enter a valid email address',
            agreeTerms: 'Please agree to the Terms of Service and Privacy Policy',

            // Auth Gate
            authGateTitle: 'Sign in to continue',
            authGateDesc: 'Please log in or create an account to access this feature.',

            // Login page
            loginHeroTitle: 'Explore the <span class="text-primary italic">unseen</span> side of Vietnam.',
            loginHeroSubtitle: 'Connect with locals, find hidden gems, and write your own travel narrative.',
            liveNow: 'Live Now',

            // Signup page
            welcomeToFold: 'Welcome to the fold',
            yourNextStory: 'Your next story <span class="text-primary">starts here.</span>',
            aiTravelPlanning: 'AI Travel Planning',
            aiTravelPlanningDesc: 'Generate personalized itineraries in seconds based on your vibes.',
            sharedStories: 'Shared Stories',
            sharedStoriesDesc: 'Connect with a global community and share your hidden gems.',
            offlineMaps: 'Offline Maps',
            offlineMapsDesc: 'Never get lost again with our premium offline navigation tools.',
            passwordHint: 'Must be at least 8 characters with a mix of letters and numbers.',
            termsAgree: 'I agree to WanderTale\'s',
            termsOfService: 'Terms of Service',
            privacyPolicy: 'Privacy Policy',
            termsAnd: 'and',
            whyJoin: 'Why join?',
            freeAIItineraries: 'Free AI Travel Itineraries',
            connectExplorers: 'Connect with 5,000+ Explorers',
            signupTestimonial: '"WanderTale changed how I travel!"',
            signupTestimonialAuthor: '— Elena, Digital Nomad',
            alreadyHaveAccountQ: 'Already have an account?',
            
            // New Create & Itinerary
            travelersLabel: 'Travelers',
            notesLabel: 'Additional Notes (Optional)',
            notesPlaceholder: 'e.g. Want to visit night markets, traveling with kids...',
            mapHint: 'Enter destination to view on map',
            aiPlanning: 'AI is planning your trip',
            aiAnalyzing: 'Analyzing destination and creating optimal itinerary...',
            sharePlanLabel: 'Share Plan',
            planParticipants: 'Trip Participants',
            ownerOnlyNote: 'Only the trip creator can invite others and change roles (view/edit).',
            emailInvitePlaceholder: 'Enter email to invite',
            roleViewer: 'Viewer',
            roleEditor: 'Editor',
            inviteBtn: 'Invite',
            noPlanYet: 'No plan yet.',
            createNewTrip: 'Create new trip',
            estimatedCost: 'Estimated cost',
            changeHotel: 'Change hotel',
            changePlace: 'Change place'
        },

        vi: {
            // Common
            appName: 'WanderTale',
            loading: 'Đang tải...',
            save: 'Lưu',
            cancel: 'Hủy',
            delete: 'Xóa',
            edit: 'Chỉnh sửa',
            create: 'Tạo',
            search: 'Tìm kiếm',
            searchPlaceholder: 'Tìm kiếm...',
            noResults: 'Không tìm thấy kết quả',
            error: 'Đã xảy ra lỗi',
            success: 'Thành công',
            confirm: 'Xác nhận',
            back: 'Quay lại',
            next: 'Tiếp theo',
            submit: 'Gửi',

            // Navigation
            home: 'Trang chủ',
            explore: 'Khám phá',
            planner: 'Lên kế hoạch',
            stories: 'Stories',
            profile: 'Hồ sơ',
            exploreFeatures: 'Khám phá tính năng',
            scrollToExplore: 'Cuộn để khám phá',
            heroTurnJourney: 'Đưa hành trình',
            heroIntoStory: 'của bạn thành ',
            storyWord: 'Câu chuyện',
            heroSubtitleCopy: 'Lên kế hoạch chuyến đi trọn vẹn. Tự do khám phá, trải nghiệm trọn vẹn, lưu giữ từng khoảnh khắc.',
            startAdventure: 'Bắt đầu hành trình',
            poweredByAI: 'Hỗ trợ bởi AI',
            yourAICompanion: 'Bạn đồng hành Du lịch AI',
            discoverAIFeatures: 'Khám phá cách tính năng AI biến đổi cách bạn lên kế hoạch, khám phá và chia sẻ trải nghiệm du lịch.',
            aiVibeCheck: 'Kiểm tra phong cách AI',
            aiVibeCheckDesc: 'Khớp tâm trạng hiện tại với điểm đến hoàn hảo. AI gợi ý những viên ngọc ẩn theo sở thích và năng lượng của bạn.',
            autoMagicTimeline: 'Dòng thời gian Tự động',
            autoMagicTimelineDesc: 'Biến thư viện ảnh lộn xộn thành câu chuyện kể đẹp. Chúng tôi tự động sắp xếp ảnh thành hành trình liền mạch.',
            socialSync: 'Đồng bộ mạng xã hội',
            socialSyncDesc: 'Chia sẻ hành trình hoàn hảo trên mọi nền tảng. Cùng bạn bè lên lịch trình và tạo ký ức du lịch chung.',
            smartRoutePlanning: 'Lên lộ trình thông minh',
            smartRoutePlanningDesc: 'AI tối ưu lịch trình theo thời gian, ngân sách và sở thích. Không bỏ lỡ điểm đến hay lãng phí thời gian.',
            aiAssistant24_7: 'Trợ lý AI 24/7',
            aiAssistant24_7Desc: 'Nhận câu trả lời tức thì về điểm đến, mẹo địa phương và bí quyết du lịch. Chuyên gia du lịch trong túi bạn.',
            photoStories: 'Câu chuyện ảnh',
            photoStoriesDesc: 'Biến ảnh du lịch thành câu chuyện hình ảnh ấn tượng. Chỉnh sửa AI và chú thích tự động giúp chia sẻ dễ dàng.',
            testimonialsLabel: 'Đánh giá',
            trustedByExplorers: 'Được tin dùng bởi cộng đồng yêu khám phá',
            aroundTheWorld: 'trên khắp thế giới',
            fromTravelers: 'từ 50.000+ khách du lịch',
            joinThousands: 'Tham gia hàng nghìn người đã tìm thấy hành trình hoàn hảo với WanderTale',
            readTravelStories: 'Đọc Câu chuyện Du lịch',
            testimonial1: 'WanderTale đã thay đổi chuyến đi của tôi!',
            testimonial2: 'Bạn đồng hành du lịch tuyệt nhất!',
            testimonial3: 'Tìm được những viên ngọc ẩn!',
            testimonial4: 'Chuyến đi được lên kế hoạch hoàn hảo!',
            testimonial5: 'Chuyến đi một mình không thể quên!',
            testimonial6: 'Hướng dẫn viên địa phương tuyệt vời!',
            testimonial7: 'Mọi chi tiết đều hoàn hảo!',
            testimonial8: 'Tiết kiệm hàng giờ lên kế hoạch!',
            asFeaturedIn: 'Được giới thiệu trên',
            seeInAction: 'Xem WanderTale trong Hành động',
            watchHow: 'Xem cách khách du lịch dùng AI để lên kế hoạch chuyến đi khó quên, khám phá viên ngọc ẩn và tạo câu chuyện du lịch viral.',
            getStartedFree: 'Dùng thử miễn phí',
            viewStories: 'Xem Câu chuyện',
            exploreNearby: 'Khám phá gần đây',
            locationPlaceholder: 'Nhập thành phố hoặc địa chỉ...',
            typePlaceholder: 'Loại (vd: nhà hàng, quán cà phê, khách sạn...)',
            useMyLocation: 'Dùng vị trí của tôi',
            detectingLocation: 'Đang xác định vị trí...',
            quickCategories: 'Danh mục nhanh',
            all: 'Tất cả',
            restaurants: 'Nhà hàng',
            cafes: 'Quán cà phê',
            attractions: 'Điểm tham quan',
            hotels: 'Khách sạn',
            bars: 'Quán bar',
            nearbyPlaces: 'Địa điểm gần đây',
            placesCount: 'địa điểm',
            travelTales: 'Câu chuyện Du lịch',
            travelTalesDesc: 'Lấy cảm hứng từ câu chuyện du lịch do AI tạo của cộng đồng.',
            allTales: 'Tất cả',
            tagHealing: '#Thư giãn',
            tagAdrenaline: '#Phiêu lưu',
            tagFoodie: '#Ẩm thực',
            tagCulture: '#Văn hóa',
            wanderTaleAIFeatures: 'Tính năng AI WanderTale',
            discoverHowAI: 'Khám phá cách ứng dụng lập kế hoạch và kể chuyện du lịch bằng AI giúp bạn khám phá Việt Nam theo cách mới.',
            aiVibeCheckDescFeature: 'Khớp tâm trạng hiện tại với điểm đến hoàn hảo. AI gợi ý viên ngọc ẩn theo sở thích thẩm mỹ của bạn.',
            autoMagicTimelineDescFeature: 'Biến thư viện ảnh lộn xộn thành câu chuyện kể đẹp. Chúng tôi tự động sắp xếp ảnh thành hành trình liền mạch.',
            socialSyncDescFeature: 'Chia sẻ hành trình hoàn hảo trên mọi nền tảng. Cùng bạn bè lên lịch trình và tạo ký ức du lịch chung.',
            learnMore: 'Tìm hiểu thêm',
            startYourJourney: 'Bắt đầu hành trình',
            following: 'Đang theo dõi',
            followers: 'Người theo dõi',
            journeys: 'Hành trình',
            myStories: 'Câu chuyện của tôi',
            gallery: 'Thư viện ảnh',
            achievements: 'Thành tựu',
            backToMyProfile: 'Về hồ sơ của tôi',
            follow: 'Theo dõi',
            message: 'Nhắn tin',
            viewAll: 'Xem tất cả',
            aiSummary: 'Tóm tắt AI',
            updateTravelPersona: 'Cập nhật phong cách du lịch của bạn',
            changePhoto: 'Đổi ảnh',
            websiteSocial: 'Website / Mạng xã hội',
            socialConnections: 'Kết nối mạng xã hội',
            yourName: 'Tên của bạn',
            tellWorldPlaceholder: 'Kể với mọi người về hành trình của bạn...',
            cityCountryPlaceholder: 'Thành phố, Quốc gia',
            locationLabel: 'Địa điểm',
            backToPlanner: 'Quay lại Planner',
            createTripSubtitle: 'Điền thông tin để AI lên kế hoạch hành trình hoàn hảo cho bạn',
            destinationLabel: 'Điểm đến',
            destinationPlaceholder: 'VD: Đà Lạt, Phú Quốc, Hà Nội...',
            startDateLabel: 'Ngày bắt đầu',
            endDateLabel: 'Ngày kết thúc',
            budgetLabel: 'Ngân sách',
            budgetLow: 'Tiết kiệm',
            travelVibeLabel: 'Phong cách chuyến đi',
            chillCoffee: 'Chill & Cà phê',
            nightlife: 'Đời sống về đêm',
            beachResort: 'Biển & Nghỉ dưỡng',
            premium: 'Cao cấp',
            generateMyPlan: 'Tạo kế hoạch của tôi',
            orContinueWithEmail: 'Hoặc tiếp tục với email',
            confirmNewPassword: 'Xác nhận mật khẩu mới',
            logout: 'Đăng xuất',
            login: 'Đăng nhập',
            signup: 'Đăng ký',
            recentTrips: 'Chuyến đi gần đây',
            tripHistory: 'Lịch sử chuyến đi',
            createTrip: 'Tạo chuyến đi mới',
            backToHome: 'Về trang chủ',
            backToProfile: 'Về hồ sơ',

            // Auth
            welcomeBack: 'Chào mừng trở lại',
            readyForAdventure: 'Sẵn sàng cho chuyến phiêu lưu tiếp theo?',
            email: 'Địa chỉ Email',
            password: 'Mật khẩu',
            confirmPassword: 'Xác nhận mật khẩu',
            currentPassword: 'Mật khẩu hiện tại',
            newPassword: 'Mật khẩu mới',
            forgotPassword: 'Quên?',
            signInToJourney: 'Đăng nhập hành trình',
            createAccount: 'Tạo tài khoản',
            joinExplorers: 'Tham gia cùng 20k+ nhà khám phá',
            orContinueWith: 'Hoặc tiếp tục với',
            fullName: 'Họ và tên',
            username: 'Tên người dùng',
            alreadyHaveAccount: 'Đã có tài khoản?',
            signinHere: 'Đăng nhập tại đây',
            passwordMinLength: 'Mật khẩu phải có ít nhất 8 ký tự',
            passwordLettersNumbers: 'Mật khẩu phải chứa cả chữ và số',
            passwordMismatch: 'Mật khẩu không khớp',
            changePassword: 'Đổi mật khẩu',
            updatePassword: 'Cập nhật mật khẩu',
            passwordUpdated: 'Đã cập nhật mật khẩu. Đang chuyển hướng...',

            // Planner
            selectTrip: 'Chọn một chuyến đi từ sidebar để xem chi tiết',
            orCreateNew: 'Hoặc tạo chuyến đi mới',
            selectTripMap: 'Chọn một chuyến đi để xem trên bản đồ',
            confirmDelete: 'Bạn có chắc muốn xóa chuyến đi này?',
            deleteSuccess: 'Đã xóa chuyến đi thành công!',
            saveSuccess: 'Đã lưu kế hoạch thành công!',
            noTrips: 'Chưa có chuyến đi nào',

            // Trip types
            hotel: 'Khách sạn',
            food: 'Ẩm thực',
            sightseeing: 'Tham quan',
            nature: 'Thiên nhiên',
            shopping: 'Mua sắm',
            cafe: 'Cà phê',
            entertainment: 'Giải trí',

            // Trip details
            day: 'Ngày',
            minutes: 'phút',
            tripDetails: 'Chi tiết chuyến đi',
            itinerary: 'Lịch trình',
            savePlan: 'Lưu kế hoạch',
            editPlan: 'Chỉnh sửa kế hoạch',
            destination: 'Điểm đến',
            duration: 'Thời lượng',
            budget: 'Ngân sách',
            vibe: 'Phong cách',
            startDate: 'Ngày bắt đầu',
            endDate: 'Ngày kết thúc',

            // Create trip
            planYourTrip: 'Lên kế hoạch chuyến đi',
            whereTo: 'Bạn muốn đi đâu?',
            howLong: 'Đi bao nhiêu ngày?',
            budgetLevel: 'Mức ngân sách',
            travelVibe: 'Phong cách du lịch',
            generatePlan: 'Tạo kế hoạch',
            generating: 'Đang tạo...',
            days: 'ngày',

            // Budget levels
            budget: 'Tiết kiệm',
            moderate: 'Vừa phải',
            comfortable: 'Thoải mái',
            luxury: 'Sang trọng',

            // Vibe options
            adventure: 'Phiêu lưu',
            relax: 'Thư giãn',
            culture: 'Văn hóa',
            foodie: 'Ẩm thực',
            photography: 'Nhiếp ảnh',

            // Profile
            myProfile: 'Hồ sơ của tôi',
            editProfile: 'Chỉnh sửa hồ sơ',
            changeAvatar: 'Đổi ảnh đại diện',
            bio: 'Giới thiệu',
            memberSince: 'Thành viên từ',
            myTrips: 'Chuyến đi của tôi',
            savedPlaces: 'Địa điểm đã lưu',
            settings: 'Cài đặt',
            accountSettings: 'Cài đặt tài khoản',

            // Map
            viewOnMap: 'Xem trên bản đồ',
            getDirections: 'Chỉ đường',
            nearby: 'Gần đây',

            // Stories
            communityStories: 'Câu chuyện cộng đồng',
            shareStory: 'Chia sẻ câu chuyện',
            readMore: 'Xem thêm',
            writeStory: 'Viết câu chuyện',
            publishStory: 'Đăng câu chuyện',

            // Features
            features: 'Tính năng',
            feature1Title: 'Lập kế hoạch với AI',
            feature1Desc: 'Nhận lịch trình cá nhân hóa theo sở thích của bạn',
            feature2Title: 'Góc nhìn địa phương',
            feature2Desc: 'Khám phá những viên ngọc ẩn với gợi ý từ người dân',
            feature3Title: 'Bản đồ thông minh',
            feature3Desc: 'Dễ dàng điều hướng với bản đồ tích hợp',

            // Hero
            heroTitle: 'Khám phá Việt Nam khác biệt',
            heroSubtitle: 'Kết nối với người dân địa phương, tìm những điểm đến độc đáo',
            getStarted: 'Bắt đầu',
            learnMore: 'Tìm hiểu thêm',

            // Errors
            loginFailed: 'Đăng nhập thất bại. Vui lòng thử lại.',
            signupFailed: 'Đăng ký thất bại. Vui lòng thử lại.',
            required: 'Trường này là bắt buộc',
            invalidEmail: 'Vui lòng nhập email hợp lệ',
            agreeTerms: 'Vui lòng đồng ý với Điều khoản dịch vụ và Chính sách bảo mật',

            // Auth Gate
            authGateTitle: 'Đăng nhập để tiếp tục',
            authGateDesc: 'Vui lòng đăng nhập hoặc tạo tài khoản để sử dụng tính năng này.',

            // Login page
            loginHeroTitle: 'Khám phá <span class="text-primary italic">những điều chưa thấy</span> của Việt Nam.',
            loginHeroSubtitle: 'Kết nối với người dân địa phương, tìm những viên ngọc ẩn và viết câu chuyện du lịch của riêng bạn.',
            liveNow: 'Đang mở',

            // Signup page
            welcomeToFold: 'Chào mừng bạn đến',
            yourNextStory: 'Câu chuyện tiếp theo <span class="text-primary">bắt đầu từ đây.</span>',
            aiTravelPlanning: 'Lên kế hoạch bằng AI',
            aiTravelPlanningDesc: 'Tạo lịch trình cá nhân hóa trong vài giây dựa trên phong cách của bạn.',
            sharedStories: 'Chia sẻ câu chuyện',
            sharedStoriesDesc: 'Kết nối với cộng đồng toàn cầu và chia sẻ những viên ngọc ẩn.',
            offlineMaps: 'Bản đồ ngoại tuyến',
            offlineMapsDesc: 'Không bao giờ lạc đường với công cụ điều hướng ngoại tuyến cao cấp.',
            passwordHint: 'Tối thiểu 8 ký tự, bao gồm cả chữ và số.',
            termsAgree: 'Tôi đồng ý với',
            termsOfService: 'Điều khoản dịch vụ',
            privacyPolicy: 'Chính sách bảo mật',
            termsAnd: 'và',
            whyJoin: 'Tại sao tham gia?',
            freeAIItineraries: 'Lịch trình du lịch AI miễn phí',
            connectExplorers: 'Kết nối với 5.000+ nhà khám phá',
            signupTestimonial: '"WanderTale đã thay đổi cách tôi du lịch!"',
            signupTestimonialAuthor: '— Elena, Du mục kỹ thuật số',
            alreadyHaveAccountQ: 'Đã có tài khoản?',
            
            // New Create & Itinerary
            travelersLabel: 'Số người đi',
            notesLabel: 'Ghi chú thêm (tùy chọn)',
            notesPlaceholder: 'VD: Muốn thăm chợ đêm, có trẻ em đi cùng...',
            mapHint: 'Nhập điểm đến để xem vị trí trên bản đồ',
            aiPlanning: 'AI đang lên kế hoạch',
            aiAnalyzing: 'Đang phân tích điểm đến và tạo hành trình tối ưu...',
            sharePlanLabel: 'Chia sẻ kế hoạch',
            planParticipants: 'Người tham gia kế hoạch',
            ownerOnlyNote: 'Chỉ người tạo kế hoạch mới có quyền mời người khác và chỉnh vai trò (chỉ xem / được sửa).',
            emailInvitePlaceholder: 'Nhập email người bạn muốn mời',
            roleViewer: 'Chỉ xem',
            roleEditor: 'Được chỉnh sửa',
            inviteBtn: 'Mời',
            noPlanYet: 'Chưa có kế hoạch.',
            createNewTrip: 'Tạo chuyến đi mới',
            estimatedCost: 'Chi phí ước tính',
            changeHotel: 'Đổi khách sạn khác',
            changePlace: 'Đổi địa điểm khác'
        }
    },

    // Get translation
    t(key) {
        return this.translations[this.currentLang]?.[key] || this.translations['vi']?.[key] || key;
    },

    // Set language
    setLanguage(lang) {
        if (!this.translations[lang]) return;
        this.currentLang = lang;
        localStorage.setItem('lang', lang);
        document.documentElement.lang = lang;

        // Update all translatable elements
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.dataset.i18n;
            const text = this.t(key);
            if (text) el.textContent = text;
        });

        // Update all HTML translatable elements (supports inline HTML like <span>)
        document.querySelectorAll('[data-i18n-html]').forEach(el => {
            const key = el.dataset.i18nHtml;
            const text = this.t(key);
            if (text) el.innerHTML = text;
        });

        // Update all placeholder elements
        document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
            const key = el.dataset.i18nPlaceholder;
            const text = this.t(key);
            if (text) el.placeholder = text;
        });

        // Update all title attributes
        document.querySelectorAll('[data-i18n-title]').forEach(el => {
            const key = el.dataset.i18nTitle;
            const text = this.t(key);
            if (text) el.title = text;
        });

        // Update language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.lang === lang);
        });

        // Dispatch event for custom handlers
        window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    },

    // Initialize
    init() {
        this.setLanguage(this.currentLang);

        // Add click listeners to language buttons
        document.querySelectorAll('.lang-btn').forEach(btn => {
            btn.addEventListener('click', () => this.setLanguage(btn.dataset.lang));
        });
    }
};

// Shorthand function
window.t = (key) => window.i18n.t(key);

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => window.i18n.init());
