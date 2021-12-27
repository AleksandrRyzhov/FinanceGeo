import React, {FC} from 'react';
import {View, Text, Image} from 'react-native';

import dayjs from 'dayjs';
import {styles} from '../style/styles';
import {IData} from './CoinScreen';

export const getCorrectDate = (item: string) => {
  return dayjs(item).format('YYYY-MM-DD hh:mm');
};

interface IChildrenItem {
  children: string;
  title: string | number;
}

export interface IProps {
  params: { title: any; };
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  symbol: number;
}

export const ChildrenItem: FC<IChildrenItem> = ({children, title}) => {
  const customColor =
    title === 'Percentage'
      ? children[0] !== '-'
        ? 'green'
        : 'red'
      : '#3D3D3D';

  return (
    <View style={styles.childrenMainStyle}>
      <Text style={styles.childrenTitle}>{title}:</Text>
      <Text style={[styles.childrenDate, {color: customColor}]}>
        {children}
      </Text>
    </View>
  );
};

export const DetailsScreen: FC<{route: IProps}> = ({route}) => {
  const {title} = route.params;

  return (
    <View style={styles.detailStyle}>
      <Text style={{fontSize: 30, color: '#3D3D3D'}}>{title.name}</Text>
      <Image
        style={{width: 100, height: 100, marginVertical: 20}}
        source={{uri: `${title.image}`}}
      />
      <ChildrenItem title={'Last update'}>
        {getCorrectDate(title.last_updated)}
      </ChildrenItem>
      <ChildrenItem title={'Current price'}>
        {`$${title.current_price}`}
      </ChildrenItem>
      <ChildrenItem title={'Percentage'}>
        {`${title.price_change_percentage_24h}%`}
      </ChildrenItem>
      <ChildrenItem title={'Max price last 24h'}>
        {`$${title.high_24h}`}
      </ChildrenItem>
      <ChildrenItem
        title={'Low price last 24h'}>{`$${title.low_24h}`}</ChildrenItem>
    </View>
  );
};
