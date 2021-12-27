import React, {FC, useState, useEffect} from 'react';
import {View, Text, StatusBar} from 'react-native';

import RNLocation, {Location} from 'react-native-location';
import Geocoder from 'react-native-geocoder';
// import MapboxGL from '@react-native-mapbox-gl/maps';

import {styles} from '../style/styles';

// MapboxGL.setAccessToken(
//   'sk.eyJ1IjoiYWxleHJ5emhvdiIsImEiOiJja3g0bHlxbmwwd2I3MnZxa2l0YTZxOWZ1In0.-GfL7ilra-59rY_Bn89m7A',
// );
// MapboxGL.setConnected(true);

// coordinates Minsk 53.873873873873876, 27.56652739792952;

RNLocation.configure({
  distanceFilter: 5.0,
});

RNLocation.configure({
  distanceFilter: 100, // Meters
  desiredAccuracy: {
    ios: 'best',
    android: 'balancedPowerAccuracy',
  },
  // Android only
  androidProvider: 'auto',
  interval: 5000, // Milliseconds
  fastestInterval: 10000, // Milliseconds
  maxWaitTime: 5000, // Milliseconds
  // iOS Only
  activityType: 'other',
  allowsBackgroundLocationUpdates: false,
  headingFilter: 1, // Degrees
  headingOrientation: 'portrait',
  pausesLocationUpdatesAutomatically: false,
  showsBackgroundLocationIndicator: false,
});

interface ICurrentLocation {
  countryCode: string;
  country: string;
  locality: string;
  streetName: string;
  streetNumber: number;
}

const initialLocateData = {
  countryCode: '',
  country: '',
  locality: '',
  streetName: '',
  streetNumber: 0,
};

export const GeoDateScreen: FC<{}> = () => {
  const [viewLocation, setViewLocation] = useState<number[] | []>([]);
  const [currentLocation, setCorrentLocation] =
    useState<ICurrentLocation>(initialLocateData);

  useEffect(() => {
    getLocation();
    // MapboxGL.setTelemetryEnabled(false);
  }, []);

  const getLocation = async () => {
    let permission = await RNLocation.checkPermission({
      ios: 'whenInUse', // or 'always'
      android: {
        detail: 'fine', // or 'fine'
      },
    });

    let location: Location | any;
    if (!permission) {
      permission = await RNLocation.requestPermission({
        ios: 'whenInUse',
        android: {
          detail: 'fine',
          rationale: {
            title: 'We need to access your location',
            message: 'We use your location to show where you are on the map',
            buttonPositive: 'OK',
            buttonNegative: 'Cancel',
          },
        },
      });
      location = await RNLocation.getLatestLocation({timeout: 100});

      setViewLocation([location.longitude, location.latitude]);
    } else {
      location = await RNLocation.getLatestLocation({timeout: 100});

      setViewLocation([location.longitude, location.latitude]);

      const currentLocate = {
        lat: location?.latitude,
        lng: location?.longitude,
      };

      await Geocoder.geocodePosition(currentLocate).then((res: any) => {
        setCorrentLocation(res[0]);
      });
    }
  };

  const {countryCode, country, locality, streetName, streetNumber} =
    currentLocation;

  return (
    <>
      <StatusBar animated={true} backgroundColor="#3D3D3D" />
      {countryCode ? (
        <View style={styles.localData}>
          <Text> {countryCode}, </Text>
          <Text> {country}, </Text>
          <Text> {locality}, </Text>
          <Text> {streetName}</Text>
          <Text> {streetNumber}</Text>
        </View>
      ) : null}

      {/* <View style={styles.page}>
        <View style={styles.containerGeo}>
          {viewLocation.length ? (
            <MapboxGL.MapView style={styles.map}>
              <MapboxGL.Camera zoomLevel={15} centerCoordinate={viewLocation} />
              <MapboxGL.PointAnnotation coordinate={viewLocation} id="Test" />
            </MapboxGL.MapView>
          ) : null}
        </View>
      </View> */}
    </>
  );
};
