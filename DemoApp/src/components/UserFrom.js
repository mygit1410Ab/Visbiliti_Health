import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';

const UserFrom = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  return (
    <View style={styles.mainCard}>
      <View style={styles.detailCard}>
        <Text style={styles.detailText}>Name:</Text>
        <TextInput
          placeholder="Enter your Name"
          onChangeText={text => setName(text)}
          style={styles.inputStyle}
        />
      </View>
      <View style={styles.detailCard}>
        <Text style={styles.detailText}>Email:</Text>
        <TextInput
          placeholder="Enter your Email"
          onChangeText={text => setEmail(text)}
          style={styles.inputStyle}
        />
      </View>
    </View>
  );
};

export default UserFrom;

const styles = StyleSheet.create({
  mainCard: {
    // flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  detailCard: {
    width: '90%',
    marginTop: '5%',
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
