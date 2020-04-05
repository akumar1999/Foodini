import * as React from 'react';
import { StyleSheet, View, Text as RNText, TouchableOpacity, 
} from 'react-native';
import { Text } from '../components/StyledText';

// for access to camera on android phone
import { Camera } from 'expo-camera';

// for using camera again if tab is in focus again
import { useIsFocused } from '@react-navigation/native';

// for camera control icons 
import { Ionicons } from '@expo/vector-icons';

export default function PostPictureScreen({navigation, route, user}) {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [type, setType] = React.useState(Camera.Constants.Type.back);
  const isFocused = useIsFocused();
  var camera;

  React.useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, [])

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const onPictureSaved = photo => {
    navigation.navigate('Form', { data: photo })
  }

  return (
    <View style={{flex: 1,}}>
      { isFocused &&
      <Camera style={{ flex: 1, }} type={type} ratio="4:3"
        ref={(ref) => { camera = ref; }}>

        <View style={{flex: 1, flexDirection: "column", justifyContent: "flex-end"}}>
          <View style={{paddingBottom: 20, flexDirection: "row", justifyContent: "space-evenly", 
              alignItems: "center",}}>

            <TouchableOpacity
              onPress={() => {
                camera.takePictureAsync({ onPictureSaved: onPictureSaved});
            }}>
              <Ionicons
                name='ios-radio-button-off'
                color="#fefefe"
                size={70}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
              <Ionicons
                name='ios-refresh'
                color="#fefefe"
                size={35}
              />
            </TouchableOpacity>

            </View>
          </View>

        </Camera>
        }
      </View>
  );




}



const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    flex: 1,
  },
  input: {
    backgroundColor: "#fefefe", 
    borderRadius: 5, borderColor: "#dddddd", borderWidth: 1,
    padding: 10,
  },
  button: {
    paddingVertical: 10,
    backgroundColor: "#dddddd",
    borderColor: "#cccccc",
  },
  sliderThumb: {
    borderColor: "#bbbbbb",
    borderWidth: 1,
    elevation: 1,
  }
});

PostPictureScreen.navigationOptions = {
  header: null,
};