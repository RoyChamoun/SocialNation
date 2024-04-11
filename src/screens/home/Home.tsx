import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios, {AxiosError} from 'axios';
import LinearGradient from 'react-native-linear-gradient';
import {homeStyles} from './HomeStyle';

interface Post {
  id: string;
  photo: string;
  caption: string;
  date: string;
  username: string;
  image: string;
  liked: boolean;
  firstName: string;
  lastName: string;
}

const Home: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 4;

  const fetchPosts = useCallback(async () => {
    setRefreshing(true);
    try {
      const response = await axios.get<Post[]>(
        `https://660ffae70640280f219c0325.mockapi.io/post?page=${page}&limit=${pageSize}`,
      );
      const postsWithLikeStatus = response.data.map(post => ({
        ...post,
        liked: false,
      }));
      setPosts(prevPosts =>
        page === 1
          ? postsWithLikeStatus
          : [...prevPosts, ...postsWithLikeStatus],
      );
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error('Error fetching posts:', axiosError.message);
    }
    setRefreshing(false);
  }, [page]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleRefresh = useCallback(() => {
    setPage(1);
    fetchPosts();
  }, [fetchPosts]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const toggleLikePost = (id: string) => {
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id ? {...post, liked: !post.liked} : post,
      ),
    );
  };

  const getRelativeTime = useMemo(
    () => (dateString: string) => {
      const postDate = new Date(dateString);
      const now = new Date();
      const difference = now.getTime() - postDate.getTime();
      const minutes = Math.floor(difference / 60000);
      const hours = Math.floor(difference / (60 * 60 * 1000));

      if (minutes < 60) {
        return `${minutes} min ago`;
      } else if (hours < 24) {
        return `${hours} hr ago`;
      } else {
        return `${postDate.getDate()}/${
          postDate.getMonth() + 1
        }/${postDate.getFullYear()}`;
      }
    },
    [],
  );

  return (
    <LinearGradient
      colors={['#4c669f', '#3b5998', '#192f6a']}
      style={homeStyles.container}>
      <FlatList<Post>
        data={posts}
        keyExtractor={(item, index) => item.id + index}
        renderItem={({item}) => (
          <View style={homeStyles.postContainer}>
            <Image source={{uri: item.image}} style={{width: 30, height: 30}} />
            <Text style={homeStyles.username}>{item.username}</Text>
            <Image source={{uri: item.photo}} style={homeStyles.image} />
            <Text style={homeStyles.caption}>{item.caption}</Text>
            <View style={homeStyles.actionContainer}>
              <TouchableOpacity onPress={() => toggleLikePost(item.id)}>
                <Image
                  source={
                    item.liked
                      ? require('../../assets/Like.png')
                      : require('../../assets/UnLike.png')
                  }
                  style={homeStyles.likeIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={homeStyles.date}>{getRelativeTime(item.date)}</Text>
          </View>
        )}
        ListEmptyComponent={() => (
          <View style={homeStyles.emptyContainer}>
            <Text style={homeStyles.emptyText}>No posts yet</Text>
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

export default Home;
