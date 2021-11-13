import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class Line extends Component {
    render() {
        return (
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                }}
            />
        )
    }
}

const styles = StyleSheet.create({})
