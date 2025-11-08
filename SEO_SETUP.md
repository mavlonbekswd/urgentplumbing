# SEO Setup Guide - Sitemap and Robots.txt

Your website now includes SEO files to help Google and other search engines index your site properly.

## Files Created

1. **sitemap.xml** - Tells search engines about your website pages
2. **robots.txt** - Instructs search engine crawlers what they can access

## Setup Instructions

### Step 1: Update Your Domain in sitemap.xml

1. Open `sitemap.xml`
2. Replace `yourwebsite.com` with your actual domain name (e.g., `urgentplumbing.com`)
3. Update the `lastmod` date to today's date (format: YYYY-MM-DD)
4. Example:
   ```xml
   <loc>https://urgentplumbing.com/</loc>
   <lastmod>2024-01-15</lastmod>
   ```

### Step 2: Update Your Domain in robots.txt

1. Open `robots.txt`
2. Find the line: `Sitemap: https://yourwebsite.com/sitemap.xml`
3. Replace `yourwebsite.com` with your actual domain
4. Example:
   ```
   Sitemap: https://urgentplumbing.com/sitemap.xml
   ```

### Step 3: Upload Files to Your Server

Make sure both files are in the root directory of your website:
```
your-website/
├── index.html
├── sitemap.xml      ← Must be in root
├── robots.txt       ← Must be in root
└── ...
```

### Step 4: Submit to Google Search Console

1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your website property
3. Verify ownership (follow Google's instructions)
4. Once verified:
   - Go to "Sitemaps" in the left menu
   - Enter `sitemap.xml` in the "Add a new sitemap" field
   - Click "Submit"

## What These Files Do

### sitemap.xml
- **Purpose**: Helps search engines discover and index your pages
- **Contains**: List of all pages on your website with priorities and update frequencies
- **Benefits**: Faster indexing, better search visibility

### robots.txt
- **Purpose**: Tells search engine crawlers what they can and cannot access
- **Contains**: 
  - Allows all pages to be crawled
  - Blocks non-essential files (thank-you page, markdown files)
  - Points to your sitemap location
- **Benefits**: Better crawl efficiency, protects private content

## Testing Your Files

### Test sitemap.xml
- Visit: `https://urgentplumbing.uk/sitemap.xml`
- Should display as XML in your browser
- Can also validate at: https://www.xml-sitemaps.com/validate-xml-sitemap.html

### Test robots.txt
- Visit: `https://urgentplumbing.uk/robots.txt`
- Should display the text content
- Can also test at: https://www.google.com/webmasters/tools/robots-testing-tool

## Updating Your Sitemap

When you add new pages to your website:

1. Open `sitemap.xml`
2. Add a new `<url>` entry for each new page
3. Update the `lastmod` date
4. Example for a new "About" page:
   ```xml
   <url>
       <loc>https://urgentplumbing.uk/about.html</loc>
       <lastmod>2024-01-15</lastmod>
       <changefreq>monthly</changefreq>
       <priority>0.8</priority>
   </url>
   ```

## Priority Guidelines

- **1.0**: Homepage (most important)
- **0.8**: Main service pages
- **0.6**: Secondary pages
- **0.4**: Blog posts or less important pages

## Change Frequency

- **always**: Pages that change with every visit
- **hourly**: Pages that change hourly
- **daily**: Pages that change daily
- **weekly**: Pages that change weekly
- **monthly**: Pages that change monthly
- **yearly**: Pages that rarely change
- **never**: Archived pages

## Troubleshooting

### Sitemap not found?
- Check file is named exactly `sitemap.xml` (lowercase)
- Verify it's in the root directory
- Check file permissions (should be readable)

### Robots.txt not working?
- Check file is named exactly `robots.txt` (lowercase)
- Verify it's in the root directory
- Ensure no extra characters or spaces

### Google not indexing?
- Wait 1-2 weeks after submission (normal delay)
- Check Google Search Console for errors
- Verify your site is accessible (not password protected)
- Make sure your site has quality content

## Additional SEO Tips

1. **Update sitemap regularly**: When you add new content, update the sitemap
2. **Monitor Search Console**: Check for crawl errors regularly
3. **Keep content fresh**: Regular updates help with SEO
4. **Use descriptive URLs**: Keep file names descriptive
5. **Add meta descriptions**: Already included in your HTML

---

**Your SEO files are ready!** Just update the domain names and upload to your server.

