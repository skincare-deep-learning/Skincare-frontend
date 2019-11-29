import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Dimensions, ImageBackground, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import CameraBar from '../components/CameraBar';
import Colors from '../constants/Colors';
import ConfirmationButton from '../components/buttons/confirmationButton';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import api from '../services/api';

export default class CameraScreen extends Component {
    camera = null;
    state = {
        image: null,
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };

    static navigationOptions = ({ navigation }) => ({
        title: navigation.getParam('title', 'Tire uma foto da sua pele')
    })

    handleTitleChange() {
        if(this.state.image) return this.props.navigation.setParams({ title: 'Deseja enviar esta foto?' })
        else return this.props.navigation.setParams({ title: 'Tire uma foto da sua pele' })
    }

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const options = { quality: 0.5, base64: true };
        const photoData = await this.camera.takePictureAsync(options);
        await this.setState({ capturing: false, image: photoData });
        this.handleTitleChange()
    };

    async componentDidMount() {
        const camera = await Permissions.askAsync(Permissions.CAMERA);
        const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
        const hasCameraPermission = (camera.status === 'granted' && audio.status === 'granted');
        this.setState({ hasCameraPermission });
    };

    newPhoto = async () => {
        await this.setState({ image: null });
        this.handleTitleChange();
    }

    getResult = (data) => {
        const { navigate } = this.props.navigation;
        let prob = 0;
        let dis;

        for(i in data){
            if(data[i] > prob){
                prob = data[i];
                dis = i;
            }
        }
        prob*=100;
        prob = parseFloat(prob.toFixed(2))
        navigate('Result', {probability:prob, disease:dis});
    }

    sendPhoto = async () => {
        try {
            const imageData = new FormData();
            imageData.append('file', {
                uri: this.state.image.uri,
                type: 'image/jpg',
                name: 'image'
            })

            const response = await api.post('classifier', imageData).then(res => {
                //alert('enviado com sucesso')
                const { data } = res.data;
                this.getResult(data);
            })

        } catch(e) {
            alert(e)
        }
    }

    render() {
        const { hasCameraPermission, flashMode, cameraType, capturing, image } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        if(!image){
            return (
                <Fragment>
                  <View>
                      <Camera
                          type={cameraType}
                          flashMode={flashMode}
                          style={styles.camera}
                          ref={camera => this.camera = camera}
                      />
                  </View>
      
                  <CameraBar 
                      capturing={capturing}
                      flashMode={flashMode}
                      cameraType={cameraType}
                      setFlashMode={this.setFlashMode}
                      setCameraType={this.setCameraType}
                      onCaptureIn={this.handleCaptureIn}
                      onCaptureOut={this.handleCaptureOut}
                      onShortCapture={this.handleShortCapture}
                  />
                </Fragment>
            );
        } else {
            return(
                <View style={styles.previewContainer}>
                    <ImageBackground source={image} style={styles.preview}/>
                    <View style={styles.menuContainer}>
                        <ConfirmationButton
                            color={Colors.blue01}
                            width="50%"
                            icon={<MaterialIcons name="cancel" size={70} style={styles.cancelIcon}/>}
                            backgroundColor={Colors.blue00}
                            onPress={this.newPhoto} />
                        <ConfirmationButton
                            color={Colors.blue01}
                            width="50%"
                            icon={<Ionicons name="ios-checkmark-circle" size={70} style={styles.confirmIcon}/>}
                            backgroundColor={Colors.blue00}
                            onPress={this.sendPhoto} />
                    </View>
                </View>
            )
        }
    };
};

// CameraScreen.navigationOptions = {
//     title: 'Tire uma foto da sua pele'
//   };

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
    camera: {
        height: winHeight,
        width: winWidth,
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
    },
    previewContainer: {
        flex: 1,
        alignItems: 'center',
        display: 'flex'
    },
    preview: {
        width: winWidth,
        height: winHeight - 200,
    },
    menuContainer: {
        backgroundColor: Colors.blue00,
        flex: 1,
        right: 0,
        left: 0,
        bottom: 0,
        width: winWidth,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    confirmIcon: {
        color: Colors.green01,
        position: 'relative',
    },
    cancelIcon: {
        color: Colors.red01,
        position: 'relative',
    },
});