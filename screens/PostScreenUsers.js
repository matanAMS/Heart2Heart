import React, { useState , useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  FlatList,
  TouchableOpacity,
  Button,
  Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PostCard from '../Components/PostCard';
import AddPostScreen from './AddPostScreen';
import Tabs from '../navigation/tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useFocusEffect } from '@react-navigation/native';
import { DeletePost } from "./../api/postController";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeAsyncStorageData} from '../utils/storage';


const PostScreenUsers = ({navigation}) => {
const [renderScreen, setrenderScreen] = useState(false);
const [modalVisible, setModalVisible] = useState(false);//בשביל

const [posts, setPosts] = useState([])
const [user, setUser] = useState(null);
const [loadAgain, setLoadAgain] = useState(false);

//משיכת פוסטים שנוצרו וקיימים בדאטה בייס
    const loadPosts = async () =>{
    let res = await fetch("http://proj4.ruppin-tech.co.il/GetAllPosts")
    let data = await res.json();
    
    setPosts(data) //יישום הפוסטים במערך
console.log("posts", posts)
    }

const getUser = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log('Error',e);
  }
}
useEffect(async () => {
  
  let user = await getUser();
  console.log('user in useEffect:',user);
  setUser(user);
},[])


//after delete post remove him 
const removeItemFromList = (id)=>{
let filtered = posts.filter(post=> post.postId != id)
setPosts(filtered);
}


//useEffect for load posts and user details
useFocusEffect(
    useCallback( () => {
       let user=  getUser(); //get connected user details
      loadPosts(); //fetch func for Get all posts from db
      
      return () => {
       
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


    return(
    <View style={styles.container}>
   
      
                <FlatList
                    style={styles.feed}
                    data={posts}
                    renderItem={({ item }) => <PostCard post={item} DeletePost={DeletePost}
                     reload={()=> {removeItemFromList(item.postId)}}
                      user={user}/>}
                    keyExtractor={item => item.postId}
                    
                    showsVerticalScrollIndicator={false}
                ></FlatList>
            </View>
    )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  header: {
    paddingBottom: 16,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#EBECF4",
    shadowColor: "#454D65",
    shadowOffset: { height: 5 },
    shadowRadius: 15,
    shadowOpacity: 0.2,
    zIndex: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  feed: {
    marginHorizontal: 16,
  },
  feedItem: {
    backgroundColor: "#FFF",
    borderRadius: 5,
    padding: 8,
    flexDirection: "row",
    marginVertical: 8,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },
  name: {
    fontSize: 15,
    fontWeight: "500",
    color: "#454D65",
  },
  timestamp: {
    fontSize: 11,
    color: "#C4C6CE",
    marginTop: 4,
  },
  post: {
    marginTop: 16,
    fontSize: 14,
    color: "#838899",
  },
  postImage: {
    width: undefined,
    height: 150,
    borderRadius: 5,
    marginVertical: 16,
  },






  modalView: {
        justifyContent: 'space-between',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        marginTop: '50%',
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    openButton: {
        backgroundColor: '#F194FF',
        borderRadius: 10,
        padding: 10,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    modalText: {
        marginBottom: 15,
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontWeight: 'bold', fontSize: 17, color: "#9A7759"
    },

});
  

export default PostScreenUsers;

