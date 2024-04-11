import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {logout} from '../../redux/authSlice';
import LinearGradient from 'react-native-linear-gradient';
import {profileStyles} from './ProfileStyles'; 

interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
}

const Profile: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector(
    (state: RootState) => state.auth.user as User | null,
  );

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <LinearGradient
      colors={['#003973', '#E5E5BE']}
      style={profileStyles.container}>
      <Text style={profileStyles.title}>User Profile</Text>
      {user ? (
        <View style={profileStyles.userInfo}>
          <Image source={{uri: user.image}} style={profileStyles.image} />
          <View style={profileStyles.infoBox}>
            <Text style={profileStyles.userInfoText}>
              Username: {user.username}
            </Text>
          </View>
          <View style={profileStyles.infoBox}>
            <Text style={profileStyles.userInfoText}>Email: {user.email}</Text>
          </View>
          <View style={profileStyles.infoBox}>
            <Text style={profileStyles.userInfoText}>
              First Name: {user.firstName}
            </Text>
          </View>
          <View style={profileStyles.infoBox}>
            <Text style={profileStyles.userInfoText}>
              Last Name: {user.lastName}
            </Text>
          </View>
          <View style={profileStyles.infoBox}>
            <Text style={profileStyles.userInfoText}>
              Gender: {user.gender}
            </Text>
          </View>
          <TouchableOpacity style={profileStyles.button} onPress={handleLogout}>
            <Text style={profileStyles.buttonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Text>No user data available</Text>
      )}
    </LinearGradient>
  );
};

export default Profile;
