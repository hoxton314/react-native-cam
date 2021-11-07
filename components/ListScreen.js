import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import * as Location from "expo-location";
import { StyleSheet, View, Text, FlatList, Switch, AsyncStorage } from 'react-native';
import Item from './Item';
import MyButton from './MyButton'

export default class ListScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            flatlist: [],
            userlistFlag: '',
            mainSwitch: false,
            locationList: []
        }
    }
    async componentDidMount() {
        this.setPermissions()
        this.setState({
            flatlist: await this.getAllData()
        })
    }
    async componentDidUpdate(prevProps, prevState) {
        if (prevState.locationList !== this.state.locationList) {
            //console.log(this.state.locationList)
        }

    }
    handleCallback = (data, state) => {
        let list
        if (state) {
            list = this.state.locationList
            list.push(data)
        } else {
            list = this.state.locationList.filter(a => a.key != data.key)
        }
        this.setState({ locationList: list })
    }
    setPermissions = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }
    getPos = async () => {
        let pos = await Location.getCurrentPositionAsync({})
        let data = JSON.stringify(pos, null, 4)
        alert(data)

        this.insertData(pos)
    }
    toggleSwitch = () => {
        this.setState({ mainSwitch: !this.state.mainSwitch })
    }

    insertData = async (data) => {
        console.log('=data=', data)
        await AsyncStorage.setItem(String(data.timestamp) + Math.round(Math.random() * 10000), JSON.stringify(data, null, 4));

        //this.getAllData()
        this.setState({
            flatlist: await this.getAllData()
        })
    }

    getSpecificData = async () => {
        let val = await AsyncStorage.getItem('key1');
        console.log(val);
    }
    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys()
        let stores = await AsyncStorage.multiGet(keys)

        let posList = stores.map((result, i, store) => {
            return { key: store[i][0], value: JSON.parse(store[i][1]), selected: false, list: this.state.locationList }
        })
        console.log(posList)
        return posList
    }

    delData = async () => {
        await AsyncStorage.multiRemove(
            await AsyncStorage.getAllKeys()
        )

        this.setState({
            flatlist: []
        })

    }
    showMap() {
        let dane = this.state.locationList
        console.log('=============================================================',dane)
        if(dane[0]!=undefined){
            this.props.navigation.navigate("map", { mapData: dane })
        }else{
            alert("Wybierz przynajmniej 1 lokalizacje")
        }
        
    }
    render() {


        const renderItem = ({ item }) => (<Item key={item.key} data={item} callback={this.handleCallback.bind(this)} mainSwitch={this.state.mainSwitch}/>);
        return (
            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <MyButton
                        styles={{ height: 60 }}
                        fontsize={15}
                        text="Pobierz i zapisz pozycje"
                        func={this.getPos}
                    />
                    <MyButton
                        styles={{}}
                        fontsize={15}
                        text="Usuń wszystkie dane"
                        func={this.delData}
                    />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View style={{ flex: 1 }}>
                    </View>
                    <View style={{ flex: 6 }}>
                        <MyButton
                            styles={{}}
                            fontsize={20}
                            text="Przejdź do mapy"
                            func={this.showMap.bind(this)}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <Switch
                            style={{ justifyContent: 'flex-end' }}
                            trackColor={{ false: "#767577", true: "#7289da" }}
                            thumbColor={this.state.mainSwitch ? "#3f5ca8" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={this.toggleSwitch}
                            value={this.state.mainSwitch}
                        />
                    </View>
                </View>
                <View>
                    <FlatList
                        data={this.state.flatlist}
                        renderItem={renderItem}
                    //keyExtractor={item => item.id.toString()}
                    />
                </View></View>
        )
    }
}
