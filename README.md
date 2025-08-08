# Adrian & Sons Group Limited Website

A modern, mobile-first static website for Adrian & Sons Group Limited, built for GitHub Pages deployment.

## Features

- **Modern Design**: Clean, professional layout with generous whitespace
- **Mobile-First**: Responsive design that works perfectly on all devices
- **Fast Performance**: Optimized for speed with lazy loading and efficient assets
- **SEO Optimized**: Proper meta tags, semantic HTML, and Open Graph support
- **Accessibility**: Keyboard navigation, focus indicators, and screen reader support
- **Auto-Images**: Automatic image fetching from official site with Unsplash fallbacks
- **Lead Generation**: Clear CTAs and contact forms optimized for conversions

## Pages

- `index.html` - Homepage with hero section and service overview
- `services.html` - Detailed service information with anchor links
- `projects.html` - Portfolio showcase with project gallery
- `reviews.html` - Customer testimonials and trust-building content
- `about.html` - Company information and team details
- `contact.html` - Contact form and business information
- `404.html` - Custom error page with navigation options

## Setup

### Prerequisites

- Node.js 18+ (for image fetching)
- Git (for version control)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/and.git
   cd and
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Fetch images from the official site:
   ```bash
   npm run fetch-images
   ```

### Development

The site is built with plain HTML, CSS, and JavaScript. No build process is required.

- Edit HTML files directly
- Modify CSS in `assets/css/style.css`
- Update JavaScript in `assets/js/` directory

### Image Management

The site includes an automated image system:

1. **Official Images**: The `scripts/fetchImages.js` script downloads images from the official Adrian & Sons website
2. **Auto-Fallback**: Images without local sources use Unsplash Source for relevant stock photos
3. **Graceful Degradation**: Placeholder images if remote sources fail

To update images:
```bash
npm run fetch-images
```

### GitHub Actions

The repository includes a GitHub Action that automatically syncs images weekly:
- Runs every Monday at 6:00 AM UTC
- Can be triggered manually via GitHub Actions
- Commits new images automatically

## Deployment

### GitHub Pages

1. Push to GitHub repository named `and`
2. Enable GitHub Pages in repository settings
3. Site will be available at `https://yourusername.github.io/and/`

### Manual Deployment

Upload all files to any static hosting service:
- Netlify
- Vercel
- AWS S3
- Any web server

## Customization

### Colors and Styling

Edit CSS variables in `assets/css/style.css`:
```css
:root {
  --primary: #2c3e50;
  --accent: #e74c3c;
  /* ... other variables */
}
```

### Content Updates

- **Contact Information**: Update phone and email in all HTML files
- **Services**: Modify content in `services.html`
- **Projects**: Add/remove projects in `projects.html`
- **Reviews**: Update testimonials in `reviews.html`

### Form Integration

The contact form uses Formspree. To set up:

1. Create account at [Formspree](https://formspree.io)
2. Create a new form
3. Replace `your-form-id` in `contact.html` with your actual form ID

## Performance Features

- **Lazy Loading**: Images load only when needed
- **Responsive Images**: Multiple sizes with srcset
- **Deferred Scripts**: JavaScript loads after page content
- **Optimized CSS**: Minimal, efficient stylesheets
- **No External Dependencies**: Self-contained for maximum speed

## SEO Features

- Unique title and meta description for each page
- Semantic HTML structure
- Open Graph tags for social sharing
- Proper heading hierarchy
- Alt text for all images
- Clean URLs and navigation

## Accessibility Features

- Skip links for keyboard navigation
- Visible focus indicators
- Proper ARIA labels
- Semantic HTML elements
- High contrast color scheme
- Screen reader friendly structure

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - see LICENSE file for details.

## Support

For technical support or questions about the website, contact the development team.

---

**Adrian & Sons Group Limited**  
Renovations • Refurbishments • Home Rebuilds  
Phone: 07710 563 430  
Email: info@adrianandsonsgrouplimited.co.uk
