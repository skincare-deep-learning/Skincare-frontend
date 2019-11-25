import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import Colors from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

export default function MainButton(props) {
    const {text, backgroundColor, color, icon, width} = props
    return(
        <TouchableHighlight style={[ {backgroundColor}, styles.wrapper]} onPress={props.onPress}>
            <View style={styles.btnTextWrapper}>
                {icon}
                <Text style={[ {color, width}, styles.btnText]}>{ text }</Text>
            </View>
        </TouchableHighlight>
    )
}


MainButton.propTypes = {
    text: propTypes.string.isRequired,
    color: propTypes.string,
    icon: propTypes.object,
    width: propTypes.string,
    backgroundColor: propTypes.string
}

function emit() {

}

const styles = StyleSheet.create({
    wrapper: {
        padding: 15,
        display: "flex",
        borderRadius: 40,
        borderWidth: 1,
        borderColor: Colors.white,
        marginBottom: 35,
        alignItems: "center"
    },
    btnText: {
        fontSize: 16,
        textAlign: "center"
    },
    btnTextWrapper: {
        flexDirection: "row",
        justifyContent: "flex-end"
    },
});