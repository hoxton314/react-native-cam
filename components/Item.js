import React from 'react'
import {
    TouchableOpacity,
    Image,
    Text,
    View
} from 'react-native'

export default class Item extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        console.log(this.props.data.width)
    }

    render() {
        if (this.props.selected) {
            return (
                <View
                    style={{
                        alignItems: 'center',
                        borderRadius: this.props.columns == 5 ? 10 : 50,
                        overflow: "hidden",
                        backgroundColor: '#9b111e'
                    }}
                >
                    <Image
                        style={{
                            width: this.props.columns == 5 ? this.props.data.width : this.props.data.width * 1.05,
                            height: this.props.data.height,
                        }}
                        source={{ uri: this.props.data.uri }}
                    />
                    <TouchableOpacity
                        style={{
                            position: 'absolute',
                            backgroundColor: 'rgba(50, 50, 50, 0.6)',
                            width: this.props.columns == 5 ? this.props.data.width : this.props.data.width * 1.05,
                            height: this.props.data.height,
                        }}
                        onLongPress={() => this.props.unselect(this.props.data.id)}
                    >
                        <Text style={{
                            fontSize: this.props.columns == 5 ? (this.props.data.height > this.props.data.width ? this.props.data.height : this.props.data.width) : (this.props.data.height > this.props.data.width ? this.props.data.height / 4 : this.props.data.width / 4),
                            fontWeight: 'bold',
                            textAlign: 'center',
                            marginTop: this.props.columns == 5 ? (this.props.data.height > this.props.data.width ? -this.props.data.height / 4 : -this.props.data.width / 4) : (this.props.data.height > this.props.data.width ? -this.props.data.height / 16 : -this.props.data.width / 16),
                            color: '#9b111e',
                        }}>✔</Text>
                    </TouchableOpacity>
                    <Text style={{ color: 'white' }}>{this.props.data.id.slice(0, 5)}</Text>
                </View>
            )
        } else {
            return (
                <TouchableOpacity
                    style={{
                        borderRadius: this.props.columns == 5 ? 10 : 50,
                        overflow: "hidden",
                        alignItems: 'center',
                        backgroundColor: '#7289da'
                    }}
                    onPress={() => this.props.navigation.navigate('details',
                        { data: this.props.data, refresh: this.props.refresh },
                    )}
                    onLongPress={() => this.props.select(this.props.data.id)}
                >
                    <Image
                        style={{
                            width: this.props.columns == 5 ? this.props.data.width : this.props.data.width * 1.05,
                            height: this.props.data.height
                        }}
                        source={{ uri: this.props.data.uri }}
                    />
                    <Text>{this.props.data.id.slice(0, 5)}</Text>
                </TouchableOpacity>
            )
        }
    }
}