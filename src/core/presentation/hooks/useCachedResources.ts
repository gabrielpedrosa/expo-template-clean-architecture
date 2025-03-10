import { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { SplashScreen } from "expo-router";
import configJson from '@config/config.json';


export default function useCachedResources() {
	const [isLoadingComplete, setLoadingComplete] = useState(false);

	useEffect(() => {
		async function loadResourcesAndDataAsync() {
			try {
				const [fontsLoaded] = useFonts({
					SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
				});

				if(!fontsLoaded) {
					return;
				}
				
			} catch (error) {
				console.warn(error);
			} finally {
				setLoadingComplete(true);
				await SplashScreen.hideAsync();
			}
		}

		loadResourcesAndDataAsync();
	}, []);

  	return isLoadingComplete;
}