# WanderTale Frontend

Đây là thư mục chứa các giao diện HTML cho ứng dụng WanderTale - nền tảng lập kế hoạch du lịch và kể chuyện bằng AI.

## 📁 Cấu trúc File

```
frontend/
├── index.html          # Trang danh sách tất cả các giao diện
├── signup.html         # Trang đăng ký
├── login.html          # Trang đăng nhập
├── hero.html           # Trang chủ với hero section
├── map-tour.html       # Bản đồ tour du lịch
├── ai-assistant.html   # Trợ lý AI chat
├── ai-features.html    # Giới thiệu tính năng AI
├── profile.html        # Hồ sơ người dùng
├── ar-night.html       # Chế độ AR ban đêm
└── footer.html         # Footer section
```

## 🎨 Công nghệ sử dụng

- **Tailwind CSS** - Framework CSS utility-first
- **Material Symbols** - Icon set từ Google
- **Space Grotesk** - Font chữ chính
- **Vanilla HTML/CSS/JS** - Không sử dụng framework JS

## 🚀 Cách sử dụng

1. Mở file `index.html` trong trình duyệt để xem danh sách tất cả các trang
2. Click vào từng card để xem chi tiết từng giao diện
3. Các trang đều standalone và có thể xem trực tiếp

## 🎯 Tính năng chính

### 1. Sign Up & Login
- Form đăng ký/đăng nhập đầy đủ
- Social login (Google, Facebook)
- Responsive design
- Dark mode support

### 2. Hero Section
- Hero section ấn tượng với background image
- Call-to-action buttons
- Navigation bar trong suốt

### 3. Map Tour
- Bản đồ tương tác với markers
- Sidebar hiển thị danh sách điểm tham quan
- AI facts cho mỗi địa điểm
- Map controls (zoom, location)

### 4. AI Assistant
- Giao diện chat với AI
- Sidebar lịch sử hội thoại
- Recommendation cards
- Quick action chips

### 5. AI Features
- Grid layout giới thiệu tính năng
- Hover effects
- Card-based design

### 6. User Profile
- Thông tin cá nhân
- Journey cards
- World map với pins
- Badges/Achievements
- Music player widget

### 7. AR Night Mode
- AR overlay interface
- Ghost guide mascot
- Location cards
- Filter chips
- Camera controls

### 8. Footer
- Newsletter signup
- Link columns
- Social icons
- Responsive layout

## 🎨 Design System

### Colors
- **Primary**: `#f48c25` (Orange)
- **Accent Teal**: `#2db5b5`
- **Background Light**: `#f8f7f5`
- **Background Dark**: `#221910`

### Typography
- **Font Family**: Space Grotesk
- **Heading Sizes**: 5xl, 4xl, 3xl, 2xl, xl
- **Body**: base, sm, xs

### Border Radius
- **Default**: 1rem
- **Large**: 2rem
- **Extra Large**: 3rem
- **Full**: 9999px

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## 🌙 Dark Mode

Tất cả các trang đều hỗ trợ dark mode. Để bật dark mode, thêm class `dark` vào thẻ `<html>`:

```html
<html class="dark" lang="en">
```

## 🔧 Customization

Để tùy chỉnh theme, sửa đổi `tailwind.config` trong mỗi file HTML:

```javascript
tailwind.config = {
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                "primary": "#f48c25",
                // Thêm màu tùy chỉnh
            }
        }
    }
}
```

## 📝 Notes

- Các trang sử dụng CDN cho Tailwind CSS và Google Fonts
- Không cần build process
- Tất cả assets (images) sử dụng URLs từ Google Cloud
- Code đã được tối ưu cho performance

## 🎯 Target Audience

Ứng dụng được thiết kế cho **Gen Z travelers** với:
- Modern, trendy design
- AI-powered features
- Social sharing capabilities
- Mobile-first approach

## 📞 Support

Nếu có vấn đề hoặc câu hỏi, vui lòng tạo issue hoặc liên hệ team phát triển.

---

**WanderTale** - Turn your journey into a story ✈️🗺️
