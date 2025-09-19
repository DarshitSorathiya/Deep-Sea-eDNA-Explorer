# BioDNA - Biodiversity Analysis Platform

A modern web application for analyzing environmental DNA (eDNA) datasets to assess biodiversity. This project has been converted from TypeScript to JavaScript (JSX) and uses Vite as the build tool.

## Features

- **Upload eDNA Datasets**: Support for FASTA, CSV, and Excel formats
- **Automated DNA Analysis**: Advanced BLAST search and taxonomic classification
- **Interactive Visualizations**: Charts and species distribution mapping
- **Export Reports**: Generate comprehensive PDF and CSV reports
- **Secure Processing**: Data is processed securely and not stored permanently

## Tech Stack

- **Frontend**: React 18 with JSX
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives
- **Routing**: React Router DOM
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Navigate to the project directory:
   ```bash
   cd my-app
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and visit `http://localhost:8080`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
my-app/
├── src/
│   ├── components/
│   │   ├── ui/           # Reusable UI components
│   │   ├── Navbar.jsx    # Navigation component
│   │   └── Footer.jsx    # Footer component
│   ├── pages/
│   │   ├── Index.jsx     # Home page
│   │   ├── Upload.jsx    # File upload page
│   │   ├── Processing.jsx # Analysis processing page
│   │   ├── Report.jsx    # Results report page
│   │   └── NotFound.jsx  # 404 error page
│   ├── hooks/
│   │   └── use-toast.js  # Toast notification hook
│   ├── lib/
│   │   └── utils.js      # Utility functions
│   ├── assets/           # Images and static assets
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static public files
├── index.html           # HTML template
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
└── package.json         # Dependencies and scripts
```

## Key Features

### 1. File Upload
- Drag and drop interface
- Support for multiple file formats (FASTA, CSV, Excel)
- File validation and size limits
- Real-time upload progress

### 2. Processing Pipeline
- Simulated BLAST search
- Taxonomic classification
- Biodiversity metrics calculation
- Real-time progress tracking

### 3. Results Visualization
- Interactive dashboard with multiple chart types
- Species composition analysis
- Diversity indices calculation
- Detailed species table with search and filtering

### 4. Design System
- Dark theme with yellow accent colors
- Glass morphism effects
- Responsive design
- Custom animations and transitions

## Customization

### Styling
The project uses a custom design system defined in `src/app/globals.css`. Key design tokens include:

- **Colors**: Dark theme with yellow gradients
- **Components**: Glass cards, transparent buttons
- **Animations**: DNA helix rotation, glow effects, fade-ins

### Adding New Pages
1. Create a new component in `src/pages/`
2. Add the route to `src/App.jsx`
3. Update navigation in `src/components/Navbar.jsx`

### Adding New UI Components
1. Create the component in `src/components/ui/`
2. Follow the existing pattern using Radix UI primitives
3. Export from the component file

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is for educational and research purposes.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## Support

For questions or issues, please open an issue in the repository.