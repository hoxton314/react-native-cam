import React, { Component } from 'react'
import { Text, StyleSheet, View, Image, Button, Dimensions } from 'react-native'
import * as MediaLibrary from 'expo-media-library'
import * as Sharing from 'expo-sharing'
import MyButton from './MyButton'
export default class DetailsScreen extends Component {
    constructor(props) {
        super(props)
        this.props = props
    }
    render() {
        return (
            <View style={{
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                width: '100%',
                height: '100%'
            }}>
                <Image
                    style={{
                        width: Dimensions.get('window').width - 32,
                        height: Dimensions.get('window').height - 128,
                    }}
                    source={{ uri: this.props.route.params.data.uri }}
                />
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                    width: '100%'
                }}>
                    <MyButton
                        fontsize={25}
                        text='Share'
                        styles={{ width: 130, marginLeft: 15, height: 75 }}
                        func={async () => {
                            const status = await Sharing.isAvailableAsync()

                            if (status) {
                                Sharing.shareAsync(this.props.route.params.data.uri)
                            }
                        }}
                    />
                    <MyButton
                        fontsize={25}
                        text='Delete'
                        styles={{ width: 130, marginLeft: 15, height: 75, }}
                        func={async () => {
                            await MediaLibrary.deleteAssetsAsync([this.props.route.params.data.id])
                            await this.props.route.params.refresh()
                            this.props.navigation.goBack()
                        }}
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({})
