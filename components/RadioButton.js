import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity } from 'react-native'

export default class RadioButton extends Component {
    constructor(props) {
        super(props)

        this.styles = StyleSheet.create({
            main: {
                flexDirection: 'row'
            },
            roundBack: {
                width: 40,
                height: 40,
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
            },
            buttonContainer: {
                width: 50,
                height: 50,
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                alignContent: 'center'
            }

        })
    }
    onTouch() {
        this.props.func(this.props.text)
    }
    render() {
        return (
            <View style={this.styles.main}>
                <View style={this.styles.buttonContainer}>
                    <TouchableOpacity onPress={this.onTouch.bind(this)}>
                        <View style={this.styles.roundBack}><View style={this.styles.round}></View></View>
                    </TouchableOpacity>
                </View>
                <View style={this.styles.textContainer}>

                    <Text style={this.styles.text}>{(this.props.label === undefined ? '' : this.props.label + ': ') + this.props.text}</Text>
                </View>
            </View>
        )
    }
}


