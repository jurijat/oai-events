import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// Cloudflare (OpenNext) build: no `output: 'export'` — the app is rendered by a
// Cloudflare Worker, not exported to static HTML. Served at the domain root, so
// no basePath/assetPrefix (those were only for the GitHub Pages subpath on main).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;

// Makes Cloudflare bindings available during `next dev`.
initOpenNextCloudflareForDev();
