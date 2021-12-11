import React, { useState,useEffect } from 'react';
import {View,Text,Button,StyleSheet, TouchableOpacity,Image} from 'react-native';
import {InputField,InputWrapper,SubmitBtn,SubmitBtnText} from '../styles/AddPost';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import * as ImagePicker from 'expo-image-picker';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from "moment";


const AddPostScreen = ({navigation}) => {


const [user, setUser] = React.useState(null);
const [desc, setDesc] = useState("");
const [image, setImage] = useState(null);
const [post, setPost] = useState(null);
const [render, setRender] = useState(false);


  //expo
////////////////////////////////////////////////////////////////
//handle image upload and taking photo than save it on server
  const pickImage = async () => {
    console.log('choose image from libary')
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };
  const takePhoto = async () => {
    console.log('hello')
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      console.log('ron result', result)
      setImage(result.uri);
      setRender(true);
      console.log('ron ', render)
    }

    
  };
 //pull the user data for using props of it/////////////////////////
 
 const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user') //get user connected data
    return jsonValue != null ? JSON.parse(jsonValue) : null; 
  } catch(e) {
    console.log('Error',e);
  }
}
useEffect(async () => {
  
  let user = await getData(); //call get user data and set it on user object
  console.log('user:',user);
  setUser(user);
  
 
},[])

useEffect( () => {
setRender(false);
},[render])
////////////////////////////////////////////////////////////////
const submitPost = async () => {
  // if (post.trim() === "") {
  //     Alert.alert(" ✋ 📢 ", "גוף הפוסט ריק");
  //     return;
  // }
   let user = await getData();
   
    let post = {
      UserId: user.userId,
      Description: desc,
      PostImage:image,
      UploadDate: moment(new Date()).format("YYYY-MM-DD"),
      User_Name: user.firstName +" "+ user.lastName,
     

    }
    console.log('image:', image)
    console.log('Post: ', post);
    fetch("http://proj4.ruppin-tech.co.il/InsertNewPost", {
      method: "POST",
      body: JSON.stringify(post),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          
         if(result)
         {   
           console.log("Post => ", JSON.stringify(result));
           navigation.push("PostScreenUsers")
         }
          
          else {
            Alert.alert("אופס, הוכנסו פרטים שגויים, אנא נסה שוב");
          }
        },
        (error) => {
          console.log("error Post= ", error);
        }
      );
    
    }



    return(
        <View style={styles.container}>
         
        <InputWrapper>
        <InputField
        placeholder="מה תרצה לתרום?"
        multiline
        numberOflines={4}
        onChangeText={value => setDesc(value)}
        />
        <Image source={
           {uri:image}}/>
        <SubmitBtn onPress={submitPost}>
            <SubmitBtnText>פרסם</SubmitBtnText>
           
          </SubmitBtn>
         </InputWrapper>
             <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
           onPress={takePhoto}
        >
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={pickImage}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      
        </View>
    );
};

export default AddPostScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    actionButtonIcon:{
      fontSize:20,
      height:22,
      color: 'white',
    },
});