import packageJson from "./package.json" assert { type: "json" };
const ENV = process.env.NODE_ENV;

/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	distDir: ENV === "production" ? "out" : undefined,
	basePath: "/pomodoros",
	env: {
		NEXT_PUBLIC_VERSION: packageJson.version,
	},
};

export default nextConfig;
