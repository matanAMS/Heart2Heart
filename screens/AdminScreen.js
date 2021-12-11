import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Button,
  StyleSheet,
  FlatList,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DeletePost,getAllPosts,GetPostById } from "./../api/postController";
import {  getAllUsers, GetUserById, updateUser } from "./../api/userController";
import PostCardAdmin from '../Components/PostCardAdmin';

const AdminScreen = ({ navigation }) => {
 const [posts,setPosts] = useState([]);
 const [users,setUsers] = useState([]);



const editUsers = () => {
  navigation.navigate('AdminEditUsers')
}

return(
  <View style={styles.container}>


         <Button title='ערוך משתמשים' onPress={editUsers} > </Button>
           <Button title='עמותות לאישור' onPress={() => navigation.navigate('IfAmutaScreen')}> </Button>

                </View>
)
  };


  export default AdminScreen;

  const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
   });