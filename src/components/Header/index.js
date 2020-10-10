import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  Image,
  TouchableOpacity } from 'react-native';
import Colors from '../../styles/colors';

const reloadPNG = require('../../assets/images/reload.png');

export default function Header({
  title = '',
  loading = false,
  onIconPress = () => {}
}) {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.orange}
        barStyle="dark-content"
      />

      <View style={styles.container}>

        <Text style={styles.title}>
          {title}
        </Text>

        <View style={styles.iconContainer}>
          {loading ? (
            <ActivityIndicator
              color={Colors.black}
              style={styles.activityIndicator}
            />
          ) : (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={onIconPress}
            >
              <Image
                source={reloadPNG}
                style={styles.icon}
              />
            </TouchableOpacity>
          )}
        </View>

      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: Colors.orange,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
  },
  iconContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  activityIndicator: { ...StyleSheet.absoluteFillObject },
  icon: {
    width: 24,
    height: 24,
  },
});
