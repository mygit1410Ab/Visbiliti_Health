import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import UserFrom from '../components/UserFrom';
import UsersList from '../components/UsersList';

const HomeScreen = () => {
  return (
    <View style={styles.mainCard}>
      <UserFrom />
      <TouchableOpacity style={styles.btnStyle}>
        <Text style={styles.detailText}>Add Users</Text>
      </TouchableOpacity>
      <UsersList />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    alignItems: 'center',
  },
  btnStyle: {
    backgroundColor: 'lightBlue',
    padding: 15,
    marginVertical: 20,
    borderRadius: 10,
  },
  detailText: {
    color: '#000',
    fontSize: 18,
    fontWeight: '700',
  },
});
