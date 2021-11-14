import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Animated, Dimensions } from 'react-native'
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
            notFirstLoad: true,
            pos: new Animated.Value(Dimensions.get('window').height / 1.4),
            ratio: '16:9',
            ps: '1920x1080',
            wb: 1,
            fm: 3,
            camData: { wb: [0], wbLabels: ['auto'], fm: [0], fmLabels: ['auto'], ratio: ['16:9'], ps: ['1920x1080'] }
        };


    }
    changeCameraSetting(settingObj) {
        this.setState(settingObj)

    }
    async componentDidMount() {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
        this.toggle()



    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevState.settingsFlag != this.state.settingsFlag && !this.state.settingsFlag) {
            this.toggle()
        }
        if (this.state.settingsFlag && this.state.notFirstLoad) {
            let fm = Camera.Constants.FlashMode
            let arrFM = []
            let arrFMLabels = []
            for (let mode in fm) {
                arrFM.push(fm[mode])
                arrFMLabels.push(mode)
            }
            let wb = Camera.Constants.WhiteBalance

            let arrWB = []
            let arrWBLabels = []
            for (let mode in wb) {
                arrWB.push(wb[mode])
                arrWBLabels.push(mode)
            }

            this.setState({
                notFirstLoad: false,
                camData: {
                    fm: arrFM,
                    fmLabels: arrFMLabels,
                    wb: arrWB,
                    wbLabels: arrWBLabels,
                    ratio: ['16:9', '11:9', '4:3', '3:2', '2:1'],
                    ps: await this.camera.getAvailablePictureSizesAsync(this.state.ratio)
                }
            })


        }
    }
    handleBackPress = () => {
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
        if (this.isHidden) toPos = 0; else toPos = Dimensions.get('window').height / 1.4
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
                        onCameraReady={() => console.log("camera ready")}
                        ratio={this.state.ratio}
                        whiteBalance={this.state.wb}
                        pictureSize={this.state.ps}
                        flashMode={this.state.fm}


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
                                onPress={() => { this.state.settingsFlag ? this.setState({ settingsFlag: false }) : this.toggle() }}
                                style={styles.roundButtonArrow}>
                                <Text style={{ fontSize: 45, marginTop: -12, marginLeft: -1 }}>⚙</Text>
                            </TouchableOpacity>
                        </View>


                    </Camera >

                    <Settings toggled={this.state.settingsFlag} pos={this.state.pos} toggle={() => { this.setState({ settingsFlag: false }) }} changeSet={this.changeCameraSetting.bind(this)} data={this.state.camData} />

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