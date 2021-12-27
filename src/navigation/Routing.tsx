import React, {FC} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import CoinScreen from '../screens/CoinScreen';
import {DetailsScreen} from '../screens/DetailsScreen';
import {HeaderTitle} from '../header/Header';

export type AppScreensList = {
  Crypto: undefined;
  Details: undefined;
};

const Stack = createNativeStackNavigator<AppScreensList>();

const Routing: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="Crypto"
      screenOptions={{
        headerTintColor: '#3D3D3D',
        headerTitleStyle: {
          fontWeight: 'bold',
          fontSize: 20,
        },
        headerTitleAlign: 'center',
      }}>
      <Stack.Screen
        name="Crypto"
        component={CoinScreen}
        options={{
          headerTitle: props => <HeaderTitle {...props} />,
        }}
      />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
};

export default Routing;
