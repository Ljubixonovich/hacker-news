import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Linking } from 'react-native';
import ListItem from './ListItem';

export default function PostList({
  posts = [],
}) {
  return (
    <ScrollView style={styles.container}>
      {posts.length <= 0 ? (
        <View><Text>Loading...</Text></View>
      ) : (
        posts.map((post, index) => (
          <ListItem
            key={index}
            post={post}
            index={index}
          />
        ))
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});