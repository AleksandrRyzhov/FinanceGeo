import {StyleSheet, Dimensions} from 'react-native';

const {height, width} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
  },
  item: {
    flexDirection: 'row',
    backgroundColor: '#E0E0E0',
    padding: 5,
    marginVertical: 1,
    marginHorizontal: 10,
  },
  imageItem: {
    width: 40,
    height: 40,
  },
  title: {
    paddingLeft: 5,
    fontSize: 18,
    color: '#3D3D3D',
  },
  price: {
    fontSize: 18,
    color: '#3D3D3D',
  },
  percent: {
    fontSize: 15,
  },
  inputStyle: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    paddingLeft: 5,
    color: '#3D3D3D',
  },
  childrenMainStyle: {
    flexDirection: 'row',
    marginTop: 20,
    paddingLeft: 20,
  },
  childrenTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#3D3D3D',
  },
  childrenDate: {
    fontSize: 15,
    fontWeight: '400',
    alignSelf: 'flex-end',
    paddingRight: 15,
  },
  detailStyle: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 15,
    backgroundColor: '#E0E0E0',
  },
  page: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  containerGeo: {
    flex: 1,
    height: height,
    width: width,
  },
  map: {
    flex: 1,
  },
  localData: {
    flexDirection: 'row',
    marginVertical: 10,
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  mainTextStyle: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  mainText: {
    fontSize: 14,
    color: '#3D3D3D',
  },
  coinScreenInput: {
    paddingHorizontal: 10,
          paddingVertical: 15,
  },
  headerStyle: {
    color: '#3D3D3D', fontWeight: 'bold', fontSize: 20
  },
  headerTitle: {
    flex: 1, justifyContent: 'center', alignItems: 'center'
  }
});
