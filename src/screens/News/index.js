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
  const [pageFlipped, setPageFlipped] = useState(false);

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
          setError('');
        }
      })
      .catch(err => {
        setLoading(false);
        setError(err.toString())
      })
  }

  // fetch on first mount
  useEffect(() => {
    const gs = async () => {
      setLoading(true);
      Api.getAllStories()
      .then(data => {
        setPosts(data);
        setLoading(false);
        setError('');
      })
      .catch(err => {
        setLoading(false);
        setError(err.toString())
      })
    }
    gs();
    let interval = setInterval(() => gs(), 30000);

    return () => {
      clearInterval(interval);
    }
  }, [])


  // effect that set 20 posts from allPosts
  useEffect(() => {
    setCurrentPagePosts(reduceArray(posts, pageIndex));
    if (pageFlipped) {
      setTimeout(() => scrollRef?.current && scrollRef.current.scrollTo({ x: 0, y: 0, animated: true}), 100)
      setPageFlipped(false);
    }
  }, [posts, pageIndex, pageFlipped])

  prevPressHandler = () => {
    if (pageIndex > 0) {      
      setPageIndex(pageIndex - 1);
      setPageFlipped(true);
    }
  }

  morePressHandler = () => {
    if (pageIndex < 10) {      
      setPageIndex(pageIndex + 1);
      setPageFlipped(true);      
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
        <View style={{ backgroundColor: 'red'}}>
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