import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LogIn from '../screens/login/LogIn';

const Stack = createNativeStackNavigator();

const MainNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="LogIn">
      <Stack.Screen
        name="LogIn"
        component={LogIn}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigator;
