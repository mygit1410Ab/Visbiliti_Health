import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const UsersList = () => {
  const data = [{id: 1, name: 'Abhishek'}];

  const renderItem = ({item}) => {
    return (
      <View>
        <Text>
          {item.id}
          {'-  '}
          <Text>{item.name}</Text>
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.mainCard}>
      <Text style={styles.headerText}>Users List</Text>
      <View style={styles.detailCard}></View>
      <FlatList
        data={data}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  mainCard: {
    width: '100%',
    alignItems: 'center',
  },
  detailCard: {
    width: '90%',
    marginTop: '5%',
  },
  headerText: {
    color: '#000',
    fontSize: 25,
    fontWeight: '900',
  },
  detailText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
  inputStyle: {
    borderWidth: 1,
    borderRadius: 5,
    color: '#000',
  },
});
