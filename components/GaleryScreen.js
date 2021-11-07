import React, { Component } from 'react'
import { Text, StyleSheet, View, Button, FlatList } from 'react-native'
import { Dimensions } from "react-native";
import * as MediaLibrary from "expo-media-library";
import Item from './Item';
export default class GaleryScreen extends Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = {
            images: [],
            columns: 5
        }

        this.style = StyleSheet.create({
            buttonContainer: {
                flexDirection: 'row',
                justifyContent: 'space-evenly'
            }
        })
    }

    async componentDidMount() {
        const { status } = await MediaLibrary.requestPermissionsAsync()

        if (status !== 'granted') {
            alert('Permission error')
        } else {
            await this.setAllPhotos()
        }
    }

    async setAllPhotos() {
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,
            mediaType: 'photo'
        })

        obj = obj.assets.map(el => {
            return {
                width: Dimensions.get('window').width / this.state.columns - 16,
                height: this.state.columns === 1
                    ? Dimensions.get('window').height / 8
                    : Dimensions.get('window').width / this.state.columns - 16,
                uri: el.uri,
                id: el.id
            }
        })

        this.setState({
            images: obj
        })
    }

    render() {
        return (
            <View>
                <View style={this.style.buttonContainer}>
                    <Button
                        onPress={() => {
                            this.setState({
                                columns: this.state.columns === 1 ? 5 : 1
                            }, () => this.setState({
                                images: this.state.images.map(el => {
                                    return {
                                        width: Dimensions.get('window').width / this.state.columns - 16,
                                        height: this.state.columns === 1
                                            ? Dimensions.get('window').height / 8
                                            : Dimensions.get('window').width / this.state.columns - 16,
                                        uri: el.uri,
                                        id: el.id
                                    }
                                })
                            }))
                        }}
                        title='Grid/List'
                        color='#FFC107'
                    />
                    <Button
                        onPress={() => this.props.navigation.navigate('camera')}
                        title='open camera'
                        color='#FFC107'
                    />
                    <Button
                        onPress={() => alert(this.state.columns)}
                        title='Remove selected'
                        color='#FFC107'
                    />
                </View>
                <View style={{}}>
                    <FlatList
                        key={1}
                        data={this.state.images}
                        renderItem={({ item }) => <Item data={item} columns={this.state.columns} />}
                        keyExtractor={item => item.id}
                        numColumns={1}
                    />
                </View>
            </View>
        )
    }
}
