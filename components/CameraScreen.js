import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Animated } from 'react-native'
import { Camera } from "expo-camera";
import { BackHandler } from "react-native"
import * as MediaLibrary from "expo-media-library";
import Settings from './Settings';
export default class CameraScreen extends Component {
    constructor(props) {
        super(props)
        this.props = props

        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
            settingsFlag: false,
            pos: new Animated.Value(500)
        };

        console.log(this.props.route.params)
        this.toggle()
    }

    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });

        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.settingsFlag != this.state.settingsFlag && !this.state.settingsFlag) {
            this.toggle()
        }
    }
    handleBackPress = () => {

        //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
        //...
        //powrót do ekranu poprzedniego

        if (this.state.settingsFlag) {
            console.log(this.state.settingsFlag)
            this.setState({ settingsFlag: false })
            return true
        } else {
            this.props.navigation.goBack()
            return true;
        }
    }

    async useCam() {
        if (this.camera) {
            let photo = await this.camera.takePictureAsync()
            await MediaLibrary.createAssetAsync(photo.uri)
            alert('Photo has been taken')
            this.props.route.params()
        }
    }
    toggle() {
        let toPos
        if (this.isHidden) toPos = 0; else toPos = 500
        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();
        this.isHidden = !this.isHidden;
        this.setState(
            { settingsFlag: !this.isHidden }
        )
    }
    render() {
        const hasCameraPermission = this.state.hasCameraPermission; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                        }}
                        style={{ flex: 1 }}
                        type={this.state.type}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end' }}>
                            {/* tutaj wstaw buttony do obsługi kamery, które widać na filmie*/}
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        type: this.state.type === Camera.Constants.Type.back
                                            ? Camera.Constants.Type.front
                                            : Camera.Constants.Type.back,
                                    });
                                }}
                                style={styles.roundButtonArrow}>
                                <Text style={{ fontSize: 50, marginTop: -25, marginLeft: -5 }}>↶</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={this.useCam.bind(this)}
                                style={styles.roundButtonShot}>
                                <Text style={{ fontSize: 70, marginTop: -14 }}>✚</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => { this.toggle() }}
                                style={styles.roundButtonArrow}>
                                <Text style={{ fontSize: 45, marginTop: -12, marginLeft: -1 }}>⚙</Text>
                            </TouchableOpacity>
                        </View>


                    </Camera >

                    <Settings pos={this.state.pos} />

                </View >
            );
        }
    }

}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    roundButtonArrow: {
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#7289da',
    },
    roundButtonShot: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
        borderRadius: 100,
        backgroundColor: '#7289da',
    },
});