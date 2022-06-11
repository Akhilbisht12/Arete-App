import {
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  View,
  TouchableOpacity,
  Text,
  Image,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import Icon from 'react-native-vector-icons/Ionicons';
import silly from '../../Silly/styles/silly';

const CameraView = ({photo, setPhoto, setCamera, width}) => {
  const {height} = Dimensions.get('window');
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;
  const camera = useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [flash, setFlash] = useState(false);
  useEffect(() => {
    const getCameraPermissions = async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === 'denied') {
        console.log('dd');
        const newCameraPermission = await Camera.requestCameraPermission();
        console.log(newCameraPermission);
      }
    };
    getCameraPermissions();
  }, []);
  const handleFlash = () => {
    setFlash(!flash);
  };
  const handlePhotoClick = async () => {
    const photo = await camera.current.takePhoto({
      flash: flash ? 'on' : 'off',
    });
    setPhoto(photo.path);
    setShowPhoto(true);
    console.log(photo.path);
  };
  if (device == null) {
    return <ActivityIndicator />;
  }
  if (showPhoto) {
    return (
      <View>
        <View>
          <Image
            source={{uri: `file://${photo}`}}
            style={{height: height - 200, width: width}}
          />
        </View>
        <View>
          <View style={[silly.p1, silly.fr, silly.jcbtw, silly.aic]}>
            <TouchableOpacity
              onPress={() => {
                setPhoto('');
                setShowPhoto(false);
              }}>
              <Icon
                name="ios-arrow-undo-sharp"
                size={25}
                color="white"
                style={{
                  backgroundColor: '#2d3e50',
                  padding: 20,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setCamera(false)}>
              <Icon
                name="ios-checkmark-done-sharp"
                size={25}
                color="white"
                style={{
                  backgroundColor: '#2d3e50',
                  padding: 20,
                  borderRadius: 200,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  return (
    <View>
      <Camera
        ref={camera}
        style={{width: width, height: height - 200}}
        device={device}
        isActive={true}
        photo={true}
      />

      <View
        style={{
          height: 200,
          flexDirection: 'row',
          backgroundColor: 'black',
          width: width,
        }}>
        <View
          style={{
            height: 200,
            width: width / 3,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={handleFlash} style={{marginBottom: 40}}>
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
            height: 200,
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
            height: 200,
          }}
        />
      </View>
    </View>
  );
};

export default CameraView;

const styles = StyleSheet.create({});
