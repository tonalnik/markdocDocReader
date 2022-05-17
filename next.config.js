module.exports = {
	eslint: { ignoreDuringBuilds: true },
	pageExtensions: ["tsx"],
	basePath: process.env.BASE_PATH ?? "",
	webpack: (config, options) => {
		config.optimization.minimize = false;
		return config;
	},
};
