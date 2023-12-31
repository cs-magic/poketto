/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validations. This is especially useful
 * for Docker builds.
 */
await import("./src/env.mjs");

import bundleAnalyzer from "@next/bundle-analyzer";


const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true"
});

/** @type {import("next").NextConfig} */
const config = {

  experimental: {
    // typedRoutes: true // too strict, since we have a dozen of json uri
    serverActions: true

  },

  distDir: process.env.DIST ?? ".next",

  reactStrictMode: true,

  /**
   * 1. If you have `experimental: { appDir: true }` set, then you must comment the below `i18n` config
   * out. @see https://github.com/vercel/next.js/issues/41980
   * 2. i18n mjs 支持，@see https://github.com/t3-oss/create-t3-app/issues/332#issuecomment-1243022020, https://github.com/jmarianski/t3-i18n
   */
  i18n: {
    defaultLocale: "zh-CN",
    locales: ["zh-CN", "en"]
  },

  // ref: https://nextjs.org/docs/api-reference/next/image#remote-patterns
  images: {
    remotePatterns: [// ref:https://stackoverflow.com/a/73951135/9422455
      { protocol: "http", hostname: "**" },
      { protocol: "https", hostname: "**" }
    ]
  },

  // 这个可以，ref: https://frontend-digest.com/how-to-import-svgs-into-nextjs-8ec6100e613f
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    });

    return config;
  }
};

export default withBundleAnalyzer(config);
