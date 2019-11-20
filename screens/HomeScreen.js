import * as WebBrowser from 'expo-web-browser';
import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { MonoText } from '../components/StyledText';
import Colors from '../constants/Colors';
import { Ionicons, FontAwesome } from '@expo/vector-icons'

import MainButton from '../components/buttons/mainButton'

export default function HomeScreen(props) {
  const {navigate} = props.navigation
  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
          {/* logo */}
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/skincare-logo.png')}
            style={styles.logo}
          />
          <View style={styles.contentContainer}>
            <Text style={styles.welcomeText}>Bem Vindo</Text>
          </View>
          {/* Main Menu */}
          <View style={styles.menuContainer}>
            <MainButton
              text="Começar"
              width="100%"
              color={Colors.blue01}
              icon={<FontAwesome name="stethoscope" size={20} style={styles.startIcon}/>}
              backgroundColor={Colors.white} />
            <MainButton
              text="Sobre"
              color={Colors.blue01}
              width="100%"
              icon={<Ionicons name="ios-information-circle" size={20} style={styles.aboutIcon}/>}
              backgroundColor={Colors.white}
              onPress={() => navigate('About')} />
            <MainButton
              text="Documentação"
              color={Colors.blue01}
              width="100%"
              icon={<Ionicons name="logo-github" size={20} style={styles.aboutIcon}/>}
              backgroundColor={Colors.white}
              onPress={handleDocumentationPress} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};


function handleAboutPress() {
  navigate('About')
}

function handleDocumentationPress() {
  WebBrowser.openBrowserAsync(
    'https://github.com/deeplearningunb/Skincare/'
  );
}


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
  welcomeContainer: {
    alignItems: 'center',
    marginBottom: 20,
    flex: 1,
    display: 'flex',
    marginTop: 30,
    padding: 20
  },
  logo: {
    width: 300,
    height: 150,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  menuContainer: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    marginHorizontal: 40,
  },
  welcomeText: {
    fontSize: 30,
    color: Colors.blue01,
    fontWeight: "300",
    marginBottom: 40
  },
  startIcon: {
    color: Colors.blue01,
    position: "relative",
    left: 30,
    zIndex: 8
  },
  aboutIcon: {
    color: Colors.blue01,
    position: "relative",
    left: 20,
    zIndex: 8
  },
});
