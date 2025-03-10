import { AVPlaybackStatus, ResizeMode, Video } from 'expo-av';
import { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SplashScreen } from 'expo-router';

type VideoSplashScreenProps = {
    onComplete(status: boolean): void;
}

export const VideoSplashScreen = ({ onComplete }: VideoSplashScreenProps) => {

    const [lastStatus] = useState<AVPlaybackStatus>({} as AVPlaybackStatus);
    
    const onPlaybackStatusUpdate = (status: AVPlaybackStatus) => {
        if(status.isLoaded) {
            if(lastStatus.isLoaded !== status.isLoaded) {
                SplashScreen.hideAsync();
            }

            if(status.didJustFinish) {
                onComplete(true);
            }
        }        
    }

    return (
        <Video
            style={StyleSheet.absoluteFill}
            resizeMode={ResizeMode.COVER}
            source={require('../../../../../assets/videos/video-splash.mp4')}
            isLooping={false}
            shouldPlay={true}
            onPlaybackStatusUpdate={onPlaybackStatusUpdate}
            />
    );
}