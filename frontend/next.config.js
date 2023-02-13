/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true,
	},
	env: {
		API_URL: "http://localhost:3001",
	},
};

module.exports = nextConfig;
