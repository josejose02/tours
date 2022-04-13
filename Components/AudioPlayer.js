import { Box } from 'native-base';
import * as React from 'react';
import { Text, Button } from 'react-native';

import TrackPlayer, { Event, useTrackPlayerEvents } from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';

const AudioPlayer = () => {
    const [trackTitle, setTrackTitle] = React.useState();
    const [tracks, setTracks] = React.useState({
        url: "https://msiuykywslftwnljftfj.supabase.co/storage/v1/object/public/tours/music.mp3",
        title: "Spanish Flee",
        artist: "Herb Alpert",
        album: "The history of the world", 
    });

    useTrackPlayerEvents([Event.PlaybackTrackChanged], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const {title} = track || {};
            setTrackTitle(title);
        }
    });

    const addTrack = async () => await TrackPlayer.add([tracks]);

    React.useEffect(() => {
        addTrack();
        return TrackPlayer.pause();
    }, [])

    return (
        <Box style={{zIndex: 3, elevation: 3, marginBottom: 20}}>
            <Box style={{flexDirection:'row'}}>
                <Button onPress={TrackPlayer.play} title="Play"></Button>
                <Button onPress={TrackPlayer.pause} title="Stop"></Button>
                <Text>{trackTitle}</Text>
            </Box>
        </Box>
    )
}

export {AudioPlayer}
