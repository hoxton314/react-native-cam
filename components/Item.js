import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'

export default class Item extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        console.log(this.props.data.uri)
    }

    render() {
        return (
            <View style={{ alignItems: 'center', width: '100%' }}>
                <Image
                    style={{
                        width: this.props.data.width,
                        height: this.props.data.height
                    }}
                    source={{ uri: this.props.data.uri }}
                />

                <Text>{Dimensions.get('window').width / this.props.columns}</Text>
            </View>
        )
    }
}