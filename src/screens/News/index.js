import React, {
  useEffect,
  useState, } from 'react';
import { 
  View,
  ScrollView,
  StyleSheet,
  Text } from 'react-native';
import {
  Buttons,
  Header,
  PostList, } from '../../components';
import { Api } from '../../helpers';

export default function News () {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const getStories = async () => {
    setLoading(true);
    Api.getAllStories()
      .then(data => {
        if (data.includes('err: ')) {
          setError(data);
          setLoading(false);
        } else {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch(err => {})
  }

  useEffect(() => {
    const gs = async () => {
      setLoading(true);
      Api.getAllStories()
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      })
    }
    gs()
  }, [])

  return (
    <>
      <Header
        title="HackerNews"
        loading={loading}
        onIconPress={getStories}
      />
      
      <ScrollView style={styles.container}>
        <PostList posts={posts} />
        <Buttons 
          currentPage={1} 
          disabled={posts.length === 0} 
        />
      </ScrollView>

      {error.length > 0 && (
        <View style={{ backgroundColor: 'blue'}}>
          <Text style={{color: 'white'}}>
            error: {error}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
});