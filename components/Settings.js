import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Button } from 'react-native'
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
                <Button onPress={this.props.toggle} title='▼' color='#7289da' style={styles.back} />
                <RadioGroup
                    change={this.change}
                    data={[1, 2, 3, 4]}
                    groupName="Ratio" />
                <RadioGroup
                    change={this.change}
                    data={[1, 2, 3, 4]}
                    groupName="White Balance" />
                <RadioGroup
                    change={this.change}
                    data={[1, 2, 3, 4]}
                    groupName="Picture Size" />
                <RadioGroup
                    change={this.change}
                    data={[1, 2, 3, 4]}
                    groupName="Flash Mode" />
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
        backgroundColor: 'rgba(44, 47, 51,0.5)',
        height: 500,
    },
    back: {
        position: 'absolute',
        right: 0,
        top: 0,
    }
})
