import React, {
  useEffect,
  useState,
  useRef } from 'react';
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

const reduceArray = (array, index) => {
  let retArray = [];
  for (let i = 0; i < array.length; i++) {
    if (i >= index * 20 && i < index * 20 + 20) {
      retArray.push(array[i]);
    } else {
      continue;
    }
  }
  return retArray;
}

export default function News () {
  const scrollRef = useRef(null);
  const [posts, setPosts] = useState([]);
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const [pageIndex, setPageIndex] = useState(0);
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

  // fetch on first mount
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
    gs();
  }, [])

  // effect that set 20 posts from allPosts
  useEffect(() => {
    setCurrentPagePosts(reduceArray(posts, pageIndex));
    setTimeout(() => scrollRef?.current && scrollRef.current.scrollTo({ x: 0, y: 0, animated: true}), 100) 
  }, [posts, pageIndex])

  prevPressHandler = () => {
    if (pageIndex > 0) {      
      setPageIndex(pageIndex - 1);
    }
  }

  morePressHandler = () => {
    if (pageIndex < 10) {      
      setPageIndex(pageIndex + 1);
    }
  }

  return (
    <>
      <Header
        title="HackerNews"
        loading={loading}
        onIconPress={getStories}
      />
      
      <ScrollView ref={scrollRef} style={styles.container}>
        <PostList posts={currentPagePosts} />
        <Buttons 
          currentPage={pageIndex + 1} 
          disabled={posts.length === 0}
          onPrevPress={prevPressHandler}
          onMorePress={morePressHandler}
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