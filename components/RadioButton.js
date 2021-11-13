import React, { Component } from 'react'
import { Text, StyleSheet, View, Touchable, TouchableOpacity } from 'react-native'

export default class RadioButton extends Component {
    constructor(props) {
        super(props)

        this.styles = StyleSheet.create({
            main: {
                flexDirection: 'row'
            },
            roundBack: {
                width: 50,
                height: 50,
                backgroundColor: '#3f5ca8',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 100,
            },
            round: {
                width: 30,
                height: 30,
                backgroundColor: '#7289da',
                borderRadius: 100,
                display: this.props.selected ? 'flex' : 'none'
            },
            text: {
                color: 'white'
            },
            textContainer: {
                justifyContent: 'center',
                marginLeft: 10
            }
        })
    }
    onTouch() {
        this.props.func(this.props.text)
    }
    render() {
        const data = this.props.text
        return (
            <View style={this.styles.main}>
                <TouchableOpacity onPress={this.onTouch.bind(this)}>
                    <View style={this.styles.roundBack}><View style={this.styles.round}></View></View>
                </TouchableOpacity>
                <View style={this.styles.textContainer}><Text style={this.styles.text}>{this.props.text}</Text></View>
            </View>
        )
    }
}


