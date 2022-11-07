
import React from 'react';
import { FlatList, View, ActivityIndicator, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Post from '../../components/post';
import styles from './styles';
import firebase from '../../services/firebase';
import elements from '../../assets/js/elements';


export default function Home() {

  const user = elements.find(user => user.id === 1);
  const [posts, setPosts] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [text, setText] = React.useState('');


  React.useEffect(() => {
    getPosts();
    setLoading(false);
  }, []);



  const renderFooter = () => {
    return (
      <View style={{marginVertical: 10}}>
        <ActivityIndicator />
      </View>
    );
  }

  const getPosts = async () => {
    const posts = await firebase.getPosts();
    setPosts(posts);
  }

  const createPost = async () => {
    const post = await firebase.createPost(text);
    setPosts([post, ...posts]);
  }


  const renderHeader = () => {
    return (
      <View  style={{backgroundColor: 'white',  flexDirection: 'row', padding: 10, borderBottomWidth: 1, borderBottomColor: '#DDD', paddingBottom: 25}}>
        <Image source={{uri: user.user.avatar}} style={{width: 60, height: 60, borderRadius: 100}}/>
        <View style={{marginHorizontal: 10, width: 285}}>
          <View style={{flexDirection: 'row', marginBottom: 5, alignItems: 'center'}}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>{user.user.name}</Text>
            <Text style={{fontSize: 16, color: 'gray', marginLeft: 3}}>@{user.user.username}</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <TextInput 
            multiline={true}
            onChange={setText} 
            value={text} 
            style={{height: 50, width: '90%', borderRadius: 20, paddingTop: 5, paddingBottom: 5, paddingLeft: 10, paddingRight: 10, borderColor: '#DDD', borderWidth: 1}}
            placeholder="What's in your mind?"/>
          <TouchableOpacity style={{marginLeft: 5}} disabled={!text}  onPress={() => createPost()}>
            <MaterialIcons name="send" size={24}  style={{marginLeft: 3}} color={text ? 'blue' : 'rgba(0,0,255,0.5)'} />
          </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (<Post {...item}  />)}
        // onEndReached={loadMore}
        // onEndReachedThreshold={0.5}
        refreshing={loading}
        ListHeaderComponent={renderHeader}
        ListFooterComponent={renderFooter}
        onRefresh={getPosts}
      />
    </View>
  );
}