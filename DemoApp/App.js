import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';

const App = () => {
  return (
    <View style={styles.mainCard}>
      <HomeScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainCard: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
