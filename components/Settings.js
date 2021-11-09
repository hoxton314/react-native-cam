import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated } from 'react-native'
import RadioGroup from './RadioGroup'
export default class Settings extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (

            <Animated.View
                style={[
                    styles.animatedView,
                    {
                        transform: [
                            { translateY: this.props.pos }
                        ]
                    }]} >
                <Text>--------------------------------</Text>
                <RadioGroup
                    change={this.change}
                    data={[1, 2, 3, 4]}
                    groupName="RADIOGROUP TITLE" />
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#99aab5',
        height: 500,
    }
})
