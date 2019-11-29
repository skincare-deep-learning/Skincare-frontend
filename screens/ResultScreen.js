import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image} from 'react-native';
import { bold } from 'ansi-colors';

export default class ResultScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            probability: this.props.navigation.state.params.probability,
            disease: this.props.navigation.state.params.disease
        }
    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Image
                    source={require('../assets/images/skincare-logo.png')}
                    style={styles.logo}
                />
                <View style={styles.circle}>
                    <Text style={styles.result}> Diagnóstico: { this.state.disease } </Text>
                    <Text style={styles.result}> Probabilidade: { this.state.probability }%</Text>
                </View>
                <View>
                    <TouchableOpacity style={styles.button}onPress={() => navigate('Home')}>
                        <Text style={styles.buttonText}>Home</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

ResultScreen.navigationOptions = {
     title: 'Relatório'
};

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: '#7fd4f0',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    circle: {
        width: winWidth/2,
        height: winWidth/2,
        borderRadius: (winWidth+winHeight)/2,
        borderColor: '#474cd4',
        borderWidth: 5,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        
    },
    result:{
        fontSize: 12,
    },
    button: {
        marginTop: 10,
        padding: 15,
        borderRadius: 40,
        borderWidth: 1,
        borderColor: "#fff",
        marginBottom: 35,
        alignItems: "center",
        backgroundColor: "#fff"
    },
    buttonText: {
        fontSize: 16,
        color: '#474cd4',
        fontWeight: 'bold',

    },
    logo: {
        width: 300,
        height: 150,
        resizeMode: 'contain',

      },
});