import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MainScreen from "./components/MainScreen"
import GaleryScreen from './components/GaleryScreen';
import CameraScreen from './components/CameraScreen';
import DetailsScreen from './components/DetailsScreen';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: '',
    }
  }

  render() {
    const Stack = createNativeStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="main" component={MainScreen} options={screenOpt.main} />
          <Stack.Screen name="galerylist" component={GaleryScreen} options={screenOpt.galerylist} />
          <Stack.Screen name="camera" component={CameraScreen} options={screenOpt.camera} initialParams={{ camera: 'test' }} />
          <Stack.Screen name="details" component={DetailsScreen} options={screenOpt.details} initialParams={{ photo: 'test' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

const screenOpt = {
  galerylist: {
    title: 'Zapisane zdjęcia w telefonie',
    headerStyle: {
      backgroundColor: '#3f5ca8',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    //headerShown: false
  },
  camera: {
    title: 'Kamera',
    headerStyle: {
      backgroundColor: '#3f5ca8',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: true
  },
  details: {
    title: 'Wybrane zdjęcie',
    headerStyle: {
      backgroundColor: '#3f5ca8',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: true
  },
  main: {
    title: 'Register Node App',
    headerStyle: {
      backgroundColor: '#3f5ca8',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    headerShown: false
  },
}
