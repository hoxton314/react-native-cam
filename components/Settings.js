import React, { Component } from 'react'
import { Text, StyleSheet, View, Animated, Button, ScrollView, Dimensions } from 'react-native'
import RadioGroup from './RadioGroup'
export default class Settings extends Component {
    constructor(props) {
        super(props)
        //console.log(this.props.data)
        this.state = {
            data: this.props.data
        }
    }
    componentDidMount() {
        // this.setState({ refreshing: true });

        // setTimeout(() => { this.setState({ refreshing: true }); }, 1000)
    }
    componentDidUpdate(prevProps) {
        //this.props.changeSet({ wb: 3 })
        if (prevProps.data != this.props.data) {
            this.setState({ data: this.props.data });
            console.log(this.props.data)
        }
        if (prevProps.toggled != this.props.toggled) {
            console.log(this.state.data)
        }
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
                <ScrollView >
                    <RadioGroup
                        change={this.props.changeSet}
                        //data={['2:1', '3:2', '4:3', '11:9', '16:9']}
                        data={this.state.data.ratio}
                        setting='ratio'
                        groupName="Ratio" />
                    <RadioGroup
                        change={this.props.changeSet}
                        //labels={['auto', 'cloudy', 'sunny', 'shadow', 'fluorescent', 'incandescent']}
                        //data={[0, 1, 2, 3, 4, 5]}
                        labels={this.state.data.wbLabels}
                        data={this.state.data.wb}
                        setting='wb'
                        groupName="White Balance" />
                    <RadioGroup
                        change={this.props.changeSet}
                        data={this.state.data.ps}
                        setting='ps'
                        groupName="Picture Size" />
                    <RadioGroup
                        change={this.props.changeSet}
                        labels={this.state.data.fmLabels}
                        data={this.state.data.fm}
                        setting='fm'
                        groupName="Flash Mode" />
                </ScrollView>
            </Animated.View >
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
        height: Dimensions.get('window').height / 1.4,
        width: Dimensions.get('window').width / 1.6
    },
    back: {
        position: 'absolute',
        right: 0,
        top: 0,
    }
})
