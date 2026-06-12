import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// Cloudflare (OpenNext) build: no `output: 'export'` — the app is rendered by a
// Cloudflare Worker, not exported to static HTML. Served at the domain root, so
// no basePath/assetPrefix (those were only for the GitHub Pages subpath on main).
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  webpack: (config) => {
    // Inline YAML files as raw strings at build time. The Cloudflare Workers
    // runtime has no filesystem, so data files must be bundled, not read with
    // fs at runtime (see data/events.ts).
    config.module.rules.push({ test: /\.ya?ml$/, type: 'asset/source' });
    return config;
  },
};

export default nextConfig;

// Makes Cloudflare bindings available during `next dev`.
initOpenNextCloudflareForDev();
