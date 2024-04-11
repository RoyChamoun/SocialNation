import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {setUser} from '../../redux/authSlice';
import LinearGradient from 'react-native-linear-gradient';
import {loginStyles} from './LoginStyles';

const Login: React.FC = () => {
  const [username, setUsername] = useState<string>('kminchelle');
  const [password, setPassword] = useState<string>('0lelplR');
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    setTimeout(async () => {
      try {
        const response = await axios.post('https://dummyjson.com/auth/login', {
          username,
          password,
        });
        const userData = response.data;

        dispatch(setUser(userData));
      } catch (error) {
        // Handle error
      }
      setLoading(false);
    }, 5000);
  };

  return (
    <LinearGradient
      colors={['#003973', '#E5E5BE']}
      style={loginStyles.container}>
      <View style={loginStyles.formContainer}>
        <Image
          source={require('../../assets/logo.png')}
          style={loginStyles.logostyle}
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          autoCapitalize="none"
        />
        <TextInput
          style={loginStyles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <TouchableOpacity style={loginStyles.button} onPress={handleLogin}>
            <Text style={loginStyles.buttonText}>Log In</Text>
          </TouchableOpacity>
        )}
      </View>
    </LinearGradient>
  );
};

export default Login;
