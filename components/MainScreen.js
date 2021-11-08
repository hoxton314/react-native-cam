import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, KeyboardAvoidingView, Alert } from 'react-native';
import MyButton from './MyButton'

export default class MainScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: '',
        }
    }


    render() {
        return (
            <View style={styles.main}>
                <MyButton
                    fontsize={50}
                    text="Camera App"
                    func={() => { this.props.navigation.navigate("galerylist") }}
                    styles={{ width: 300, marginLeft: 15, height: 100 }}
                />
                <Text style={styles.text}>show gallery pictures</Text>
                <Text style={styles.text}>take pictures</Text>
                <Text style={styles.text}>save photo to device</Text>
                <Text style={styles.text}>delete photo from device</Text>
                <Text style={styles.text}>share photo</Text>
            </View>
        )
    }
}

const styles = {
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3f5ca8'
        //flexDirection: 'column',
        //marginTop: 20
    },
    text: {
        color: 'white',
        fontSize: 22
    }
}

