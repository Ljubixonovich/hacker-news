import React from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { Header } from './src/components';


const App = () => {
  return (
    <>
      <Header
        title="HackerNews"
        onIconPress={() => {}}
      />
      <View>
        <Text>lista...</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({

});

export default App;
