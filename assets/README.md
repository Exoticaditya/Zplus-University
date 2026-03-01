# 📸 Zplus University - Assets Guide

## Required Images

Place these images in the `assets/` folder for the MVP to display properly.

### Image Specifications

#### w4.jpeg - Hero/Fallback Image
- **Purpose**: Hero backgrounds and fallback image
- **Recommended Size**: 1920x1080px (Full HD)
- **Subject**: Generic university campus or modern building
- **Format**: JPEG
- **Quality**: High (80-90%)

#### w5.jpeg - IIT Bombay
- **Purpose**: Hero image for IIT Bombay
- **Recommended Size**: 1200x800px
- **Subject**: IIT Bombay campus, main building, or iconic architecture
- **Location**: Mumbai, Maharashtra
- **Format**: JPEG
- **Quality**: High (80-90%)
- **Suggested Search**: "IIT Bombay campus", "IIT Bombay main building"

#### w6.jpeg - IIM Ahmedabad
- **Purpose**: Hero image for IIM Ahmedabad
- **Recommended Size**: 1200x800px
- **Subject**: IIM-A campus, Louis Kahn Plaza, or distinctive red brick buildings
- **Location**: Ahmedabad, Gujarat
- **Format**: JPEG
- **Quality**: High (80-90%)
- **Suggested Search**: "IIM Ahmedabad campus", "Louis Kahn Plaza"

#### w7.jpeg - Delhi University
- **Purpose**: Hero image for Delhi University
- **Recommended Size**: 1200x800px
- **Subject**: Delhi University campus, North Campus, or college buildings
- **Location**: New Delhi, Delhi
- **Format**: JPEG
- **Quality**: High (80-90%)
- **Suggested Search**: "Delhi University North Campus", "DU campus"

#### w9.jpeg - Manipal University
- **Purpose**: Hero image for Manipal University
- **Recommended Size**: 1200x800px
- **Subject**: Manipal campus, medical college, or university buildings
- **Location**: Manipal, Karnataka
- **Format**: JPEG
- **Quality**: High (80-90%)
- **Suggested Search**: "Manipal University campus", "Manipal MAHE"

---

## Quick Setup

### Option 1: Using Stock Photos (Fastest)
1. Visit free stock photo sites:
   - Unsplash.com
   - Pexels.com
   - Pixabay.com

2. Search for:
   - "university campus"
   - "college building"
   - "modern education building"

3. Download 5 different campus images
4. Rename them to: w4.jpeg, w5.jpeg, w6.jpeg, w7.jpeg, w9.jpeg
5. Place in `assets/` folder

### Option 2: Using Google Images (For Testing)
1. Search for each university name + "campus"
2. Download appropriate images
3. Rename as specified
4. Place in `assets/` folder

**Note**: For production, ensure you have proper image rights/licenses.

### Option 3: Using Placeholder (No Downloads)
The site will work with placeholder images showing:
- University name on colored gradient background
- Icon representing the institution

---

## File Structure

After adding images, your folder should look like:

```
c:\zpluse-education\
└── assets/
    ├── w4.jpeg    ← Hero/Fallback
    ├── w5.jpeg    ← IIT Bombay
    ├── w6.jpeg    ← IIM Ahmedabad
    ├── w7.jpeg    ← Delhi University
    └── w9.jpeg    ← Manipal University
```

---

## Image Optimization Tips

### For Best Performance
1. **Compress images** using:
   - TinyPNG.com
   - Compressor.io
   - Squoosh.app

2. **Target file size**: 200-500 KB per image

3. **Keep dimensions**:
   - Width: 1200-1920px
   - Height: 800-1080px
   - Aspect ratio: 16:9 or 3:2

### For SEO
1. Use descriptive filenames (already done: w5-w9)
2. Add ALT text in code (already implemented)
3. Use WebP format for modern browsers (future enhancement)

---

## Testing Without Images

The MVP will work without images by showing:
- Colored gradient backgrounds
- University icons
- All functionality intact

To test without images:
1. Simply open `index.html`
2. Cards will show placeholder backgrounds
3. Click through to test all features

---

## Copyright Notice

⚠️ **Important**: Ensure you have rights to use any images in production.

**For MVP/Testing**: Stock photos or placeholders are fine  
**For Production**: Use:
- Official university images (with permission)
- Licensed stock photos
- Your own photographs
- Public domain images

---

## Alternative: Using University Official Photos

Contact universities' media departments for official images:
- IIT Bombay: pr@iitb.ac.in
- IIM Ahmedabad: communications@iima.ac.in
- Delhi University: vicechancellor@du.ac.in
- Manipal University: pr@manipal.edu

Request:
- High-resolution campus photos
- Permission for educational portal use
- Proper attribution requirements

---

## Quick Reference

| File | University | Stream | Location |
|------|-----------|--------|----------|
| w4.jpeg | Fallback | Any | Generic |
| w5.jpeg | IIT Bombay | Engineering | Mumbai |
| w6.jpeg | IIM Ahmedabad | MBA | Ahmedabad |
| w7.jpeg | Delhi University | Arts | Delhi |
| w9.jpeg | Manipal University | Medical | Manipal |

---

## Need Help?

Images not showing?
1. Check filename spelling (exact match required)
2. Check file format (must be .jpeg not .jpg)
3. Check file location (must be in `assets/` folder)
4. Refresh browser (Ctrl+F5)

Still having issues?
- Check browser console (F12) for errors
- Verify file paths are correct
- Ensure images are not corrupted

---

**Ready to go!** Once images are in place, refresh `index.html` to see them. 🎨✨
