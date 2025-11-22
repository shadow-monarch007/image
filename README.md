# Rajesh Photography - Professional Website

A beautiful two-page website for Rajesh Photography studio in Bangalore. Features elegant design, smooth animations, and professional presentation of photography services.

## 🎨 Website Structure

### **Homepage (index.html)**
Professional landing page with:
- **Hero Section** - Full-screen hero with captivating imagery
- **Services** - Pre-Wedding, Wedding, Maternity, Baby & Family, Commercial Events
- **Featured Work** - Grid showcase of recent projects
- **Stats** - 8+ years, 500+ couples, 14K followers
- **About** - Studio introduction and features
- **Contact Form** - Direct inquiry system

### **Portfolio Page (portfolio.html)**
Immersive parallax experience with:
- **Intro Grid** - Featured portfolio items
- **Parallax Scroll** - Full-screen project showcase with smooth scrolling
- **Color Transitions** - Background changes per project
- **Menu Overlay** - Complete project grid view
- **Animated Titles** - Large overlays with project names
- **Scroll Indicators** - Project numbers and navigation

## 📁 File Structure

```
cloneing/
├── index.html              # Homepage
├── portfolio.html          # Portfolio gallery
├── home-style.css         # Homepage styles
├── home-script.js         # Homepage interactions
├── style.css              # Portfolio styles
├── script.js              # Portfolio parallax & animations
├── portfolio-data.js      # Project data
├── images.squarespace-cdn.com/  # Portfolio images
└── README.md              # This file
```

## 🚀 How to Use

### **Option 1: Live Server (VS Code)**
1. Right-click on `index.html`
2. Select "Open with Live Server"
3. Website opens in browser

### **Option 2: Direct Open**
- Double-click `index.html` in file explorer
- Opens in default browser

### **Option 3: Upload to Server**
- Upload all files maintaining folder structure
- Works on any web server (no backend needed)

## ✨ Features

✅ **Professional Design** - Elegant gold/warm tones matching brand
✅ **Smooth Animations** - Parallax, fade-ins, hover effects
✅ **Fully Responsive** - Mobile, tablet, desktop optimized
✅ **Fast Performance** - Lazy loading, optimized animations
✅ **SEO Friendly** - Proper meta tags and semantic HTML
✅ **Contact Form** - Easy inquiry system
✅ **No Dependencies** - Pure vanilla HTML/CSS/JS

## 🎯 Customization

### **Update Services**
Edit `index.html` - Services Section (lines ~85-125)

### **Change Colors**
Edit `home-style.css` CSS variables:
```css
:root {
    --primary-color: #d4a574;  /* Gold color */
    --secondary-color: #1a1a1a;
}
```

### **Add/Edit Portfolio Projects**
Edit `portfolio-data.js`:
```javascript
{
    slug: 'project-name',
    title: 'Project Title',
    color: '#hexcolor',
    isLightColor: true/false,
    image: 'image-url',
    isFeatured: true/false
}
```

### **Update Contact Info**
Edit `index.html` - Contact Section (lines ~230-250)

## 📱 Social Media

- Instagram: @rajesh_photography_
- Followers: 13.9K
- Location: RT Nagar, Bangalore

## 🔧 Technical Details

- **No Build Process** - Works directly
- **No Frameworks** - Vanilla JavaScript only
- **Browser Support** - All modern browsers
- **Performance** - 60fps smooth animations
- **Size** - Lightweight and fast loading

## 📞 Client Information

**Rajesh Photography**
- Services: Weddings, Pre-Wedding, Maternity, Baby, Family, Events
- Location: #551, 2nd Cross, BDA Complex, RT Nagar, Bangalore - 560032
- Coverage: Worldwide
- Experience: 8+ Years
- Projects: 864+

---

**Built with ❤️ for professional photography presentation**

