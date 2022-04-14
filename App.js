/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as React from 'react';import { Node } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createClient } from '@segment/analytics-react-native';

import { NativeBaseProvider, Box } from "native-base";

import { LocationManager } from './Components/Location';
import { Selection } from './Components/Selection';

import 'react-native-url-polyfill/auto';
import { LiveHeader } from './Components/LiveHeader';
import { Detail } from './Components/Detail';

import useStore from './store';
import {DataList} from './Components/DataList';


const Stack = createNativeStackNavigator();

const App: () => Node = () => {
	const segmentClient = createClient({
		writeKey: "LkDyiYeog1R0KRJF1TeZGzpEDWnHHrPI",
		trackAppLifecycleEvents: true,
		//additional config options
	});

	return (
		<NativeBaseProvider>
			<NavigationContainer>
				<Stack.Navigator screenOptions={{headerShown: false}}>
					<Stack.Screen name="Selection" component={Selection}/>
					<Stack.Screen name="Location" component={LocationManager}/>
					<Stack.Screen name="Detail" component={Detail}/>
					<Stack.Screen name="DataList" component={DataList}/>
				</Stack.Navigator>
			</NavigationContainer>
		</NativeBaseProvider>
	);
};


const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});

export default App;
