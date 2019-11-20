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
            <Text>alo</Text>
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