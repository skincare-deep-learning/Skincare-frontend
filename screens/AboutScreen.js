 
import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Text, View, TouchableHighlight, StyleSheet, Image } from "react-native";
import Colors from '../constants/Colors'
import { ScrollView } from 'react-native-gesture-handler';

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.aboutContainer}>
          <Image
              source={require('../assets/images/skincare-logo.png')}
              style={styles.logo}
          />
          <View style={styles.containerText}>
            <Text>
              O problema de diagnóstico de câncer de pele tardio afeta a população como um todo, mas principalmente quem tem muita esposição a radiação ultravioleta diariamente. Cujo impacto é descobrimento e intervenção no câncer quando encontra-se em estágio avançado.
            </Text>
            <Text>
            Tendo em vista essa contextualização, o objetivo do Skincare é ajudar Dermatologistas ou Clínicos Gerais para que realizam diagnóstico de câncer de pele instantâneo e não evasivo por imagem, diferente de Biópia ou exame de sangue.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

AboutScreen.navigationOptions = {
  title: 'Sobre o SkinCare',
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    fontFamily: 'roboto',
    backgroundColor: Colors.blue00,
  },
  contentContainer: {
    paddingTop: 30,
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  aboutContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    display: 'flex',
    padding: 20
  },
  containerText: {
    paddingTop: 15
  }
})