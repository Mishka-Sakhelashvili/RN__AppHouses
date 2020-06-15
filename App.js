import React, { useState } from 'react';
import { 
    StyleSheet, 
    View, 
    FlatList, 
    Alert, 
    TouchableWithoutFeedback, 
    Keyboard 
} from 'react-native';

import Header from './components/header';
import HousesItem from './components/HousesItem';
import AddHouse from './components/addHouse';

export default function App() {
  const [houses, setHouse] = useState([
    { text: 'Big flat', key: '1' },
    { text: 'Sea flat', key: '2' },
    { text: 'Mountine flat', key: '3' },
    { text: 'Tbilisi flat', key: '4' },
  ]);

  const pressHandler = (key) => {
    setHouse(prevHouses => {
      return prevHouses.filter(house => house.key != key);
    });
  };

  const submitHandler = (text) => {
    if(text.length > 3){
      setHouse(prevHouses => {
        return [
          { text, key: Math.random().toString() },
          ...prevHouses
        ];
      });
    } else {
      Alert.alert('House must be over 3 characters long', [
        {text: 'Understood', onPress: () => console.log('alert closed') }
      ]);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
      console.log('dismissed');
    }}>
      <View style={styles.container}>
        <Header />
        <View style={styles.content}>
          <AddHouse submitHandler={submitHandler} />
          <View style={styles.list}>
            <FlatList
              data={houses}
              renderItem={({ item }) => (
                <HousesItem item={item} pressHandler={pressHandler} />
              )}
            />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 40,
    flex: 1,
  },
  list: {
    marginTop: 20,
    flex: 1,
  },
});