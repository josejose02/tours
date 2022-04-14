import * as React from 'react';

import { Text, Switch, Button, StyleSheet, Pressable } from 'react-native';
import { NativeBaseProvider, Box } from "native-base";
import { getAllPaths } from '../supabaseClient';

const Selection = ({navigation}) => {
    const [paths, setPaths] = React.useState();

    const loadAllPaths = async () => {
        const { paths, error } = await getAllPaths();
        setPaths(paths);
    }

    React.useEffect(() => {
        loadAllPaths();
    }, [])

    const renderPaths = () => {
        if(paths === undefined) return false;
        return (
            paths.map((path) => {
                <Text> { path.name }</Text>
            })
        )
    }

    return (
        <Box style={{marginTop:40}}>
            <Box>
                {paths && paths.map((path) => 
                <Pressable key={path.id} onPress={() => navigation.navigate('Location', {path: path})} style={styles.pathElementPressable}>
                    <Text style={styles.pathElementText}>{path.name}</Text>
                </Pressable>)}
            </Box>

        </Box>
    )
}

const styles = StyleSheet.create({
    pathElementPressable: {
      padding: 50,
      textAlign: "center",
      textAlignVertical: "center",
      backgroundColor: "#121212",
      margin: 2,
      color: "white"
    },
    pathElementText: {
        color: "white",
    },
    bigBlue: {
      color: 'blue',
      fontWeight: 'bold',
      fontSize: 30,
    },
    red: {
      color: 'red',
    },
  });

export { Selection }
