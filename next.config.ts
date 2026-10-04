import type { NextConfig } from "next";

// Any *.vercel.app host (preview and per-commit deployments) is served with a noindex header,
// so preview copies of the site can never compete with urgentplumbing.uk in search results.
const ANY_VERCEL_HOST = "(?<vercelHost>.*\\.vercel\\.app)";

const nextConfig: NextConfig = {
  // The Playwright suite builds into its own folder so a running `next dev` can't clash with it.
  distDir: process.env.NEXT_DIST_DIR || ".next",
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    // Only bundle the icons that are actually imported.
    optimizePackageImports: ["@phosphor-icons/react"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: ANY_VERCEL_HOST }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
  async redirects() {
    // URLs from the previous single-page static site, so old links and bookmarks still land.
    return [
      { source: "/index.html", destination: "/", permanent: true },
      { source: "/thank-you.html", destination: "/thank-you", permanent: true },
    ];
  },
};

export default nextConfig;
