import React from 'react';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {View, Image, ImageSourcePropType} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import TabNavigator from '../TabNavigator';
import Settings from '../../screens/settings/Settings';
import Edit from '../../screens/edit/Edit';
import styles from './DrawerNavigationStyles';

const settingsIcon: ImageSourcePropType = require('../../assets/settings.png');
const editIcon: ImageSourcePropType = require('../../assets/edit.png');

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props: DrawerContentComponentProps) => {
  return (
    <LinearGradient colors={['#89CFF0', '#3b5998']} style={styles.gradient}>
      <DrawerContentScrollView {...props}>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../assets/user.png')}
            style={styles.profileImage}
          />
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    </LinearGradient>
  );
};

const DrawerNavigation: React.FC = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: 'center',
        drawerActiveTintColor: 'black',
        drawerInactiveTintColor: 'white',
        drawerStyle: {
          backgroundColor: 'transparent',
          width: 280,
        },
        drawerItemStyle: {
          marginVertical: 5,
        },
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name=" "
        component={TabNavigator}
        options={{
          title: 'Home',
          headerShown: false,
          drawerIcon: ({focused}) => (
            <Image
              source={require('../../assets/home.png')}
              style={[styles.icon, {tintColor: focused ? 'black' : 'white'}]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Edit"
        component={Edit}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={editIcon}
              style={[styles.icon, {tintColor: focused ? 'black' : 'white'}]}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          drawerIcon: ({focused}) => (
            <Image
              source={settingsIcon}
              style={[styles.icon, {tintColor: focused ? 'black' : 'white'}]}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default DrawerNavigation;
