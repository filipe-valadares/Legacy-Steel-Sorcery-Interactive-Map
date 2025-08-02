# Interactive Map Template

## Overview

This project is a **static interactive map** template that lets you deploy a rich, interactive map on GitHub Pages or any static web hosting platform. Viewers can pan, zoom, and interact with multiple maps and layers of information without any backend server. Markers on the map display tooltips or popups (with text and images) and can be filtered by categories, making it easy to toggle different types of points of interest. All map data (maps, markers, categories, etc.) are defined in simple JSON files, allowing the map owner to update content easily. **No frameworks or build tools are required** – just plain HTML, CSS, and JavaScript running entirely in the browser.

## Features

- **Multiple Maps and Layers**
- **Interactive Markers**
- **Category Filters**
- **JSON-Driven Content**
- **Pure Front-End (No Server Needed)**
- **Lightweight and Framework-Free**
- **Responsive Design**

## Live Demo

[Interactive Map Example – Legacy: Steel & Sorcery](https://filipe-valadares.github.io/Legacy-Steel-Sorcery-Interactive-Map/)

## Getting Started

1. **Download or Clone the Repository**
2. **Prepare Your Map Images**
3. **List the Maps and Floors in `manifest.json`**
```json
{
  "maps": [
    {
      "name": "City Map",
      "floors": [
        { "name": "Downtown" },
        { "name": "Uptown" }
      ]
    }
  ]
}
```
4. **Add Marker Data**
```json
{
  "markers": [
    {
      "name": "Shop",
      "category": "Shops",
      "color": "#ff0000",
      "desc": "A local shop for supplies.",
      "url": "images/icons/shop.png",
      "points": [
        { "x": 250, "y": 400 },
        { "x": 780, "y": 122 }
      ]
    }
  ]
}
```
5. **Test Locally**
6. **Deploy**

## Usage Tips

- **Marker Coordinates**
- **Custom Icons and Colors**
- **Filters and Categories**
- **Multiple Floors/Levels**
- **Performance Considerations**
- **Extending Functionality**

## Use Cases

- Game World Maps
- Campus or Park Maps
- Floor Plans
- Event Maps
- Any Annotated Image

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.
