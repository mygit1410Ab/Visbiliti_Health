import React, {useEffect} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {WebView} from 'react-native-webview';
import NetInfo from '@react-native-community/netinfo';

const App = () => {
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        Alert.alert('No Internet', 'Please connect to the internet.');
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <WebView
        source={{uri: 'https://visbiliti-health.com/application'}}
        style={styles.webView}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webView: {
    flex: 1,
  },
});
