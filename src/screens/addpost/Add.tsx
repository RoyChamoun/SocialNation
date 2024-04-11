import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  PermissionsAndroid,
  Image,
  Platform,
} from 'react-native';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {launchImageLibrary} from 'react-native-image-picker';
import notifee, {AndroidImportance} from '@notifee/react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import AddStyles from './AddStyles';

notifee.onBackgroundEvent(async () => {});

type RootStackParamList = {
  Home: undefined;
  Add: undefined;
};

const Add: React.FC = () => {
  const [caption, setCaption] = useState<string>('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const username = useSelector((state: RootState) => state.auth.user?.username);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const image = useSelector((state: RootState) => state.auth.user?.image);

  useEffect(() => {
    async function setupNotifications() {
      await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
        importance: AndroidImportance.HIGH,
      });
      await notifee.requestPermission();
    }

    setupNotifications();
  }, []);

  const sendLocalNotification = async (imageUri: string) => {
    try {
      await notifee.displayNotification({
        title: 'Image Uploaded',
        body: 'Your image has been successfully uploaded!',
        android: {
          channelId: 'default',
          pressAction: {
            id: 'default',
            launchActivity: 'default',
            data: {id: imageUri} as {id: string},
          },
        },
      });
    } catch (error) {
      console.error('Error displaying notification:', error);
    }
  };

  const requestGalleryPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        {
          title: 'Gallery Access Permission',
          message: 'App needs access to your gallery to select photos.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };

  const selectPhoto = async () => {
    const hasPermission = await requestGalleryPermission();

    if (!hasPermission) {
      Alert.alert(
        'Permission Denied',
        'You need to grant gallery access to select photos',
      );
      return;
    }

    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.didCancel) {
      Alert.alert('Cancelled', 'You did not select any photo');
      return;
    }

    if (result.errorCode) {
      Alert.alert('Error', result.errorMessage || 'An error occurred');
      return;
    }

    const uri = result.assets?.[0]?.uri ?? null;
    setPhotoUri(uri);
  };

  const handleCancel = () => {
    setPhotoUri(null);
  };

  const handleAdd = async () => {
    if (!photoUri) {
      Alert.alert('Error', 'No photo selected');
      return;
    }

    const data = {
      photo: photoUri,
      caption,
      date: new Date().toISOString(),
      username: username || '',
      image: image || '',
    };

    try {
      await axios.post(
        'https://660ffae70640280f219c0325.mockapi.io/post',
        data,
      );
      setCaption('');
      setPhotoUri(null);
      await sendLocalNotification(photoUri);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Error', 'Failed to upload photo');
    }
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={AddStyles.container}>
      <TextInput
        style={AddStyles.input}
        placeholder="Enter caption"
        placeholderTextColor="#aaa"
        value={caption}
        onChangeText={setCaption}
      />
      <TouchableOpacity style={AddStyles.button} onPress={handleAdd}>
        <Text style={AddStyles.buttonText}>Post</Text>
      </TouchableOpacity>
      <TouchableOpacity style={AddStyles.button} onPress={selectPhoto}>
        <Text style={AddStyles.buttonText}>Select Photo</Text>
      </TouchableOpacity>
      {photoUri && (
        <View style={AddStyles.photoContainer}>
          <Image source={{uri: photoUri}} style={AddStyles.photo} />
          <TouchableOpacity
            style={AddStyles.cancelButton}
            onPress={handleCancel}>
            <Text style={AddStyles.cancelButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      )}
    </LinearGradient>
  );
};

export default Add;
