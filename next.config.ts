import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['127.0.0.1'], // Use 127.0.0.1 instead of 'localhost'
    deviceSizes: [320, 420, 768, 1024, 1200], // Optional: Define custom breakpoints for responsive images
  },
  devIndicators: {
    buildActivity: false, // Hide build activity indicator
    buildActivityPosition: 'bottom-right', // Optional: Move it to another position if enabled
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.infrastructureLogging = { level: 'error' }; // Show only errors, suppress warnings
    }
    return config;
  },
  reactStrictMode: true, // Enforce strict mode for development
};

export default nextConfig;
