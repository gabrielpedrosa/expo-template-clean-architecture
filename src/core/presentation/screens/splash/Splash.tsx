import { VideoSplashScreen } from "./VideoSplashScreen";
import configJson from "../../../../config/config.json";
import { SplashScreen } from "expo-router";
import { useEffect, useState } from "react";

// Impede que a SplashScreen seja ocultada automaticamente
if(configJson.app.splashScreen.show) {
	SplashScreen.preventAutoHideAsync();
}

type SplashProps = {
    onComplete(status: boolean): void;
}

export const Splash: React.FC<SplashProps> = ({ onComplete }) => {
    const [showSplashScreen] = useState(configJson.app.splashScreen.showVideo);

    useEffect(() => {
        if (!showSplashScreen) {
            SplashScreen.hideAsync();
            onComplete(true);
        }
    }, [showSplashScreen, onComplete]);

    if (!showSplashScreen) {
        return null;
    }

    return (
        <VideoSplashScreen onComplete={onComplete}/>
    );
}