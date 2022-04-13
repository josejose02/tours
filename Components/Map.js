import * as React from 'react';
import { Text } from 'react-native';

import { NativeBaseProvider, Box } from "native-base";

import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';

const Map = ({location, locations, fences, locationsId}) => {

    const getCoords = (loc) => {
        if(typeof loc == 'object') return loc["coords"];
        return {latitude: 39.016798, longitude: 125.747361};
    }

    const getLocations = (locs) => {
        return locs;
    }

    const getName = (fence) => {
        if(locations[locationsId[fence]]) return locations[locationsId[fence]]['name'];
    }

    return (
        <Box style={{position: "absolute", bottom: 0, top: 0, right: 0, left: 0, zIndex: 1, elevation: 1}}>
            <MapView 
                style={{ position: "absolute", bottom: 0, top: 0, right: 0, left: 0 }}
                initialRegion={{
                    latitude: getCoords(location).latitude,
                    longitude: getCoords(location).longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005 }}>
            {getLocations(fences).map((loc) => (
                <Marker key={loc.id}
                coordinate={{"latitude": loc.latitude, "longitude": loc.longitude}}
                title={getName(loc.identifier.split("-")[0])}
                />
            ))}
                <Marker pinColor="blue" coordinate={{"latitude": getCoords(location).latitude, "longitude": getCoords(location).longitude}} title="You!"/>
            </MapView>
        </Box>
    )
}
  

export { Map }