import * as React from 'react';

import { Text, View, TouchableOpacity, Switch, Button, StyleSheet } from 'react-native';

import useStore from '../store';

const DataList = ({route, navigation}) => {
    const locationHistory = useStore(state => state.locationHistory);

    React.useEffect(() => {
        console.log(locationHistory);
    }, []);

    return (
        <View style={{marginTop: 50}}>
            {locationHistory.map((i) => (
                <TouchableOpacity onPress={() => navigation.navigate('Detail', {'data':i})}>
                    {i && <Text style={{backgroundColor:'orange'}}>{i.name}</Text>}
                </TouchableOpacity>
                
            ))}
        </View>
    )
}

export { DataList }