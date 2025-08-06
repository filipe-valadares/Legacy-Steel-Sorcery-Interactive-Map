# Technology Stack

## Frontend Technologies

### Core Technologies
- **HTML5**: Semantic markup and structure
- **CSS3**: Styling, animations, and responsive design
- **JavaScript (ES6+)**: Application logic and interactivity

### Key JavaScript Features Used
- **Fetch API**: For loading JSON configuration and marker data
- **ES6 Classes**: Object-oriented marker and map management
- **Arrow Functions**: Concise function syntax
- **Template Literals**: Dynamic HTML generation
- **Destructuring**: Clean data extraction from objects
- **Async/Await**: Asynchronous data loading

## External Libraries

### Leaflet.js v1.7.1
- **Purpose**: Interactive map rendering and manipulation
- **Features Used**:
  - Custom CRS (Coordinate Reference System) for non-geographical maps
  - Image overlays for map backgrounds
  - Custom markers with icons
  - Popup system for marker information
  - Zoom and pan controls
  - Event handling (click, zoom, etc.)

### CDN Dependencies
```html
<!-- Leaflet CSS -->
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css" />

<!-- Leaflet JavaScript -->
<script src="https://unpkg.com/leaflet@1.7.1/dist/leaflet.js"></script>
```

## Architecture Patterns

### Module Pattern
- **Global Scope Management**: Minimal global variables
- **Encapsulation**: Functions and variables scoped appropriately
- **Event-Driven**: DOM events and custom event handling

### Data-Driven Design
- **JSON Configuration**: All maps and markers defined in JSON
- **Dynamic Loading**: Content loaded based on configuration
- **Separation of Concerns**: Data, presentation, and logic separated

## File Organization

### Core Application Files
```
├── index.html          # Application entry point and DOM structure
├── script.js           # Main application logic (2.5KB minified)
├── styles.css          # All styling and responsive design (4KB)
└── maps/
    ├── manifest.json   # Map and floor configuration
    └── [Map]/
        ├── floors/     # Map images and marker data
        └── images/     # Icons and popup images
```

### JavaScript Architecture
```javascript
// Global Variables
const map = L.map()           // Leaflet map instance
let markerLayers = {}         // Marker management
let currentMap = null         // Current map state
let mapsData = []            // Configuration data

// Core Functions
loadMapButtons()             // UI generation
loadFloorButtons()           // Floor navigation
loadFloor()                  // Map switching
loadMarkers()                // Marker rendering
addMarker()                  // Individual marker creation
toggleMarkers()              // Visibility control
```

## CSS Architecture

### Layout System
- **CSS Grid**: Sidebar marker button layout
- **Flexbox**: Navigation button arrangement
- **Absolute Positioning**: Sidebar and map container positioning

### Styling Approach
- **Custom Properties**: Color scheme management
- **BEM-like Naming**: Consistent class naming convention
- **Responsive Design**: Mobile-first approach with desktop enhancements

### Key CSS Features
```css
/* Custom scrollbars for sidebar */
.left-bar::-webkit-scrollbar { }

/* Grid layout for marker buttons */
.marker-buttons {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
}

/* Responsive map container */
#map {
  width: calc(100% - 370px);
  margin-left: 350px;
}
```

## Data Management

### JSON Structure
- **Hierarchical Organization**: Maps → Floors → Markers → Points
- **Flexible Schema**: Optional fields for extensibility
- **Image Path Management**: Relative paths for portability

### State Management
```javascript
// Application State
let currentMap = null         // Active map object
let markerLayers = {}        // Rendered marker references
let devMode = false          // Development mode toggle
let allVisible = false       // Global visibility state
```

### Data Flow
1. **Initialization**: Load manifest.json
2. **Map Selection**: Load floor configuration
3. **Floor Loading**: Load image and marker data
4. **Marker Rendering**: Create Leaflet markers
5. **User Interaction**: Toggle visibility, search, navigate

## Browser APIs Used

### Essential APIs
- **Fetch API**: JSON data loading
- **DOM API**: Element manipulation and event handling
- **Canvas API**: (via Leaflet) Map rendering
- **History API**: URL parameter handling

### Optional APIs
- **Clipboard API**: Dev mode coordinate copying
- **Local Storage**: Future user preferences
- **Intersection Observer**: Future performance optimizations

## Performance Optimizations

### Loading Strategy
- **Lazy Loading**: Images loaded on demand
- **Caching**: Browser cache headers for static assets
- **Minification**: CSS and JS can be minified for production

### Memory Management
- **Marker Cleanup**: Remove markers when switching floors
- **Event Listeners**: Proper cleanup to prevent memory leaks
- **Image Optimization**: Recommend compressed images

### Rendering Performance
- **Efficient DOM Updates**: Batch DOM manipulations
- **CSS Transitions**: Hardware-accelerated animations
- **Debounced Search**: Prevent excessive filtering operations

## Development Tools

### Recommended Development Environment
- **Code Editor**: VS Code with extensions:
  - Live Server (for local development)
  - Prettier (code formatting)
  - ESLint (code quality)
- **Browser DevTools**: Chrome/Firefox developer tools
- **Image Optimization**: TinyPNG, ImageOptim, or similar

### Build Process (Optional)
While not required, you can enhance the project with:
- **Webpack/Vite**: Module bundling and optimization
- **Sass/PostCSS**: Enhanced CSS preprocessing
- **TypeScript**: Type safety for larger projects
- **Service Workers**: Offline functionality

## Deployment Architecture

### Static Hosting
- **No Backend Required**: Pure client-side application
- **CDN Friendly**: All assets can be cached
- **Global Distribution**: Works with any CDN

### Hosting Platforms
```yaml
# GitHub Pages
- Automatic deployment from repository
- Custom domain support
- HTTPS by default

# Netlify
- Drag-and-drop deployment
- Form handling (if needed)
- Edge functions (for future enhancements)

# Vercel
- Git integration
- Serverless functions (optional)
- Global CDN

# AWS S3 + CloudFront
- Scalable static hosting
- Custom caching rules
- Integration with other AWS services
```

## Security Considerations

### Client-Side Security
- **XSS Prevention**: Proper HTML escaping in popups
- **Content Security Policy**: Can be implemented for enhanced security
- **HTTPS**: Recommended for production deployment

### Data Validation
- **JSON Schema**: Validate marker data structure
- **Input Sanitization**: Clean user search input
- **Error Handling**: Graceful degradation for missing resources