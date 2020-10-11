import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet } from 'react-native';
  import Colors from '../../styles/colors';

export default function Buttons({
  disabled = true,
  currentPage = 0,
  onPrevPress = () => {},
  onMorePress = () => {},
}) {
  if (disabled) return null;

  return (
    <View style={styles.container}>
      {currentPage > 1 ? (
        <TouchableOpacity onPress={onPrevPress}>
          <Text>Prev</Text>
        </TouchableOpacity>
      ) : (<View />)}

      {currentPage > 1 && currentPage < 10 && (
        <Text style={styles.line}> | </Text>
      )}

      {currentPage < 10 ? (
        <TouchableOpacity onPress={onMorePress}>
          <Text>More</Text>
        </TouchableOpacity>
      ) : (<View />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    width: 100,
    marginLeft: 4,
  },
  line: {
    color: Colors.gray
  }
});