import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import styles from './EditStyles';

interface Post {
  id: string;
  photo: string;
  caption: string;
  date: string;
  username: string;
}

const Edit: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 4; 
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = useCallback(async () => {
    if (!hasMore) return;

    setRefreshing(true);
    try {
      const response = await axios.get<Post[]>(
        `https://660ffae70640280f219c0325.mockapi.io/post?page=${page}&limit=${pageSize}`,
      );
      setPosts(prevPosts =>
        page === 1 ? response.data : [...prevPosts, ...response.data],
      );
      setHasMore(response.data.length === pageSize);
    } catch (error) {
      Alert.alert('Error', 'Failed to fetch posts');
    } finally {
      setRefreshing(false);
    }
  }, [page, hasMore]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = () => {
    setPage(1);
    setHasMore(true);
  };

  const handleLoadMore = () => {
    if (hasMore) {
      setPage(prevPage => prevPage + 1);
    }
  };

  const handleDelete = (id: string) => {
    Alert.alert('Delete Post', 'Are you sure you want to delete this post?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete',
        style: 'destructive',
        onPress: async () => {
          try {
            await axios.delete(
              `https://660ffae70640280f219c0325.mockapi.io/post/${id}`,
            );
            setPosts(currentPosts =>
              currentPosts.filter(post => post.id !== id),
            );
          } catch (error) {
            Alert.alert('Error', 'Failed to delete the post');
          }
        },
      },
    ]);
  };

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={item => item.id}
        renderItem={({item}) => (
          <View style={styles.postContainer}>
            <Text style={styles.username}>{item.username}</Text>
            <Image source={{uri: item.photo}} style={styles.image} />
            <Text style={styles.caption}>{item.caption}</Text>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => handleDelete(item.id)}>
              <Text style={styles.deleteButtonText}>Delete</Text>
            </TouchableOpacity>
          </View>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.5}
      />
    </LinearGradient>
  );
};

export default Edit;
