import React, {
  useEffect,
  useState, } from 'react';
import { View, Text } from 'react-native';
import {
  Header,
  PostList, } from './src/components';
import { Api } from './src/helpers';


export default function App () {

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
      <PostList posts={posts} />

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
