import React from 'react';
import { View, Text, } from 'react-native';
import ListItem from './ListItem';

export default function PostList({
  posts = [],
}) {
  return (
    <>
      {posts.length <= 0 ? (
        <View><Text>Loading...</Text></View>
      ) : (
        posts.map((post, index) => (
          <ListItem
            key={index}
            post={post}
          />
        ))
      )}
    </>
  );
}
