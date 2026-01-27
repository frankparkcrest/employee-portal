# Employee Portal Website

Multi-company employee portal with company selection and resource access.

## 🏢 Companies
- Andy's Xpress Wash
- AMPM
- Archibald's
- Parkcrest Properties

## 📁 Project Structure

```
/
├── index.html                      # Landing page (company selection)
├── styles.css                      # Main stylesheet
├── andys-xpress-wash.html         # Andy's company page
├── ampm.html                       # AMPM company page
├── archibalds.html                # Archibald's company page
├── parkcrest-properties.html      # Parkcrest company page
├── contact-form-parkcrest.html    # Sample contact form
│
└── assets/                         # Create this folder
    └── logo.png                    # Add your logo here
```

## 🚀 Setup Instructions

### 1. Add Your Logo
- Create an `assets` folder in the root directory
- Add your company logo as `logo.png` (recommended size: 200px width)
- If using a different filename, update all HTML files

### 2. Create Additional Pages

You'll need to create these pages for each company:

**Contact Forms:**
- `contact-form-andys.html`
- `contact-form-ampm.html`
- `contact-form-archibalds.html`
- `contact-form-parkcrest.html` (sample provided)

**Benefits Pages:**
- `benefits-andys.html`
- `benefits-ampm.html`
- `benefits-archibalds.html`
- `benefits-parkcrest.html`

**Tax & Labor Pages:**
- `tax-labor-andys.html`
- `tax-labor-ampm.html`
- `tax-labor-archibalds.html`
- `tax-labor-parkcrest.html`

### 3. Organize Company Resources

Create folders for company-specific documents:

```
/assets/
  /andys/
    /benefits/
    /tax-labor/
  /ampm/
    /benefits/
    /tax-labor/
  /archibalds/
    /benefits/
    /tax-labor/
  /parkcrest/
    /benefits/
    /tax-labor/
```

### 4. GitHub Deployment

```bash
# Clone your repository
git clone [your-repo-url]
cd [your-repo-name]

# Add all files
git add .

# Commit changes
git commit -m "Updated employee portal with new structure"

# Push to GitHub
git push origin main
```

### 5. Enable GitHub Pages (Optional)

1. Go to your repository on GitHub
2. Click **Settings**
3. Scroll to **Pages** section
4. Under "Source", select **main branch**
5. Click **Save**
6. Your site will be live at: `https://[username].github.io/[repo-name]`

## 🎨 Customization

### Colors
Edit `styles.css` to change the color scheme:
- Primary color: `#667eea` (purple-blue)
- Secondary color: `#764ba2` (purple)
- Update these throughout the CSS file

### Navigation
The navigation bar includes:
- Logo (links to homepage)
- Select Company dropdown
- Contact Form button

### Responsive Design
The site is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 📝 Notes

- **Contact Form**: Sample form provided. You'll need to add backend processing (PHP, form service, etc.)
- **Document Links**: Update resource pages with actual PDF/document links
- **Logo**: Replace placeholder with your actual logo
- **Content**: Customize text and descriptions for each company

## 🔧 Future Enhancements

Consider adding:
- Search functionality
- Employee login system
- Document upload capabilities
- Announcement section
- FAQ section
- Footer with contact information

## 📞 Support

For questions or issues, contact your web development team.
