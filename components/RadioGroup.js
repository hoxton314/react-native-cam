import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RadioButton from './RadioButton'

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
                <Text>{this.props.groupName}</Text>
                {this.state.data.map((input) => { return (<RadioButton key={Math.random() * 10} text={input} selected={input == this.state.selected} func={this.radioButtonCall.bind(this)} />) })}
            </View>
        )
    }
}

const styles = StyleSheet.create({})
