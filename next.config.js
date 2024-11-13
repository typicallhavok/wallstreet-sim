/** @type {import('next').NextConfig} */
const nextConfig = {
    // Disable webpack caching completely
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.cache = false;

        // Disable filesystem cache
        config.infrastructureLogging = {
            level: "error",
        };

        // Clear cache between builds
        if (dev) {
            config.optimization.removeAvailableModules = false;
            config.optimization.removeEmptyChunks = false;
            config.optimization.splitChunks = false;
        }

        return config;
    },
    // Other settings
    output: "standalone",
    poweredByHeader: false,
};

module.exports = nextConfig;
