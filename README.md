
# Interactive Map Template

## Overview

This project is a **static interactive map** template that lets you deploy a rich, interactive map on GitHub Pages or any static web hosting platform. Viewers can pan, zoom, and interact with multiple maps and layers of information without any backend server. Markers on the map display tooltips or popups (with text and images) and can be filtered by categories, making it easy to toggle different types of points of interest. All map data (maps, markers, categories, etc.) are defined in simple JSON files, allowing the map owner to update content easily. No frameworks or build tools are required – just plain HTML, CSS, and JavaScript (leveraging a lightweight mapping library) running entirely in the browser.

## Features

- **Multiple Maps and Layers**: Support for multiple maps (e.g. different regions or scenarios) and multiple layers/floors per map. Users can switch between maps and floors with a button click.  
- **Interactive Markers**: Custom markers can be placed on each map layer to indicate points of interest. Clicking a marker shows a popup with a title, description, and even an image if provided.  
- **Category Filters**: Markers are organized by categories (e.g. "Enemies", "Resources", "Landmarks"). A built‑in filter menu allows users to toggle categories on/off, so they can focus on specific types of markers.  
- **JSON‑Driven Content**: All configuration is done via JSON files – no need to modify code to update maps or markers. You can add new markers or even new maps by editing a JSON file, which makes the solution extensible and easy to maintain.  
- **Pure Front‑End (No Server Needed)**: The map runs entirely in the browser. You can host it on GitHub Pages or any static file host. There is no server‑side component – just open the `index.html` and the app loads the data and works.  
- **Lightweight and Framework‑Free**: Implemented with standard HTML/CSS/JS (uses the Leaflet.js library for map interactions) – no heavy frameworks or complex build process. This ensures fast load times and simplicity in customization.  
- **Responsive Design**: The interface is designed to be usable on desktops and mobile devices (with a toggle for a mobile‑friendly view). Viewers can interact with the map on different screen sizes (though very small screens may have some limitations in the current version).  

## Live Demo

For a real example of this interactive map in action, check out the Live Demo deployed on [Interactive Map Example – Legacy: Steel & Sorcery](https://filipe-valadares.github.io/Legacy-Steel-Sorcery-Interactive-Map/). This demo was originally created for a game, but it showcases the core functionality of the map (multiple areas, markers with info, filters, etc.). You can use it as a reference to see how the markers and filters work from a user perspective.

## Getting Started

Follow these steps to set up the interactive map for your own project:

1. **Download or Clone the Repository**  
   Get the code from this repository (you can clone it directly). All the necessary files are included: HTML, CSS, JavaScript, and a sample `maps/` data folder.

2. **Prepare Your Map Images**  
   Replace or add your own map images. In the `maps/` directory, create a subfolder for each distinct map or region you want to include. For example, if you want to have a map called “City Map”, create `maps/City Map/`. Inside that, create a subfolder called `floors` and put your image files there. Each “floor” (or layer) is simply an image (JPEG/PNG) of that map. If your map only has one layer, you can still use the `floors` folder with one image (e.g. `Main Floor.jpg` or any name you choose).

3. **List the Maps and Floors in `manifest.json`**  
   Open the file `maps/manifest.json`. This file tells the application what maps and layers to load. Add an entry for each map you added. For example:

   ```json
   {
     "maps": [
       {
         "name": "City Map",
         "floors": [
           { "name": "Downtown" },
           { "name": "Uptown" }
         ]
       },
       {
         "name": "Mall Blueprint",
         "floors": [
           { "name": "First Floor" },
           { "name": "Second Floor" }
         ]
       }
     ]
   }
   ```

   In the above example, the app would expect image files named `Downtown.jpg`, `Uptown.jpg` in a folder `maps/City Map/floors/`, and `First Floor.jpg`, `Second Floor.jpg` in `maps/Mall Blueprint/floors/`. You can name the floors however you like, just ensure the names in the JSON match the image filenames (without extension).

4. **Add Marker Data**  
   For each floor image you have, create a corresponding JSON file with the same name (e.g. for `Downtown.jpg`, create `Downtown.json` in the same folder). This file contains an array of marker definitions. Each marker can have properties like:

   - `name`: A short name for the marker (appears in the menu and tooltip).  
   - `category`: A category name to group markers (e.g. "Shops", "Enemies", "Treasure"). Markers sharing a category can be toggled together.  
   - `color`: A hex color code (for the marker icon or label).  
   - `desc`: A longer description to show in the popup (can be empty or brief).  
   - `url`: (Optional) **marker icon** image shown for **every** point of this marker type on the map. Provide a path relative to the marker’s folder.  
   - `points`: An array of point objects. Each point requires `x` and `y` coordinates and *may* include:  
     - `image`: (Optional) an image displayed **inside the popup** for *that specific point*.  
     - `desc`: (Optional) a point‑specific description to override or add context.  

   > **Key difference**  
   > • `url` = marker *icon* (one per marker type, always visible on the map)  
   > • `image` = optional *popup image* (per point)  

   ### Minimal example

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

   ### Extended example (icon vs. point images)

   ```json
   {
     "name": "Armor/Weapons",
     "color": "#f7d97e",
     "category": "Containers",
     "url": "images/Icons/armor-chest.png",
     "desc": "Armor & Weapons",
     "points": [
       { "x": 637, "y": 202.5625 },
       { "x": 811.53125, "y": 181.09375 },
       { "x": 637.25, "y": 246.375 },
       { "image": "images/Chests/armorChest732.png", "x": 732.96875, "y": 340.78125 },
       { "desc": "On roof", "image": "images/Chests/armorChest663.png", "x": 663, "y": 441.28125 },
       { "desc": "On second floor", "image": "images/Chests/armorChest649.png", "x": 649.21875, "y": 472.9375 },
       { "image": "images/Chests/armorChest606.png", "x": 606.75, "y": 451.3125 },
       { "desc": "Top of tower", "x": 544.84375, "y": 540.5625 },
       { "image": "images/Chests/armorChest655.png", "desc": "On the roof", "x": 655.4375, "y": 468.375 }
     ]
   }
   ```

5. **Test Locally**  
   Open the `index.html` file in a web browser. Note: If you open the file directly from the filesystem, you might encounter CORS restrictions preventing the JSON data from loading. It’s recommended to serve the files via a local web server for testing (for example, using Python’s `http.server` module or a VS Code Live Server). Once served, load the page and you should see your map. Use the “Show Menu” button to reveal the markers list and try toggling categories or clicking markers to ensure everything is working.

6. **Deploy**  
   Once you’re happy with your map, you can deploy it to any static hosting. For GitHub Pages, you can simply push the repository to a GitHub repository named `<username>.github.io` or enable Pages on the repository (if using a custom project name). The site will then be accessible online. Since there are no server requirements, deployment is as easy as uploading the files to a static host (GitHub Pages, Netlify, Vercel, etc.).

## Usage Tips

- **Marker Coordinates**  
  The coordinate system for markers is a simple grid corresponding to the image dimensions. By default, the template assumes an arbitrary 1000×1000 coordinate grid for convenience. In practice, you should input coordinates based on the actual pixel dimensions or a consistent scale for your image. If you’re unsure of the exact coordinates for a point on your map, you can enable Dev Mode in the app (by setting `devMode = true` or via browser console) to log coordinates when you click on the map.

- **Custom Icons and Colors**  
  Use the `color` property to change the marker icon color (for default icon) or outline/label (when using a custom icon via `url`). Place custom icons and point images in accessible paths (e.g. `images/icons/`, `images/Chests/`, etc.) and reference them accordingly.

- **Filters and Categories**  
  Categories automatically create filter checkboxes in the side menu. Choose names that make sense for your project (e.g., “Restaurants”, “Monsters”, “Artifacts”). Categories only appear when at least one marker of that category exists on the current map/layer.

- **Multiple Floors/Levels**  
  All floor images of a map should share dimensions or a consistent scale so markers overlay correctly. The template preloads all floors for smooth switching.

- **Performance Considerations**  
  For hundreds of markers on one map, consider subcategories or Leaflet clustering plugins. Optimize image dimensions and file sizes for faster load times.

- **Extending Functionality**  
  The template is built with Leaflet.js, so you can enhance it using the Leaflet API or plugins (search, clustering, real map tiles, etc.).

## Use Cases

- **Game World Maps**: Display terrain or levels with quests, enemies, items, etc.  
- **Campus or Park Maps**: Provide interactive guides for campuses, zoos, or theme parks.  
- **Floor Plans**: Map out multi‑level buildings (malls, offices, museums).  
- **Event Maps**: Show venue layouts for conferences or festivals with filterable booths and stages.  
- **Any Static Image with Annotations**: Add interactive markers to any image—blueprints, artworks, diagrams, and more.

## Contributing

Contributions are welcome! Ideas include:

- Improving mobile responsiveness and overall UI/UX.  
- Adding search, clustering, or tile‑map support.  
- Creating a simple editor mode to click‑place markers.  

Please keep new features optional or general to remain useful across projects.

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details. You are free to use, modify, and distribute this project. Attribution is appreciated but not required.

---

*Non‑geographical maps – Leaflet – a JavaScript library for interactive maps*  
<https://leafletjs.com/examples/crs-simple/crs-simple.html>
