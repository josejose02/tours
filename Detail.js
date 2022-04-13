import * as React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Text, View, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { Box } from "native-base";
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';


const Detail = ({ route, navigation }) => {
    const [showPlayerOptions, setShowPlayerOptions] = React.useState(false);
    const [playOptions, setPlayOptions] = React.useState();
    return (
        <SafeAreaView style={styles.detail}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.navigate('Map')}>
                    <Entypo name="map" size={30} color="#000000"/>
                </TouchableOpacity>
                <Text style={styles.header.text}>Text</Text>
                <TouchableOpacity>
                    <Entypo name="dots-three-vertical" size={25} color="#000000"/>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.visual}>
                    <Image style={styles.visual.image} source={{uri: 'https://fotografias.lasexta.com/clipping/cmsimages01/2021/11/22/80443BD5-CFE6-4395-8585-D36F147B3053/98.jpg?crop=800,450,x0,y42&width=1900&height=1069&optimize=high&format=webply'}}/>            
                </View>
                <View style={styles.content}>
                    <Text style={styles.content.title}>
                        Plaza de Sol
                    </Text>
                    <Text style={styles.content.subtitle}>
                        thing
                    </Text>
                    <Text style={styles.content.description}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer mi est, tempus tempus vehicula ac, placerat sed dui. Curabitur tempor erat eget vehicula tempor. Donec ornare sodales vehicula. Cras varius tincidunt accumsan. Etiam consequat dictum sapien in malesuada. Morbi semper a odio at sollicitudin. Maecenas pellentesque tristique mollis. Aenean finibus sollicitudin massa, eget volutpat dolor tincidunt sit amet. Nulla facilisis dapibus libero, in commodo ipsum. Ut posuere nec velit in congue. 
                    </Text>
                </View>
            </ScrollView>
            {showPlayerOptions && <Text>Hello</Text>}

            <TouchableOpacity style={[styles.action, styles.action.audio]} onPress={() => setShowPlayerOptions(!showPlayerOptions)}>
                <View style={styles.action.flexible}>
                    <Text style={styles.action.text}>Play Audio</Text>
                    <Entypo name="controller-play" size={25} color="#ffffff"/>
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    detail: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginRight: 25,
    },
    header: {
        marginTop: 10,
        marginLeft: 12,
        marginRight: 10,
        flexDirection: 'row',
        marginBottom: 15,
        text: {
            fontSize: 20,
            marginRight: 'auto',
            marginLeft: 'auto'
        }
    },
    visual: {
        marginTop: 10,
        backgroundColor: 'blue',
        image: {
            width: 340,
            height: 340
        }
    },
    content: {
        title: {
            fontSize: 32,
            marginTop: 10,
        },
        subtitle: {
            fontSize: 22,
            color: '#575757',
        },
        description: {
            marginTop: 10,
        },
        color: 'blue',
        fontWeight: 'bold',
        fontSize: 30,
    },
    action: {
        backgroundColor: 'black',
        justifyContent: 'center',
        borderBottomWidth: 7,
        height: 70,
        flexible: {
            flexDirection: 'row',
            alignContent: 'space-around',
            marginRight: 30
        },
        text: {
            marginLeft: 30,
            color: 'white',
            fontSize: 22,
            fontWeight: '600',
            marginRight: 'auto'
        },
        ticket: {
            borderBottomColor: 'orange',
        },
        audio: {
            borderBottomColor: 'lightblue',
        }
    },
  });

export { Detail }