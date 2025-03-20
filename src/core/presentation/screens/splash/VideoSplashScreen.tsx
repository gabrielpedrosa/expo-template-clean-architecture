import { StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';
import { SplashScreen } from 'expo-router';
import { useEventListener } from 'expo';

type VideoSplashScreenProps = {
    onComplete(status: boolean): void;
}

export const VideoSplashScreen = ({ onComplete }: VideoSplashScreenProps) => {
    const source = require('@assets/splash/video-splash.mp4');

    const player = useVideoPlayer(source, player => {
        player.loop = false;
        player.play();
    });

    useEventListener(player, 'statusChange', ({ status, error }) => {
        console.log('player status', status);
        if(status === 'readyToPlay') {
            SplashScreen.hideAsync();
        }
        if(status === 'idle') {
            onComplete(true);
        }
        if(error) {
            console.error('player error', error);
            onComplete(false);
        }
    });

    return (
        <VideoView contentFit={'cover'} style={StyleSheet.absoluteFill} player={player} allowsFullscreen allowsPictureInPicture />
    );
}