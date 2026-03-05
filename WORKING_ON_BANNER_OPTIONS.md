# "Working On Right Now" Banner - Style Options

Your site uses:
- **Primary Color**: #c1272d (red accent)
- **Background**: #fff9e1 (cream/beige)
- **Font**: League Spartan
- **Hover Effects**: Smooth color transitions

---

## Option 1: Minimal Inline Banner (Recommended)
Simple, clean, matches your navigation style.

### HTML (Place right after `<header>` closing tag)
```html
<div class="working-on-banner-v1">
    <p>Currently working on: <strong>Film Title</strong> 
    <a href="https://instagram.com/account" target="_blank">→ Follow on Instagram</a></p>
</div>
```

### CSS (Add to your `styles/css.css`)
```css
.working-on-banner-v1 {
  background: #fff9e1;
  border-top: 3px solid #c1272d;
  border-bottom: 3px solid #c1272d;
  padding: 12px 10px;
  margin: 20px 0;
  text-align: center;
  font-family: "League Spartan", sans-serif;
  font-size: clamp(12px, 2vw, 16px);
}

.working-on-banner-v1 strong {
  color: #c1272d;
  font-weight: 600;
}

.working-on-banner-v1 a {
  color: #c1272d;
  text-decoration: none;
  margin-left: 8px;
  transition: opacity 0.3s ease;
}

.working-on-banner-v1 a:hover {
  opacity: 0.7;
  text-decoration: underline;
}
```

---

## Option 2: Left-Aligned Box with Icon
More prominent, sidebar-style presentation.

### HTML
```html
<div class="working-on-banner-v2">
    <span class="material-symbols-outlined">videocam</span>
    <div class="banner-content">
        <p class="banner-label">Currently working on</p>
        <p class="banner-title">Film Title</p>
        <a href="https://instagram.com/account" target="_blank">Follow the journey →</a>
    </div>
</div>
```

### CSS
```css
.working-on-banner-v2 {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  background: #fff9e1;
  border-left: 5px solid #c1272d;
  padding: 20px;
  margin: 30px 0;
  border-radius: 4px;
}

.working-on-banner-v2 .material-symbols-outlined {
  color: #c1272d;
  font-size: 32px;
  flex-shrink: 0;
}

.banner-content {
  flex: 1;
}

.banner-label {
  margin: 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 1px;
  color: #666;
}

.banner-title {
  margin: 5px 0 10px 0;
  font-size: clamp(16px, 2.5vw, 24px);
  font-weight: 700;
  color: #c1272d;
}

.working-on-banner-v2 a {
  color: #c1272d;
  text-decoration: none;
  transition: color 0.3s ease;
}

.working-on-banner-v2 a:hover {
  text-decoration: underline;
}
```

---

## Option 3: Gradient Background (Modern)
Eye-catching with subtle gradient.

### HTML
```html
<div class="working-on-banner-v3">
    <div class="banner-inner">
        <h3>Currently filming</h3>
        <p class="film-name">Film Title</p>
        <p class="follow-text">Stay updated: 
            <a href="https://instagram.com/account" target="_blank">@instagram_handle</a>
        </p>
    </div>
</div>
```

### CSS
```css
.working-on-banner-v3 {
  background: linear-gradient(135deg, #fff9e1 0%, #ffe8e8 100%);
  border-radius: 8px;
  padding: 25px;
  margin: 30px 0;
  border: 2px solid #c1272d;
  text-align: center;
}

.banner-inner h3 {
  margin: 0 0 10px 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #666;
  font-weight: 400;
}

.banner-inner .film-name {
  margin: 0 0 15px 0;
  font-size: clamp(18px, 3vw, 28px);
  font-weight: 700;
  color: #c1272d;
}

.follow-text {
  margin: 0;
  font-size: clamp(12px, 1.8vw, 14px);
  color: #333;
}

.working-on-banner-v3 a {
  color: #c1272d;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.working-on-banner-v3 a:hover {
  text-decoration: underline;
}
```

---

## Option 4: Filmstrip Style (Themed)
Matches your preloader filmstrip aesthetic.

### HTML
```html
<div class="working-on-banner-v4">
    <div class="filmstrip-decoration left"></div>
    <div class="banner-content">
        <p class="label">🎬 IN PRODUCTION</p>
        <h3>Film Title</h3>
        <a href="https://instagram.com/account" target="_blank">Follow on Instagram</a>
    </div>
    <div class="filmstrip-decoration right"></div>
</div>
```

### CSS
```css
.working-on-banner-v4 {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  background: #fff9e1;
  border: 2px solid #000;
  padding: 20px;
  margin: 30px 0;
  border-radius: 4px;
  position: relative;
}

.filmstrip-decoration {
  width: 20px;
  height: 80px;
  background: #000;
  position: relative;
  border-radius: 2px;
}

.filmstrip-decoration::before,
.filmstrip-decoration::after {
  content: "";
  position: absolute;
  background: #fff9e1;
  border-radius: 50%;
}

.filmstrip-decoration::before {
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
}

.filmstrip-decoration::after {
  bottom: 8px;
  left: 50%;
  transform: translateX(-50%);
  width: 8px;
  height: 8px;
}

.working-on-banner-v4 .banner-content {
  text-align: center;
  flex: 1;
}

.label {
  margin: 0;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  color: #666;
  font-weight: 600;
}

.working-on-banner-v4 h3 {
  margin: 8px 0 12px 0;
  font-size: clamp(18px, 2.8vw, 26px);
  color: #c1272d;
}

.working-on-banner-v4 a {
  color: #c1272d;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.working-on-banner-v4 a:hover {
  text-decoration: underline;
}
```

---

## Implementation Steps

1. **Choose your style** (I recommend Option 1 or 2 for subtlety)
2. **Add CSS** to `/docs/styles/css.css` and `/src/Styles/css.scss` (whichever is your source)
3. **Add HTML** right after the `</header>` tag on these pages:
   - OrangeJuiceBTS.html
   - APOCBTS.html
   - ComeAliveBTS.html
   - LiveHKBTS.html
   - NineLivesBTS.html
   - PaperTrailBTS.html
   - SplatBTS.html
   - ThumbsBTS.html
   - HumanTouchBTS.html
   - (Optional) otherMediaHome.html or index.html if you want it site-wide

4. **Update the values**:
   - Replace `Film Title` with your current project name
   - Replace `https://instagram.com/account` with your actual Instagram link

---

## Which pages have film BTS content?
- APOCBTS.html ✓
- ComeAliveBTS.html ✓
- HumanTouchBTS.html ✓
- LiveHKBTS.html ✓
- NineLivesBTS.html ✓
- OrangeJuiceBTS.html ✓
- PaperTrailBTS.html ✓
- SplatBTS.html ✓
- ThumbsBTS.html ✓

All 9 BTS pages would be good candidates for this banner.
