# Requirements Document

## System Requirements

### Browser Compatibility
- **Modern Web Browsers**: Chrome 60+, Firefox 55+, Safari 12+, Edge 79+
- **JavaScript**: ES6+ support required
- **Local Storage**: For caching and preferences (optional)

### Development Environment
- **Web Server**: Any static file server for development
  - Python: `python -m http.server 8000`
  - Node.js: `npx serve .`
  - VS Code: Live Server extension
  - Any other static file server

### Hosting Requirements
- **Static Hosting**: No server-side processing required
- **Supported Platforms**:
  - GitHub Pages
  - Netlify
  - Vercel
  - AWS S3 + CloudFront
  - Any static file hosting service

## Dependencies

### External Libraries
- **Leaflet.js v1.7.1**: Core mapping functionality
  - CDN: `https://unpkg.com/leaflet@1.7.1/dist/leaflet.js`
  - CSS: `https://unpkg.com/leaflet@1.7.1/dist/leaflet.css`

### File Structure Requirements
```
project-root/
├── index.html              # Main application entry point
├── script.js               # Core application logic
├── styles.css              # Application styling
├── logo.png                # Application logo
├── background.jpg          # Background image
├── maps/
│   ├── manifest.json       # Map configuration
│   └── [Map Name]/
│       ├── floors/
│       │   ├── [Floor].jpg # Floor image files
│       │   └── [Floor].json # Floor marker data
│       └── images/
│           ├── Icons/      # Marker icons
│           ├── Chests/     # Chest images
│           ├── Collectables/ # Collectible images
│           └── [Other]/    # Additional image categories
```

## Image Requirements

### Map Images
- **Format**: JPG or PNG
- **Recommended Size**: 1000x1000 pixels minimum
- **Naming**: Must match floor names in manifest.json
- **Location**: `maps/[Map Name]/floors/[Floor Name].jpg`

### Icon Images
- **Format**: PNG (for transparency)
- **Size**: 26x26 pixels (will be scaled automatically)
- **Location**: `maps/[Map Name]/images/Icons/`

### Popup Images
- **Format**: JPG or PNG
- **Max Size**: 500px width recommended
- **Location**: `maps/[Map Name]/images/[Category]/`

## Data Format Requirements

### Manifest Structure
```json
{
  "maps": [
    {
      "name": "Map Name",
      "floors": [
        { "name": "Floor Name" }
      ]
    }
  ]
}
```

### Marker Data Structure
```json
{
  "markers": [
    {
      "name": "Marker Type Name",
      "category": "Category Name",
      "color": "#hexcolor",
      "desc": "Description text",
      "url": "images/Icons/icon.png",
      "points": [
        {
          "x": 100,
          "y": 200,
          "desc": "Point-specific description (optional)",
          "image": "images/Category/image.png (optional)"
        }
      ]
    }
  ]
}
```

## Performance Requirements

### Loading Performance
- **Initial Load**: < 3 seconds on broadband
- **Map Switching**: < 1 second
- **Marker Toggle**: Instant response

### Memory Usage
- **Marker Limit**: 1000+ markers per floor supported
- **Image Optimization**: Compress images for web delivery
- **Caching**: Browser caching enabled via cache headers

## Browser Feature Requirements

### Essential Features
- **Canvas/WebGL**: For map rendering
- **Fetch API**: For loading JSON data
- **ES6 Modules**: For modern JavaScript features
- **CSS Grid/Flexbox**: For responsive layout

### Optional Features
- **Clipboard API**: For dev mode coordinate copying
- **Local Storage**: For user preferences
- **Service Workers**: For offline functionality (future enhancement)

## Accessibility Requirements

### Basic Accessibility
- **Keyboard Navigation**: Tab through interactive elements
- **Screen Reader**: Semantic HTML structure
- **Color Contrast**: WCAG 2.1 AA compliance for text
- **Alt Text**: All images have descriptive alt attributes

### Mobile Compatibility
- **Responsive Design**: Works on mobile devices
- **Touch Events**: Support for touch interactions
- **Mobile View**: Dedicated mobile interface toggle
- **Viewport**: Proper viewport meta tag configuration