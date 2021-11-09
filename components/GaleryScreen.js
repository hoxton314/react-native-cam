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
            columns: 5,
            selected: []
        }

        this.style = StyleSheet.create({
            buttons: {
                overflow: "hidden",
                borderRadius: 100,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'stretch',
                alignSelf: 'stretch'
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
            first: 1000,
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

    selectImage(id) {
        this.setState({
            selected: this.state.selected.concat(id)
        })
    }

    unselectImage(id) {
        this.setState({
            selected: this.state.selected.filter(el => el !== id)
        })
    }

    async removeSelected() {
        if (this.state.selected.length === 0) alert('Please select some images first!')
        else {
            await MediaLibrary.deleteAssetsAsync(this.state.selected)
            await this.setAllPhotos()
        }
    }


    render() {
        return (
            <View>
                <View style={this.style.buttons}>
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
                        color='#7289da'
                    />
                    <Button
                        onPress={() => this.props.navigation.navigate('camera', this.setAllPhotos.bind(this))}
                        title='open camera'
                        color='#7289da'
                    />
                    <Button
                        onPress={async () => await this.removeSelected()}
                        title='Remove selected'
                        color='#7289da'
                    />
                </View>
                {this.state.columns === 1
                    ? <FlatList
                        key={1}
                        data={this.state.images}
                        renderItem={({ item }) => {
                            return <Item
                                data={item}
                                navigation={this.props.navigation}
                                refresh={this.setAllPhotos.bind(this)}
                                select={this.selectImage.bind(this)}
                                unselect={this.unselectImage.bind(this)}
                                selected={this.state.selected.some(el => el == item.id)}
                            />
                        }
                        }
                        keyExtractor={item => item.id}
                        numColumns={1}
                    />
                    : <FlatList
                        columnWrapperStyle={{ justifyContent: 'space-evenly' }}
                        key={5}
                        data={this.state.images}
                        renderItem={({ item }) => {
                            return <Item
                                columns={this.state.columns}
                                data={item}
                                navigation={this.props.navigation}
                                refresh={this.setAllPhotos.bind(this)}
                                select={this.selectImage.bind(this)}
                                unselect={this.unselectImage.bind(this)}
                                selected={this.state.selected.some(el => el == item.id)}
                            />
                        }
                        }
                        keyExtractor={item => item.id}
                        numColumns={5}
                    />
                }
            </View>
        )
    }
}
