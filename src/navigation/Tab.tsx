import React, {FC} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import MainScreen from '../screens/MainScreen';
import {GeoDateScreen} from '../screens/GeoDateScreen';
import Routing from './Routing';
import HeaderTitleMain, {HeaderTitleGeo} from '../header/Header';

export type AppTabList = {
  Exrates: undefined;
  Cryptos: undefined;
  GeoData: undefined;
};

const Tab = createBottomTabNavigator<AppTabList>();

const MyTabs: FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: any;

            if (route.name === 'Exrates') {
              iconName = 'money';
            } else if (route.name === 'Cryptos') {
              iconName = 'bitcoin';
            } else if (route.name === 'GeoData') {
              iconName = 'location-arrow';
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: '#A1A1A1',
          headerTitleAlign: 'center',
        })}>
        <Tab.Screen
          name="Exrates"
          component={MainScreen}
          options={{
            headerTitle: props => <HeaderTitleMain {...props} />,
          }}
        />
        <Tab.Screen
          name="Cryptos"
          component={Routing}
          options={{
            headerShown: false,
          }}
        />
        <Tab.Screen
          name="GeoData"
          component={GeoDateScreen}
          options={{
            headerTitle: props => <HeaderTitleGeo {...props} />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
export default MyTabs;
