# Interactive Gaming Map

## Overview

This is a **static interactive map application** designed for gaming communities, specifically built for exploring game worlds with detailed marker systems. The application provides a rich, interactive experience where users can navigate multiple maps and floors, discover points of interest, and filter content by categories. Built with pure HTML, CSS, and JavaScript using Leaflet.js, it requires no backend server and can be deployed on any static hosting platform.

**🎮 Perfect for**: Game guides, dungeon maps, world exploration, collectible tracking, and community-driven gaming resources.

## ✨ Features

### 🗺️ Multi-Map Support

- **Multiple Game Areas**: Switch between different maps (Greenwood Day/Night, Dawnhammer Crypt)
- **Multi-Floor Navigation**: Explore different levels and floors within each map
- **Seamless Switching**: Instant map and floor transitions with preserved zoom levels

### 🎯 Interactive Markers

- **Rich Popups**: Click markers to see detailed information with images
- **Custom Icons**: Each marker type has its own distinctive icon
- **Contextual Information**: Point-specific descriptions and images
- **Coordinate Display**: Exact positioning information for reference

### 🔍 Advanced Filtering

- **Category-Based Filters**: Toggle entire categories (Enemies, Loot, Resources, etc.)
- **Individual Marker Control**: Show/hide specific marker types
- **Search Functionality**: Find markers by name or category
- **Bulk Operations**: Hide/show all markers with one click

### ⚙️ Developer Features

- **Dev Mode**: Click-to-copy coordinates for easy marker placement
- **JSON-Driven**: All content managed through simple JSON files
- **Hot Reloading**: Changes reflect immediately during development
- **Extensible Architecture**: Easy to add new maps, floors, and marker types

### 📱 User Experience

- **Mobile Responsive**: Dedicated mobile view with touch-friendly controls
- **Fast Performance**: Optimized for smooth interaction with hundreds of markers
- **Accessibility**: Keyboard navigation and screen reader support
- **No Backend Required**: Pure client-side application

## � Documgentation

- **[� Req uirements](REQUIREMENTS.md)** - System requirements, dependencies, and technical specifications
- **[🛠️ Tech Stack](TECH_STACK.md)** - Detailed breakdown of technologies and architecture
- **[📖 Usage Guide](USAGE.md)** - Comprehensive guide for setup, customization, and deployment

## 🚀 Quick Start

```bash
# 1. Clone the repository
git clone <repository-url>
cd interactive-gaming-map

# 2. Start a local server (choose one)
python -m http.server 8000
# or
npx serve .

# 3. Open browser
open http://localhost:8000
```

## 🎮 Current Maps

This project includes sample maps from a gaming context:

- **Greenwood Day/Night** - Multi-floor exploration areas with day/night variants
- **Dawnhammer Crypt** - Multi-level dungeon with Upper, Mid, and Lower floors
- **Rich Marker System** - Enemies, loot, resources, collectibles, and more

## 🌟 Live Demo

For a real example of this interactive map in action, check out the Live Demo deployed on [Interactive Map Example – Legacy: Steel & Sorcery](https://filipe-valadares.github.io/Legacy-Steel-Sorcery-Interactive-Map/). This demo showcases the core functionality including multiple areas, detailed markers with images, category filtering, and mobile responsiveness.

## 🛠️ Adding Your Own Maps

### Basic Setup

1. **Add Map Images**: Place your map images in `maps/[Map Name]/floors/`
2. **Update Manifest**: Add your map to `maps/manifest.json`
3. **Create Marker Data**: Add JSON files with marker definitions
4. **Test Locally**: Use a local server to test your changes

### Example Marker Configuration

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

For detailed setup instructions, see the **[📖 Usage Guide](USAGE.md)**.

## 🎯 Use Cases

- **🎮 Game World Maps**: Dungeon layouts, world exploration, quest locations
- **🏛️ Interactive Floor Plans**: Museums, malls, office buildings
- **🎪 Event Venues**: Conferences, festivals, conventions
- **🏫 Campus Maps**: Universities, theme parks, large facilities
- **📐 Technical Diagrams**: Blueprints, schematics, annotated images

## 🚀 Deployment

Deploy to any static hosting platform:

- **GitHub Pages**: Push to repository, enable Pages in settings
- **Netlify**: Drag & drop or connect Git repository
- **Vercel**: `npx vercel` for instant deployment
- **Custom Hosting**: Any static file server with HTTPS

## 🤝 Contributing

This project welcomes contributions! Whether you're:

- Adding new maps or improving existing ones
- Enhancing the user interface
- Fixing bugs or improving performance
- Writing documentation or tutorials

See the documentation files for technical details and best practices.

## 📄 License

This project is licensed under the **MIT License** – see the `LICENSE` file for details. You are free to use, modify, and distribute this project. Attribution is appreciated but not required.

## 🙏 Acknowledgments

This work is being done by Filipe & blackbeard with additional contributions from Just_Filip, Vezgez, Blademaster, PunchieAU, KingRichie, Kyrentu, Crabbiepatty, Kawaskurwas and Coldcoder.

---

_Built with [Leaflet.js](https://leafletjs.com/) for non-geographical interactive maps_
