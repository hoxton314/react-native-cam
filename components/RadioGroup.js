import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'
import RadioButton from './RadioButton'
import Line from './Line'
export default class RadioGroup extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.data,
            selected: this.props.default,
        }
        //console.log(this.state.data)
    }
    radioButtonCall(data) {
        //console.log(data)
        this.setState({ selected: data })
        let returnObj = {};
        returnObj[this.props.setting] = data;
        console.log("=======CHANGE CALL=========");
        console.log(returnObj);
        this.props.change(returnObj)
    }
    mapping() {
        let c = 0
        let arr = []
        this.state.data.map((input) => {
            c++
            arr.push(<RadioButton key={Math.random() * 10} text={input} label={this.props.labels === undefined ? undefined : this.props.labels[c - 1]} selected={input == this.state.selected} func={this.radioButtonCall.bind(this)} />)
        })
        return arr
    }
    render() {
        return (
            <View>
                <Line />
                <View style={styles.header}><Text style={styles.headerText}>{this.props.groupName}</Text></View>
                <Line />
                {
                    this.mapping()
                }
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
