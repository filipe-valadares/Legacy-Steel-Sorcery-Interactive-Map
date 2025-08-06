# Usage Guide

## Quick Start

### 1. Local Development Setup

```bash
# Clone or download the repository
git clone <repository-url>
cd interactive-gaming-map

# Start a local web server (choose one):
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

Open your browser to `http://localhost:8000`

### 2. Basic Navigation

- **Map Selection**: Click map buttons at the top to switch between different game areas
- **Floor Navigation**: Use floor buttons to switch between levels/layers
- **Zoom & Pan**: Mouse wheel to zoom, click and drag to pan
- **Marker Interaction**: Click markers to see detailed information
- **Search**: Use the search bar to find specific markers or categories
- **Toggle Visibility**: Use "Hide/Show All Markers" or individual category toggles

## Adding Your Own Content

### Step 1: Prepare Map Images

1. Create a folder structure:
   ```
   maps/
   └── Your Map Name/
       ├── floors/
       │   ├── Floor1.jpg
       │   └── Floor2.jpg
       └── images/
           ├── Icons/
           ├── Chests/
           └── Other/
   ```

2. **Image Requirements**:
   - **Format**: JPG or PNG
   - **Size**: Minimum 1000x1000px recommended
   - **Naming**: Must match exactly with JSON configuration

### Step 2: Update Manifest

Edit `maps/manifest.json`:

```json
{
  "maps": [
    {
      "name": "Your Map Name",
      "floors": [
        { "name": "Floor1" },
        { "name": "Floor2" }
      ]
    }
  ]
}
```

### Step 3: Create Marker Data

For each floor, create a JSON file (e.g., `Floor1.json`):

```json
{
  "markers": [
    {
      "name": "Treasure Chest",
      "category": "Loot",
      "color": "#FFD700",
      "desc": "Contains valuable items",
      "url": "images/Icons/chest.png",
      "points": [
        {
          "x": 500,
          "y": 300,
          "desc": "Golden chest with rare loot",
          "image": "images/Chests/golden_chest.png"
        }
      ]
    }
  ]
}
```

## Advanced Configuration

### Marker Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | ✅ | Display name for the marker type |
| `category` | string | ✅ | Category for grouping and filtering |
| `color` | string | ✅ | Hex color code for the marker |
| `desc` | string | ✅ | Default description for all points |
| `url` | string | ❌ | Path to marker icon image |
| `points` | array | ✅ | Array of point objects |

### Point Properties

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `x` | number | ✅ | X coordinate on the map |
| `y` | number | ✅ | Y coordinate on the map |
| `desc` | string | ❌ | Point-specific description |
| `image` | string | ❌ | Path to popup image |

### Finding Coordinates

1. Enable **Dev Mode** by clicking the "Dev Mode: OFF" button
2. Click anywhere on the map
3. Coordinates will be logged to browser console and copied to clipboard
4. Format: `{"x": 123.45, "y": 678.90}`

### Category Organization

Categories automatically create filter sections. Best practices:

- **Enemies**: Different monster types
- **Loot**: Chests, treasure, collectibles
- **Resources**: Crafting materials, plants, ores
- **NPCs**: Merchants, quest givers
- **Landmarks**: Important locations, exits
- **Secrets**: Hidden areas, easter eggs

## Customization

### Styling

Edit `styles.css` to customize:

- **Colors**: Change the color scheme
- **Layout**: Modify sidebar width, button sizes
- **Fonts**: Update typography
- **Responsive**: Adjust mobile breakpoints

### Map Behavior

Edit `script.js` to modify:

- **Zoom Levels**: Adjust min/max zoom
- **Default View**: Change initial map position
- **Marker Clustering**: Add clustering for performance
- **Custom Interactions**: Add new user interactions

## Performance Optimization

### Image Optimization

1. **Compress Images**: Use tools like TinyPNG or ImageOptim
2. **Appropriate Sizes**: Don't use oversized images
3. **Format Selection**: 
   - JPG for map backgrounds
   - PNG for icons (transparency needed)
   - WebP for modern browsers (optional)

### Browser Performance

- **Memory Management**: Clear old markers when switching floors
- **Event Delegation**: Use event delegation for marker buttons
- **Debounced Search**: Prevent excessive search operations

## Troubleshooting

### Common Issues

**Maps not loading:**
- Check file paths in manifest.json
- Ensure image files exist and are named correctly
- Verify JSON syntax is valid

**Markers not appearing:**
- Check coordinate values are within map bounds
- Verify JSON structure matches expected format
- Check browser console for errors

**Images not displaying:**
- Verify image paths are relative to map folder
- Check file extensions match actual files
- Ensure images are web-compatible formats

**CORS errors in development:**
- Use a local web server instead of file:// protocol
- Check browser security settings
- Try a different browser

### Debug Mode

Enable debug mode for troubleshooting:

```javascript
// In browser console
devMode = true;

// Or modify script.js
let devMode = true;
```

Debug features:
- Click coordinates logged to console
- Coordinate copying to clipboard
- Detailed error messages
- Performance timing information

### Browser Compatibility

**Supported Browsers:**
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

**Known Issues:**
- Internet Explorer: Not supported
- Mobile Safari: Some touch gesture limitations
- Older Android browsers: Performance may vary

## Deployment

### GitHub Pages

1. Push code to GitHub repository
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Site will be available at `https://username.github.io/repository-name`

### User Experience

1. **Performance**: Keep initial load times under 3 seconds
2. **Mobile**: Test on mobile devices regularly
3. **Accessibility**: Ensure keyboard navigation works
4. **Error Handling**: Provide fallbacks for missing content

### Maintenance

1. **Version Control**: Use Git for tracking changes
2. **Backup Data**: Keep backups of map images and JSON files
3. **Documentation**: Document custom modifications
4. **Testing**: Test thoroughly after adding new content
