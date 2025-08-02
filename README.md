# Artist House - Shopify Theme

A unique Shopify theme featuring an interactive room navigation interface for the Artist House project.

## Features

- **Interactive Room Navigation**: Navigate through 9 different rooms using clickable dots positioned on a background image
- **Responsive Design**: Mobile-friendly with adaptive layouts
- **Shopify Integration**: Full Shopify theme compatibility with Liquid templating
- **Theme Editor Support**: Customizable through Shopify's theme editor
- **Modern JavaScript**: ES6+ classes with PubSub event system
- **Accessibility**: Built with accessibility best practices

## Theme Structure

This theme follows Shopify's standard directory structure:

```
├── assets/                 # CSS, JS, and image files
│   ├── base.css            # Main stylesheet with room navigation styles
│   ├── global.js           # Main JavaScript functionality
│   ├── constants.js        # Theme constants and utilities
│   └── pubsub.js          # Event system for theme communication
├── config/                 # Theme configuration
│   └── settings_schema.json # Theme settings for the editor
├── layout/                 # Layout templates
│   └── theme.liquid        # Main theme layout
├── locales/               # Translation files
│   └── en.default.json    # English translations
├── sections/              # Reusable sections
│   ├── artist-house-navigation.liquid # Main navigation section
│   ├── header-group.json  # Header section group
│   └── footer-group.json  # Footer section group
├── snippets/              # Reusable code snippets
│   └── meta-tags.liquid   # SEO meta tags
└── templates/             # Page templates
    ├── index.liquid       # Homepage template
    └── page.liquid        # Standard page template
```

## Room Navigation

The theme features 9 interactive rooms:

1. **Front** - Main entrance area
2. **Studio** - Creative workspace (default active)
3. **Lounge** - Relaxation area
4. **Bedroom** - Private quarters
5. **Closet** - Storage space
6. **Pool** - Recreation area
7. **Kitchen** - Cooking space
8. **Court** - Outdoor area
9. **Garage** - Vehicle storage

## Navigation Menu

The header includes navigation for:

- Albums
- Projects
- Tour
- Shop
- Explore

## Customization

### Theme Settings

The theme includes customizable settings accessible through the Shopify theme editor:

- **Colors**: Accent colors, backgrounds, and text colors
- **Typography**: Font selection and sizing
- **Layout**: Page width and spacing options
- **Artist House Settings**: Room navigation toggles and background images
- **Social Media**: Social platform links

### Section Settings

The Artist House Navigation section includes:

- Background image selection
- Header text customization
- Section height adjustment
- Room information display toggles
- Navigation menu items (blocks)

## JavaScript API

The theme exposes a JavaScript API for external integrations:

```javascript
// Get current room
const currentRoom = window.artistHouseNavigation.getCurrentRoom();

// Navigate to a specific room
window.artistHouseNavigation.setRoom('studio');

// Get available rooms
const rooms = window.artistHouseNavigation.getAvailableRooms();
```

## Events

The theme uses a PubSub system for communication:

```javascript
// Listen for room changes
window.PubSub.subscribe('artistHouse:roomChanged', function(data) {
  console.log('Room changed to:', data.roomName);
});

// Listen for navigation clicks
window.PubSub.subscribe('artistHouse:navigationClicked', function(data) {
  console.log('Navigation clicked:', data.section);
});
```

## Installation

1. Upload the theme files to your Shopify store
2. Activate the theme in your Shopify admin
3. Customize settings through the theme editor
4. Add the Artist House Navigation section to your homepage

## Development

### Local Development

For local development with Shopify CLI:

```bash
# Install Shopify CLI
npm install -g @shopify/cli @shopify/theme

# Connect to your store
shopify theme dev

# Push changes to your store
shopify theme push
```

### File Structure Guidelines

- **Assets**: Place all CSS, JavaScript, and image files here
- **Sections**: Create reusable content blocks with schema for customization
- **Snippets**: Store small, reusable pieces of Liquid code
- **Templates**: Define page layouts for different content types
- **Config**: Theme settings and configuration files
- **Locales**: Translation files for internationalization

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance

The theme is optimized for performance with:

- Minimal CSS and JavaScript
- Efficient Liquid templating
- Optimized image loading
- Lazy loading where appropriate

## Accessibility

The theme includes:

- Keyboard navigation support
- Screen reader compatibility
- High contrast support
- Focus indicators
- Semantic HTML structure

## License

This theme is proprietary to Artist House Studio.

## Support

For support and customization requests, contact Artist House Studio.

## Changelog

### Version 1.0.0
- Initial release
- Interactive room navigation
- Shopify theme editor integration
- Responsive design
- Accessibility features
