require('dotenv').config();
const { createProxyMiddleware } = require('http-proxy-middleware');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    URL_SERVER: process.env.URL_SERVER
  },
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.URL_SERVER}/:path*`
      }
    ];
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*'
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'Origin, X-Requested-With, Content-Type, Accept'
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS'
          }
        ]
      }
    ];
  }  
}

module.exports = nextConfig
