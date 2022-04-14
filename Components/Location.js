import * as React from 'react';
import { Node } from 'react';

import { Text, Switch, Button, View, StyleSheet, TouchableOpacity } from 'react-native';
import BackgroundGeolocation from "react-native-background-geolocation";

import useStore from '../store';

import { getAllLocations, getAllFences } from '../supabaseClient';
import { AudioPlayer } from './AudioPlayer';
import { NativeBaseProvider, Box } from "native-base";
import { Map } from './Map';

import Entypo from 'react-native-vector-icons/Entypo';

const LocationManager = ({route, navigation}) => {
	const locations = useStore(state => state.locations);
	const setLocations = useStore(state => state.setLocations);
	const path = useStore(state => state.path);
	const setPath = useStore(state => state.setPath);
	const locationHistory = useStore(state => state.locationHistory);
	const addToLocationHistory = useStore(state => state.addToLocationHistory);
	
	const [enabled, setEnabled] = React.useState(false);
	const [location, setLocation] = React.useState();
    const [locationsId, setLocationsId] = React.useState({});
	const [fences, setFences] = React.useState([]);
	const [lastFence, setLastFence] = React.useState();

	const loadAllLocations = async () => {
		const {locations, error} = await getAllLocations();
        setLocations([...locations]);

        let temp_locations = {};
        locations.forEach((i, index) => temp_locations[i.id] = index);
        setLocationsId(temp_locations);

		loadAllFences();
	}

	const loadAllFences = async () => {
		const {fences, error} = await getAllFences();
		fences.map((fence) => fence['identifier']=fence.location+'-'+fence.id);
		setFences(fences);
		BackgroundGeolocation.addGeofences(fences)
		.then((success)=> console.log("SUCCESS"))
		.catch((error)=>console.log(error))
	}

	React.useEffect(() => {	
		if('path' in route.params) setPath(route.params.path);
		loadAllLocations();

		/// 1.  Subscribe to events.
		const onLocation:Subscription = BackgroundGeolocation.onLocation((location) => {
		  setLocation(location);
		})
	
		const onMotionChange:Subscription = BackgroundGeolocation.onMotionChange((event) => {
		  console.log('[onMotionChange]', event);
		});
	
		const onActivityChange:Subscription = BackgroundGeolocation.onActivityChange((event) => {
		  console.log('[onMotionChange]', event);
		})
	
		const onProviderChange:Subscription = BackgroundGeolocation.onProviderChange((event) => {
		  console.log('[onProviderChange]', event);
		})
	
		/// 2. ready the plugin.
		BackgroundGeolocation.ready({
		  locationAuthorizationRequest: 'Always',
		  // Geolocation Config
		  desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
		  distanceFilter: 10,
		  // Activity Recognition
		  stopTimeout: 5,
		  // Application config
		  debug: true, // <-- enable this hear sounds for background-geolocation life-cycle.
		  logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
		  stopOnTerminate: false,   // <-- Allow the background-service to continue tracking when user closes the app.
		  startOnBoot: true,        // <-- Auto start tracking when device is powered-up.
		  // HTTP / SQLite config
		  url: 'http://yourserver.com/locations',
		  batchSync: false,       // <-- [Default: false] Set true to sync locations to server in a single HTTP request.
		  autoSync: true,         // <-- [Default: true] Set true to sync each location to server as it arrives.
		  headers: {              // <-- Optional HTTP headers
			"X-FOO": "bar"
		  },
		  params: {               // <-- Optional HTTP params
			"auth_token": "maybe_your_server_authenticates_via_token_YES?"
		  }
		}).then((state) => {
		  setEnabled(state.enabled)
		  console.log("- BackgroundGeolocation is configured and ready: ", state.enabled);
		  setEnabled(true);
		  onClickStartTracking();
		});

		return () => {
		  onLocation.remove();
		  onMotionChange.remove();
		  onActivityChange.remove();
		  onProviderChange.remove();
		}
	  }, []);
	
	  React.useEffect(() => {
		if (enabled) {
		  BackgroundGeolocation.start();
		} else {
			BackgroundGeolocation.removeGeofences().then((success) => {
				console.log("[removeGeofences] all geofences have been destroyed");
			  })
		  	BackgroundGeolocation.stop();
		  	setLocation('');
		}
	  }, [enabled]);

	const Item = ({name}) => (
		<Text>{name}</Text>
	)

	const Fence = ({identifier}) => (
		<Text>{identifier}</Text>
	)

	BackgroundGeolocation.onGeofence(geofence => {
		console.log("[geofence] ", geofence.identifier, geofence.action);
		setLastFence(geofence.identifier.split('-')[0]);
		if(!locationHistory.some(item => locations[locationsId[geofence.identifier.split('-')[0]]].name === item.name)) addToLocationHistory(locations[locationsId[geofence.identifier.split('-')[0]]]);
	});

	function upgradeToAlwaysAllow() {
		console.log("Location always");
		// Simply update `locationAuthorizationRequest` to "Always" -- the SDK
		// will cause iOS to immediately show the authorization upgrade dialog
		// for "Change to Always Allow":
		BackgroundGeolocation.setConfig({
		  locationAuthorizationRequest: 'Always'
		});
	}
	
	const onClickStartTracking = async () => {
		analytics.track('Start Tracking');
		  
		// Initial location authorization dialog for "When in Use" authotization
		// will be shown here.
		await BackgroundGeolocation.start();
		// some time later -- could be immediately after, hours later, days later, etc.,
		// you can upgrade the config to 'Always' whenever you wish:
		upgradeToAlwaysAllow();
	}

    const getName = (fence) => {
        if(locations[locationsId[fence]]) return locations[locationsId[fence]]['name'];
    }

    return (
        <Box flex="1">
			<View style={[styles.header, styles.front]}>
				<Switch value={enabled} onValueChange={setEnabled}/>
				<TouchableOpacity style={styles.header.icon} onPress={() => navigation.navigate('DataList')}>
					<Entypo name="list" size={30} color="#000000"/>
				</TouchableOpacity>
			</View>
			<Box style={styles.front}>
				<Text style={{borderRadius: 40, margin: 5, backgroundColor:"lightblue", padding: 10}}>Last location: { getName(lastFence) }</Text>
				{ path && <Text style={{borderRadius: 40, margin: 5, backgroundColor:"orange", padding: 10}}> {path.name}</Text> }
			</Box>
			<Box style={{flexDirection:'row-reverse', zIndex: 2, elevation: 2, bottom: 60, marginTop: "auto"}}>
				<Button color="#f194ff" title="Selection" onPress={() => navigation.navigate('Selection')}/>
			</Box>
			{location && <Map location={location} locations={locations} fences={fences} locationsId={locationsId}/> }
			<Box style={styles.front}>
				<AudioPlayer></AudioPlayer>
			</Box>
        </Box>
    )
}


const styles = StyleSheet.create({
    detail: {
        flex: 1,
        justifyContent: 'flex-start',
        marginLeft: 25,
        marginRight: 25,
    },
	front: {
		zIndex: 2, 
		elevation: 2, 
	},
    header: {
		alignItems:'center', 
		paddingTop: 50,
        marginLeft: 12,
        marginRight: 10,
        flexDirection: 'row',
        marginBottom: 15,
        icon: {
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

export {LocationManager};