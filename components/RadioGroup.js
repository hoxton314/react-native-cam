import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RadioButton from './RadioButton'
import Line from './Line'
export default class RadioGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            selected: this.props.data[0]
        }
        console.log(this.state.data)
    }
    radioButtonCall(data) {
        console.log(data)
        this.setState({ selected: data })
    }
    render() {
        return (
            <View>
                <Line />
                <View style={styles.header}><Text style={styles.headerText}>{this.props.groupName}</Text></View>
                <Line />
                {this.state.data.map((input) => { return (<RadioButton key={Math.random() * 10} text={input} selected={input == this.state.selected} func={this.radioButtonCall.bind(this)} />) })}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    headerText: {
        color: 'white'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)'
    }

})
