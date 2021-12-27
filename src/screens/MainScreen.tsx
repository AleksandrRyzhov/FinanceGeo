import React, {FC, useState, useEffect} from 'react';
import {SafeAreaView, View, FlatList, Text, StatusBar} from 'react-native';

import axios from 'axios';
import dayjs from 'dayjs';

import {styles} from '../style/styles';

export interface IData {
  Cur_Abbreviation: string;
  Cur_ID: number;
  Cur_Name: string;
  Cur_OfficialRate: number;
  Cur_Scale: number;
  Date: string;
}

interface IItem {
  item: IData;
}

interface ITitle {
  title: IData;
}

export const ItemMainScreen: FC<ITitle> = ({title}) => {
  return (
    <View style={styles.item}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View>
          <View>
            <Text style={{paddingLeft: 5, fontSize: 14, color: '#3D3D3D'}}>
              {title.Cur_Name}
            </Text>
          </View>
          <View>
            <Text style={{paddingLeft: 5, fontSize: 14, color: '#3D3D3D'}}>
              {title.Cur_Scale} {title.Cur_Abbreviation}
            </Text>
          </View>
        </View>
        <View>
          <Text style={{paddingHorizontal: 5, fontSize: 16, color: '#3D3D3D'}}>
            {title.Cur_OfficialRate}
          </Text>
        </View>
      </View>
    </View>
  );
};

const MainScreen: FC = ({}) => {
  const [data, setData] = useState<IData[] | null>(null);
  const [refreshing, setRefreshing] = useState<true | false>(false);

  useEffect(() => {
    getExrates();
  }, []);

  const getExrates = () => {
    axios
      .get('https://www.nbrb.by/api/exrates/rates?periodicity=0')
      .then(res => {
        setData(res.data);
      });
  };

  const today = dayjs().format('DD.MM.YYYY');

  const renderItem: FC<IItem> = ({item}: IItem) => <ItemMainScreen title={item} />;

  const mainText =
    'Официальный курс белорусского рубля по отношению к иностранным валютам, устанавливаемый Национальным банком Республики Беларусь ежедневно: ';

  const onRefresh = () => {
    setRefreshing(true);
    getExrates();
    setRefreshing(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} backgroundColor="#3D3D3D" />
      <View style={styles.mainTextStyle}>
        <Text style={styles.mainText}>
          {mainText}
          {today}
        </Text>
      </View>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item}` + index}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </SafeAreaView>
  );
};

export default MainScreen;
