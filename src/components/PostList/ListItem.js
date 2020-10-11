import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking } from 'react-native';
import Colors from '../../styles/colors';

export default function ListItem({
  post = {},
  index,
}) {
  const shortUrl = () => {
    let url = post.url || '';
    url = url.slice(12);
    const parts = url.split('/');
    return parts[0];
  }
  return (
    <View
      style={styles.postContainer}
    >
      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {post.title && (
          <Text>{`${index + 1}. ${post.title}`}</Text>
          )}

        {post.url && (
          <TouchableOpacity onPress={() => Linking.openURL(post.url)}>
            <Text style={{ color: Colors.gray }}>{` (${shortUrl()})`}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {post.score && (
          <Text>{post.score} points</Text>
        )}

        {post.by && (
          <>
            <Text style={{ color: Colors.gray }}>{` by `}</Text>
            <Text>{post.by}</Text>
          </>
        )}

        {post.time && (
          <Text style={{ color: Colors.gray }}> 2 hours ago | </Text>
        )}

        <Text>
          {post.kids.length} comments
        </Text>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  postContainer: {
    marginBottom: 6,
    paddingVertical: 6,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
  },
});