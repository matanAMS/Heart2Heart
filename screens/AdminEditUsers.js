import React, { useState,useEffect,useCallback } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Platform,Button,ActivityIndicator,Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,FlatList
} from "react-native";
import * as Animatable from "react-native-animatable";
import { MaterialCommunityIcons,AntDesign  } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {  getAllUsers, GetUserById, updateUser } from "./../api/userController";
import { useFocusEffect } from '@react-navigation/native';
import {PostText} from '../styles/feedStyles';
import { deleteUser,UpdateUser } from "./../api/userController";

const AdminEditUsers = ({ navigation, route}) => {
const [users, setUsers] = useState(null);
const [loading,setLoading] = useState(false);

const fetchAllUsers = async () => {
    const allUsers = await getAllUsers();
    if (allUsers){ 
      setLoading(true);
      setUsers(allUsers);}
    console.log('all Users: ', allUsers)
     
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
  setUsers(user);
},[])

const removeItemFromList = (id)=>{
let filtered = users.filter(user=> user.userId != id)
deleteUser(id);
setUsers(filtered);

}
useFocusEffect(
    useCallback( () => {
       let user=  getUser(); //get connected user details
      fetchAllUsers(); //fetch func for Get all users from db
      
      return () => {
       
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

const renderSeparator = () => {
  return (
    <View
      style={{
        height: 1,
        width: '86%',
        backgroundColor: '#CED0CE',
        marginLeft: '5%'
      }}
    />
  )
}
const renderFooter = () => {
  if (!loading) return null;
 return (
    <View
      style={{
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: '#CED0CE'
      }}>
      <ActivityIndicator animating size='large' />
    </View>
  )
}

return(
<View style={styles.container}>
                   <FlatList 
                    style={styles.feed}
                    data={users}
                    renderItem={ ({ item }) => (
          
                <View
                style={{
                 flexDirection: 'row',
                  padding: 16,
                  alignItems: 'center'
        }}>
        <Image 
          source={{uri: item.userImage ? item.userImage : null}}style={styles.avatar}/>
        
        <PostText>
        {item.userName}
        </PostText>
         <AntDesign name="deleteuser" size={24} color="black"
            style={styles.icon}
            onPress={() =>
              Alert.alert(`🚨`, `תרצה להסיר משתמש זה?`, [
                {
                  text: "לא",
                  style: "cancel",
                },
                {
                  text: "כן",
                  onPress: () => {
                  removeItemFromList(item.userId);
                  },
                },
              ])
            }
          />
           <AntDesign name="edit" size={24} color="black"
            style={styles.icon2}
            onPress={() =>
              Alert.alert(`🚨`, `תרצה לערוך משתמש זה?`, [
                {
                  text: "לא",
                  style: "cancel",
                },

                {
                  text: "כן",
                  onPress: () => {
                  navigation.navigate('EditUserDetails', {item})
                  },
                },
              ])
            }
          />
      </View>
   
  )}
                    keyExtractor={(item) => item.userId}                 
                    showsVerticalScrollIndicator={false}

                    ItemSeparatorComponent={renderSeparator}
                   ListFooterComponent={renderFooter}
            > </FlatList>
      </View>
    
       
      );
 };



export default AdminEditUsers;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBECF4",
  },
  feed: {
    marginHorizontal: 16,
  },
    avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 16,
  },

    icon: {
    position: "absolute",
    right: 3,
  },
     icon2: {
    position: "absolute",
    right: 40,
  },
})