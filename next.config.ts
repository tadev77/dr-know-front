import type { NextConfig } from "next";

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/:slug*',
        destination: 'http://localhost:3005/api/:slug*'
      },
    ]
  },
}