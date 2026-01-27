# QUICK START GUIDE

## ✅ What's Been Created

### Core Files (Ready to Use)
1. **index.html** - Homepage with 4 company buttons
2. **styles.css** - Complete styling for all pages
3. **Company Pages** (4 pages):
   - andys-xpress-wash.html
   - ampm.html
   - archibalds.html
   - parkcrest-properties.html
4. **contact-form-parkcrest.html** - Sample contact form

## 🎯 IMMEDIATE NEXT STEPS

### Step 1: Add Your Logo (5 minutes)
```
1. Create folder: assets/
2. Add your logo: assets/logo.png
3. Recommended size: 200px wide
```

### Step 2: Test Locally (2 minutes)
```
1. Open index.html in a web browser
2. Click through each company
3. Test the dropdown menu
4. Verify all links work
```

### Step 3: Create Missing Pages (30 minutes)
You need to create these pages by copying the contact form template:

**For Each Company (Andy's, AMPM, Archibald's, Parkcrest):**
- Contact form (1 sample provided)
- Benefits page
- Tax & Labor page

Total: 12 additional pages needed

### Step 4: Upload to GitHub (10 minutes)
```bash
git add .
git commit -m "New employee portal structure"
git push origin main
```

## 📋 Page Creation Template

Use this structure for benefits and tax-labor pages:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Title] - [Company Name]</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <!-- Copy navigation from any company page -->
    <nav class="navbar">
        <!-- ... navigation code ... -->
    </nav>

    <!-- Add your content here -->
    <div class="content-container">
        <h1>[Page Title]</h1>
        <!-- Add PDF links, documents, info here -->
    </div>
</body>
</html>
```

## 🔍 What to Customize

1. **Logo** - Replace assets/logo.png
2. **Colors** - Edit styles.css (search for #667eea and #764ba2)
3. **Company Names** - Already done!
4. **Content** - Add documents/PDFs to resource pages
5. **Contact Form** - Add form processing backend

## ⚠️ Important Notes

- All pages use the same stylesheet (styles.css)
- Navigation is consistent across all pages
- Dropdown shows all 4 companies on every page
- Contact form needs backend processing (not included)
- Site is fully responsive (mobile-friendly)

## 🎨 Current Design

- **Colors**: Purple gradient background
- **Style**: Modern card-based layout
- **Font**: Segoe UI (system default)
- **Navigation**: Sticky top bar
- **Responsive**: Works on all devices

## 📞 Need Help?

Contact your development team or refer to README.md for detailed instructions.
