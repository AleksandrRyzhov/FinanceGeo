import React, {FC, useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';

import axios from 'axios';

import {styles} from '../style/styles';

export interface IData {
  params: { title: any; };
  name: string;
  current_price: number;
  image: string;
  price_change_percentage_24h: number;
  symbol: number;
}

interface IItem {
  item: IData;
}

export interface IProps {
  title: IData;
  navigation: any;
  setInputValue: (value: string) => void;
}



export const ItemCoinScreen: FC<IProps> = ({title, navigation, setInputValue}) => {
  const onPress = () => {
    navigation.navigate('Details', {title});
    setInputValue('');
  };

  const percentage = +title.price_change_percentage_24h?.toFixed(2);

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <StatusBar animated={true} backgroundColor="#3D3D3D" />
      <Image style={styles.imageItem} source={{uri: `${title.image}`}} />
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text style={styles.title}>{title.name}</Text>
          <Text style={{fontSize: 15, color: '#3D3D3D', paddingLeft: 5}}>
            {title.symbol}
          </Text>
        </View>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={styles.price}>${title.current_price}</Text>
          <Text
            style={[
              styles.percent,
              {color: percentage >= 0 ? 'green' : 'red'},
            ]}>
            {percentage}%
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const CoinScreen: FC = ({navigation}: any) => {
  const [data, setData] = useState<IData[] | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const DATA = data?.filter(el =>
    el?.name?.toLowerCase().includes(inputValue?.toLowerCase()),
  );

  useEffect(() => {
    getData();
  }, []);

  const getData = async() => {
    await axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false',
      )
      .then(res => {
        setData(res.data);
      });
  };

  const renderItem: FC<IItem> = ({item}) => (
    <ItemCoinScreen title={item} navigation={navigation} setInputValue={setInputValue} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        hidden={false}
        backgroundColor="#1e90ff"
      />
      <View
        style={styles.coinScreenInput}>
        <TextInput
          placeholder={'Search Cryptos'}
          onChangeText={setInputValue}
          value={inputValue}
          style={styles.inputStyle}
          placeholderTextColor={'#c0c0c0'}
        />
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={(item, index) => 'item' + index}
        refreshing={refreshing}
        onRefresh={() => {
          setRefreshing(true);
          getData();
          setRefreshing(false);
        }}
      />
    </SafeAreaView>
  );
};

export default CoinScreen;
