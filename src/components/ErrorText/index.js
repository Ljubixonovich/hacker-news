import React from 'react';
import {
  View,
  Text,
  StyleSheet } from 'react-native';
  import Colors from '../../styles/colors';

export default function ErrorText({
  error = '',
}) {

  return (
    <>
    {error.length > 0 ? (
      <View style={styles.container}>
        <Text style={styles.text}>
          {error}
        </Text>
      </View>
    ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.red,
    paddingHorizontal: 14,
  },
  text: {
    color: Colors.white,
  }
});