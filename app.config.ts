import { ExpoConfig } from "@expo/config-types";
import packageJson from "./package.json";
// import configJson from "@config/config.json";
import configJson from "./src/config/config.json";

const appConfig: ExpoConfig = {
	name: configJson.app.name,
	slug: configJson.app.slug,
	scheme: "rnca",
	version: packageJson.version,
	orientation: "portrait",
	icon: configJson.app.icon,
	userInterfaceStyle: "light",
	newArchEnabled: true,
	splash: {
		image: configJson.app.splashScreen.image,
		resizeMode: configJson.app.splashScreen.resizeMode as "contain" | "cover" ?? "contain",
		backgroundColor: configJson.app.splashScreen.backgroundColor ?? "#FFFFFF",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*", "assets/**/*"],
	ios: {
		supportsTablet: true,
	},
	android: {
		package: configJson.app.package,
		adaptiveIcon: configJson.app.adaptiveIcon
	},
	web: {
		favicon: configJson.app.favicon
	},
	plugins: [
		[
			"expo-build-properties",
			{
				ios: {
				deploymentTarget: "15.1",
				useFrameworks: "static",
				},
			},
		],
		"expo-localization",
		"expo-tracking-transparency",
	],
};

export default appConfig;