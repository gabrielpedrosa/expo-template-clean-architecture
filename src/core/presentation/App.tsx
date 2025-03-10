import Navigation from "./navigation";
import useCachedResources from "./hooks/useCachedResources";
import { Splash } from "./screens/splash/Splash";
import { useState } from "react";

export default function App() {
	const [splashComplete, setSplashComprete] = useState(false);

    const onComplete = (status: boolean) => {
        setSplashComprete(status);
    }

    return (
        splashComplete 
        ? <Navigation />
        : <Splash onComplete={onComplete}  />
    );
}