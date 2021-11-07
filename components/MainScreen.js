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
                <Text>show gallery pictures</Text>
                <Text>take pictures</Text>
                <Text>save photo to device</Text>
                <Text>delete photo from device</Text>
                <Text>share photo</Text>
            </View>
        )
    }
}

const styles = {
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        //flexDirection: 'column',
        //marginTop: 20
    }
}

