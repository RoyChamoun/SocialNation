import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {RootState} from '../redux/store';
import MainNavigator from './MainNavigator';
import DrawerNavigation from './drawernavigation/DrawerNavigation';

const Navigation = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <NavigationContainer>
      {user ? <DrawerNavigation /> : <MainNavigator />}
    </NavigationContainer>
  );
};

export default Navigation;
