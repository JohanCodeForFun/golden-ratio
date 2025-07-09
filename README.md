# Golden Ratio Calculator

A web app for visualizing and calculating ideal body proportions using the golden ratio, built with React, TypeScript, Vite, and Three.js.

## Features

- **3D Visualization:** Interactive low-poly human figure rendered with [Three.js](https://threejs.org/) and [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber).
- **User Input:** Enter your wrist measurement to see the idealized figure scale and move in real time.
- **Golden Ratio Calculation:** Calculates and displays proportions based on the golden ratio.
- **Responsive UI:** Clean, minimal interface with responsive layout.
- **GitHub Pages Deployment:** Easily deployable to GitHub Pages.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- [npm](https://www.npmjs.com/)

### Installation

```sh
git clone https://github.com/johancodeforfun/golden-ratio.git
cd golden-ratio
npm install
```

### Development

```sh
npm run dev
```
Open [http://localhost:5173/golden-ratio/](http://localhost:5173/golden-ratio/) in your browser.

### Build

```sh
npm run build
```

### Preview Production Build

```sh
npm run preview
```

### Deploy to GitHub Pages

```sh
npm run deploy
```
The site will be available at [https://johancodeforfun.github.io/golden-ratio/](https://johancodeforfun.github.io/golden-ratio/).

## Project Structure

```
src/
  App.tsx         # Main React component
  main.tsx        # Entry point
  App.css         # Component styles
  index.css       # Global styles
public/
  assets/
    figures-low-poly.gltf  # 3D model
    figures-low-poly.bin   # 3D model binary
  vite.svg                 # Favicon
index.html
vite.config.ts
```

## 3D Model

The app uses a low-poly GLTF figure stored in `public/assets/figures-low-poly.gltf`. You can replace this with your own model if desired.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

MIT

---

Made with ❤️ using React, Vite, and Three.js.