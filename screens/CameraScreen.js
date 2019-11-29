import React, { Component, Fragment } from 'react';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import CameraBar from '../components/CameraBar';
import Gallery from '../components/Gallery';

export default class CameraScreen extends Component {
    camera = null;
    state = {
        captures: [],
        // setting flash to be turned off by default
        flashMode: Camera.Constants.FlashMode.off,
        capturing: null,
        // start the back camera by default
        cameraType: Camera.Constants.Type.back,
        hasCameraPermission: null,
    };

    setFlashMode = (flashMode) => this.setState({ flashMode });
    setCameraType = (cameraType) => this.setState({ cameraType });
    handleCaptureIn = () => this.setState({ capturing: true });

    handleCaptureOut = () => {
        if (this.state.capturing)
            this.camera.stopRecording();
    };

    handleShortCapture = async () => {
        const photoData = await this.camera.takePictureAsync();
        this.setState({ capturing: false, captures: [photoData, ...this.state.captures] })
    };

    handleLongCapture = async () => {
        const videoData = await this.camera.recordAsync();
        this.setState({ capturing: false, captures: [videoData, ...this.state.captures] });
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
        const { hasCameraPermission, flashMode, cameraType, capturing, captures } = this.state;

        if (hasCameraPermission === null) {
            return <View />;
        } else if (hasCameraPermission === false) {
            return <Text>Access to camera has been denied.</Text>;
        }

        return (
          <Fragment>
            <View>
                <Camera
                    type={cameraType}
                    flashMode={flashMode}
                    style={styles.preview}
                    ref={camera => this.camera = camera}
                />
            </View>
            {captures.length > 0 && <Gallery captures={captures}/>}

            <CameraBar 
                capturing={capturing}
                flashMode={flashMode}
                cameraType={cameraType}
                setFlashMode={this.setFlashMode}
                setCameraType={this.setCameraType}
                onCaptureIn={this.handleCaptureIn}
                onCaptureOut={this.handleCaptureOut}
                onLongCapture={this.handleLongCapture}
                onShortCapture={this.handleShortCapture}
            />
      </Fragment>
        );
    };
};

CameraScreen.navigationOptions = {
    title: 'Tire uma foto da sua pele',
  };

const { width: winWidth, height: winHeight } = Dimensions.get('window');

const styles = StyleSheet.create({
  preview: {
    height: winHeight,
    width: winWidth,
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
},

});