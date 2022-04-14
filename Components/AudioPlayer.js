import { Box, Row, View } from 'native-base';
import * as React from 'react';
import { Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

import TrackPlayer, { Event, State, useTrackPlayerEvents, PlaybackState } from 'react-native-track-player';
import RNFetchBlob from 'rn-fetch-blob';

import Entypo from 'react-native-vector-icons/Entypo';


const AudioPlayer = () => {
    const [playing, setPlaying] = React.useState(false);
    const [trackTitle, setTrackTitle] = React.useState();
    const [tracks, setTracks] = React.useState({
        url: "https://msiuykywslftwnljftfj.supabase.co/storage/v1/object/public/tours/music.mp3",
        title: "Spanish Flee",
        artist: "Herb Alpert",
        album: "The history of the world", 
    });      

    useTrackPlayerEvents([Event.PlaybackTrackChanged, Event.PlaybackState], async event => {
        if (event.type === Event.PlaybackTrackChanged && event.nextTrack != null) {
            const track = await TrackPlayer.getTrack(event.nextTrack);
            const {title} = track || {};
            setTrackTitle(title);
        } else if (event.type === Event.PlaybackState) {
            if(event.state === State.Playing) {
                setPlaying(true);
            } else if(event.state === State.Paused) {
                setPlaying(false);
            }
        }
    });

    const getButton = () => {
        if(playing) {
            return (
                <TouchableOpacity style={styles.button} onPress={TrackPlayer.pause}>
                    <Entypo name="controller-paus" size={25} color="#333333"/>
                </TouchableOpacity>  
            )
        } else {
            return (
                <TouchableOpacity style={styles.button} onPress={TrackPlayer.play}>
                    <Entypo name="controller-play" size={25} color="#333333"/>
                </TouchableOpacity>  
            )    
        }
    }

    const addTrack = async () => await TrackPlayer.add([tracks]);

    React.useEffect(() => {
        addTrack();
        return TrackPlayer.pause();
    }, [])

    return (
        <View style={styles.player}>
            <Box style={styles.name}>
                <Text>Now Playing</Text>
                <Text>{trackTitle}</Text>
            </Box>
            {getButton()}            
        </View>
    )
}

const styles = StyleSheet.create({
    player: {
        position: 'static',
        marginTop: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        backgroundColor: '#E6E7E8'
    },
    name: {
        marginLeft: 25,
        marginRight: 'auto',
    },
    button: {
        marginRight: 15
    }
});

export {AudioPlayer}
