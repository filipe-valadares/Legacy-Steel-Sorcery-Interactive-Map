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
   Get the code from this repository (you can click “Use this template” if available, or clone it directly). All the necessary files are included: HTML, CSS, JavaScript, and a sample `maps/` data folder.

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
   - `url`: (Optional) an icon image for the marker. If not provided, a default marker icon is used. If provided, it should be a path relative to the map folder.  
   - `points`: An array of coordinates for this marker type. Each point is an object with `x` and `y` coordinates (and optionally an `image` field if you have a unique image to show in the popup for that specific point).  

   Here is a simplified example of a floor JSON (`Downtown.json`) with one marker category and two points:

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

   In this example, two “Shop” markers will appear on the “Downtown” map layer at the specified coordinates. The coordinates correspond to pixel positions on the image (the system uses a default 0–1000 scale for the map’s width and height). When clicked, each marker will display a popup titled “Shop” with the description text. The marker icon will use the image at `maps/City Map/images/icons/shop.png` (you would need to place the `shop.png` icon image in that folder). If no `url` is specified, a default colored marker is used.

5. **Test Locally**  
   Open the `index.html` file in a web browser. Note: If you open the file directly from the filesystem, you might encounter CORS restrictions preventing the JSON data from loading. It’s recommended to serve the files via a local web server for testing (for example, using Python’s `http.server` module or a VS Code Live Server). Once served, load the page and you should see your map. Use the “Show Menu” button to reveal the markers list and try toggling categories or clicking markers to ensure everything works.

6. **Deploy**  
   Once you’re happy with your map, you can deploy it to any static hosting. For GitHub Pages, you can simply push the repository to a GitHub repository named `<username>.github.io` or enable Pages on the repository (if using a custom project name). The site will then be accessible online. Since there are no server requirements, deployment is as easy as uploading the files to a static host (GitHub Pages, Netlify, Vercel static, etc.).

## Usage Tips

- **Marker Coordinates**  
  The coordinate system for markers is a simple grid corresponding to the image dimensions. By default, the template assumes an arbitrary 1000×1000 coordinate grid for convenience. In practice, you should input coordinates based on the actual pixel dimensions or a consistent scale for your image. If you’re unsure of the exact coordinates for a point on your map image, you can enable Dev Mode in the app (by editing the code to set `devMode = true` temporarily, or through a browser console command) to assist in finding coordinates. In Dev Mode, clicking on the map will log the coordinate values, which you can then use in your JSON.

- **Custom Icons and Colors**  
  You can customize the look of markers. The `color` property in the JSON changes the marker icon color (when using the default icon). If you provide a custom icon via `url`, the `color` property can still be used for the marker’s outline or label. Make sure to place any custom icon images in a reachable path (for example `maps/[YourMap]/images/icons/` as shown above) and update the JSON path accordingly. The default marker icon and other CSS styles can be adjusted in `styles.css` if needed.

- **Filters and Categories**  
  By organizing markers into categories, the template automatically creates filter checkboxes in the side menu. Choose category names that make sense for your project (e.g., “Restaurants”, “Monsters”, “Artifacts”). The filter menu will group markers by these categories and allow users to toggle each group. (If a category has no markers on the currently visible map/layer, it simply won’t display until such markers exist.)

- **Multiple Floors/Levels**  
  If your map has multiple layers (like floors in a building or an underground layer), users can switch floors via buttons that appear above the map view. The template preloads all floors of the currently selected map for smooth switching. Ensure that each floor image aligns with a common coordinate system or has the same dimensions so that markers overlay correctly. Typically, all floor images for a map should have the same pixel dimensions or scale.

- **Performance Considerations**  
  This template is lightweight and handles a moderate number of markers well. If you plan to have a very large number of markers (hundreds on a single map), consider grouping them into subcategories or enabling clustering (which would require additional customization or a Leaflet plugin). Likewise, very large image files can be downscaled or sliced if needed to improve performance. Since everything runs client-side, keep an eye on image file sizes for optimal load times.

- **Extending Functionality**  
  The code uses Leaflet.js under the hood for map rendering and interactions. If you are a developer, you can extend the functionality using Leaflet’s extensive API and plugins. For example, you could add search functionality, marker clustering, or even integrate real map tile layers if you want to use geographical maps. The template is meant as a starting point that provides core features out-of-the-box, but you have full freedom to modify the JavaScript to add new features as needed.

## Use Cases

- **Game World Maps**: Display game terrain or level maps with locations of interest (quests, enemies, items, etc.). The example demo provided is based on a game map.  
- **Campus or Park Maps**: Provide an interactive guide for a campus, zoo, theme park, or hiking trail with markers for facilities, exhibits, or points of interest.  
- **Floor Plans**: Visualize building floor plans or mall directories with markers for stores, rooms, emergency exits, etc., across multiple levels.  
- **Event Maps**: For conferences or festivals, show venue maps with booths, stages, or event areas marked and filterable by type (e.g., food, stage, info desk).  
- **Any Image with Annotations**: Basically any scenario where you have a static image and want to place interactive annotations or markers on it – this template can handle it with minimal effort.  

## Contributing

Contributions are welcome! If you find a bug or have an idea for an improvement, feel free to open an issue or submit a pull request. Since this is a straightforward client-side project, you can easily test changes by opening `index.html` in your browser after making modifications. Some areas that could benefit from contributions or suggestions:

- Improving the mobile responsiveness and overall UI/UX design.  
- Adding features like a search bar to find markers, marker clustering for dense areas, or optional support for tile-based maps.  
- Enhancing the JSON schema or adding a simple editor mode to place markers (e.g. a mode to click on the map and output coordinates).  

When contributing, please ensure any new features remain optional or general enough to be useful for different use cases. This project aims to remain a lightweight template that others can adapt to their needs.

## License

This project is licensed under the **MIT License** – see the `LICENSE` file for details. You are free to use, modify, and distribute this project. Attribution is appreciated but not required. Enjoy building your interactive maps!

---

*Non‑geographical maps – Leaflet – a JavaScript library for interactive maps*  
<https://leafletjs.com/examples/crs-simple/crs-simple.html>
