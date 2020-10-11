import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking } from 'react-native';
import Colors from '../../styles/colors';

const getReadableTime = (timestamp) => {
  let t1 = new Date();
  let t2 = new Date(timestamp * 1000);

  const seconds = Math.round((t1.getTime() - t2.getTime()) / 1000);
  const minutes = Math.round(seconds / 60);
  const hours = Math.round(minutes / 60);
  const days = Math.round(hours / 24);

  if (days <= 0) return ` Today | `;

  if (days == 1) return ` ${days} day ago | `;

  if (days > 1) return ` ${days} days ago | `;
}

export default function ListItem({
  post = {},
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
      <View style={styles.row}>
        {post.title && (
          <Text>{`${post.rank}. ${post.title}`}</Text>
          )}

        {post.url && (
          <TouchableOpacity onPress={() => Linking.openURL(post.url)}>
            <Text style={styles.gray}>{` (${shortUrl()})`}</Text>
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.row}>
        {post.score && (
          <Text>{post.score} points</Text>
        )}

        {post.by && (
          <>
            <Text style={styles.gray}>{` by `}</Text>
            <Text>{post.by}</Text>
          </>
        )}

        {post.time && (
          <Text style={styles.gray}>
            {getReadableTime(post.time)}
          </Text>
        )}

        {post.kids && (
          <Text>
            {post.kids.length} comments
          </Text>
        )}
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
  row: { 
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  gray: { color: Colors.gray },
});