import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
  Alert,
  BackHandler,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';
import SillyText from '../../Silly/components/SillyText';
import {clr1, clr2} from '../../config/globals';
import {connect} from 'react-redux';
import {CapPres, editStep} from '../../store/actions/SAEstimatorActions';

const CameraView = ({photo, setPhoto, setCamera, width, editStep, CapPres}) => {
  const {height} = Dimensions.get('window');
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const camera = useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [flash, setFlash] = useState(false);
  const [perm, setPerm] = useState();
  useEffect(() => {
    getCameraPermissions();
  }, [perm]);

  const getCameraPermissions = async () => {
    const cameraPermission = await Camera.getCameraPermissionStatus();
    setPerm(cameraPermission);
    if (cameraPermission === 'denied') {
      const newCameraPermission = await Camera.requestCameraPermission();
      setPerm(newCameraPermission);
      console.log(newCameraPermission);
    }
  };
  const handleFlash = () => {
    setFlash(!flash);
  };
  const handlePhotoClick = async () => {
    const photo = await camera.current.takeSnapshot({
      flash: flash ? 'on' : 'off',
      quality: 40,
    });

    setPhoto(photo.path);
    CapPres({pres: photo.path});
    setShowPhoto(true);
    console.log(photo.path);
  };
  if (device == null) {
    return <ActivityIndicator />;
  }
  if (perm === 'denied') {
    Alert.alert(
      'Camera Permission Required',
      'Please allow camera permession to capture prescription',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => getCameraPermissions()},
      ],
    );
  }
  if (showPhoto) {
    return (
      <View style={[silly.bg2]}>
        <View style={[silly.bg2]}>
          <Image
            source={{uri: `file://${photo}`}}
            style={{height: height, width: width}}
          />
        </View>
        <View style={[silly.pa, silly.b0, silly.w100p]}>
          <View style={[silly.p1, silly.fr, silly.jcbtw, silly.aic]}>
            <TouchableOpacity
              style={[
                silly.fr,
                silly.aic,
                silly.bg2,
                silly.p2,
                silly.br30,
                silly.m1,
              ]}
              onPress={() => {
                setPhoto('');
                setShowPhoto(false);
              }}>
              <Icon name="ios-arrow-undo-sharp" size={25} color={clr1} />
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                silly.fr,
                silly.aic,
                silly.bg2,
                silly.p2,
                silly.br30,
                silly.m1,
              ]}
              onPress={() => editStep({step: 24})}>
              <Icon name="ios-checkmark-done-sharp" size={25} color={clr1} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View style={[]}>
      <Camera
        ref={camera}
        style={[{width: width, height: height}]}
        device={device}
        isActive={true}
        photo={true}
      />
      <View style={[silly.pa, silly.top5p, silly.right5p]}>
        <TouchableOpacity onPress={() => setCamera(false)}>
          <Icon color={clr2} name="close-outline" size={40} />
        </TouchableOpacity>
      </View>
      <View
        style={[
          silly.pa,
          silly.b0,
          silly.fr,
          silly.w100p,
          {
            height: 100,
          },
        ]}>
        <View style={[silly.jcc, silly.aic, silly.w30p, {height: 100}]}>
          <TouchableOpacity onPress={handleFlash} style={silly.mb4}>
            <Icon
              name="flash"
              size={25}
              style={{
                color: flash ? 'yellow' : '#a5a5a5',
              }}
            />
            <Text style={{color: 'white'}}>Flash</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: width / 3,
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}>
          <TouchableOpacity
            onPress={handlePhotoClick}
            style={{
              backgroundColor: 'white',
              borderRadius: 100,
              height: 60,
              width: 60,
              borderWidth: 3,
              borderColor: '#c5c5c5',
              marginBottom: 50,
            }}
          />
        </View>
        <View
          style={{
            width: width / 3,
            justifyContent: 'center',
            alignItems: 'center',
            height: 100,
          }}
        />
      </View>
    </View>
  );
};
const mapDispatchToProps = dispatch => {
  return {
    editStep: item => dispatch(editStep(item)),
    CapPres: item => dispatch(CapPres(item)),
  };
};
export default connect(null, mapDispatchToProps)(CameraView);
