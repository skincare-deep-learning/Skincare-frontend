 
import React, { Component } from 'react';
import propTypes from 'prop-types';
import { Text, View, TouchableHighlight, StyleSheet } from "react-native";
import Colors from '../../constants/Colors';

export default function ConfirmationButton(props) {
    const {text, backgroundColor, color, icon, width} = props
    return(
        <TouchableHighlight style={[ {backgroundColor}, styles.wrapper]} onPress={props.onPress}>
            <View style={styles.btnTextWrapper}>
                {icon}
            </View>
        </TouchableHighlight>
    )

}

ConfirmationButton.propTypes = {
    color: propTypes.string,
    icon: propTypes.object.isRequired,
    width: propTypes.string,
    backgroundColor: propTypes.string
}

const styles = StyleSheet.create({
    wrapper: {
        display: 'flex',
        borderRadius: 50,
        width: 100,
        height: 100,
        borderWidth: 1,
        borderColor: Colors.blue00,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 15
    },
    btnText: {
        fontSize: 12,
        textAlign: 'center'
    },
    btnTextWrapper: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
});