import type { NextConfig } from 'next';
import { initOpenNextCloudflareForDev } from '@opennextjs/cloudflare';

// This config serves two deploy targets from one codebase:
//   - GitHub Pages (default): static export (`output: 'export'`) under the repo
//     subpath, driven by NEXT_PUBLIC_BASE_PATH.
//   - Cloudflare Workers (CF_BUILD=1): rendered by an OpenNext Worker at the
//     domain root, so no static export / basePath / assetPrefix.
const isCloudflare = process.env.CF_BUILD === '1';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  images: { unoptimized: true },
  trailingSlash: true,
  webpack: (config) => {
    // Inline YAML files as raw strings at build time (see data/events.ts). Works
    // for both targets: the Workers runtime has no filesystem, and the static
    // export build has no Node runtime to read files at request time.
    config.module.rules.push({ test: /\.ya?ml$/, type: 'asset/source' });
    return config;
  },
  // GitHub Pages only: emit static HTML under the repo subpath.
  ...(isCloudflare
    ? {}
    : {
        output: 'export',
        basePath: basePath || undefined,
        assetPrefix: basePath || undefined,
        env: { NEXT_PUBLIC_BASE_PATH: basePath },
      }),
};

export default nextConfig;

// Makes Cloudflare bindings available during `next dev` — only relevant to the
// Worker target, skipped for the Pages build.
if (isCloudflare) initOpenNextCloudflareForDev();
