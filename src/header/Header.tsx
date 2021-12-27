import React, {FC} from 'react';
import {View, Text} from 'react-native';
import { styles } from '../style/styles';

export const HeaderTitle: FC = () => {
  return (
    <View style={styles.headerTitle}>
      <Text style={styles.headerStyle}>
        Crypto Currencies
      </Text>
    </View>
  );
};

export const HeaderTitleGeo: FC = () => {
  return (
    <View style={styles.headerTitle}>
      <Text style={styles.headerStyle}>
      GeoData
      </Text>
    </View>
  );
};

const HeaderTitleMain: FC = () => {
  return (
    <View>
      <Text style={styles.headerStyle}>
        Exrates
      </Text>
    </View>
  );
};
export default HeaderTitleMain;
