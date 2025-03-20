import { ExpoConfig } from "@expo/config-types";
import packageJson from "./package.json";

const appConfig: ExpoConfig = {
	name: "expo-template-clean-architecture",
	slug: "expo-template-clean-architecture",
	scheme: "rnca",
	version: packageJson.version,
	orientation: "default",
	icon: "./assets/images/icon.png",
	userInterfaceStyle: "light",
	newArchEnabled: true,
	splash: {
		image: "./assets/splash/splash-icon.png",
		resizeMode: "contain",
		backgroundColor: "#F5ECD5",
	},
	updates: {
		fallbackToCacheTimeout: 0,
	},
	assetBundlePatterns: ["**/*", "assets/**/*"],
	ios: {
		supportsTablet: true,
	},
	android: {
		package: "com.gabrielpedrosa.expo_template_clean_architecture",
		adaptiveIcon: {
			foregroundImage: "./assets/images/adaptive-icon.png", 
			backgroundColor: "#F5ECD5"
		},
	},
	web: {
		favicon: "./assets/images/favicon.png"
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