import React from 'react';
import {Image, ImageSourcePropType, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../screens/home/Home';
import Add from '../screens/addpost/Add';
import Profile from '../screens/myprofile/Profile';
import {useNavigation} from '@react-navigation/native';
const homeIcon = require('../assets/home.png');
const addIcon = require('../assets/add.png');
const profileIcon = require('../assets/profile.png');

const Tab = createBottomTabNavigator();

const TabNavigator: React.FC = () => {
  const navigation = useNavigation();
  const openDrawer = () => {
    navigation.openDrawer();
  };
  const DrawerButton = () => (
    <TouchableOpacity onPress={openDrawer}>
      <Image
        source={require('../assets/bars.png')}
        style={{height: 20, width: 19, marginLeft: 10}}
      />
    </TouchableOpacity>
  );
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        tabBarIcon: ({color, size}) => {
          let iconName: ImageSourcePropType;

          switch (route.name) {
            case 'Home':
              iconName = homeIcon;
              break;
            case 'Add':
              iconName = addIcon;
              break;
            case 'Profile':
              iconName = profileIcon;
              break;
            default:
              iconName = homeIcon;
          }

          return (
            <Image
              source={iconName}
              style={{width: size, height: size, tintColor: color}}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: {
          height: 60, 
          backgroundColor: '#f0f0f0',
          paddingBottom: 5,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5, 
        },
        tabBarActiveTintColor: '#007bff',
        tabBarInactiveTintColor: '#8e8e93',
      })}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={Home}
        options={{headerLeft: DrawerButton}}
      />
      <Tab.Screen
        name="Add"
        component={Add}
        options={{headerLeft: DrawerButton}}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{headerLeft: DrawerButton}}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
