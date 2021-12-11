import React , {useEffect,useState} from "react";
import { View, StyleSheet, Image, Dimensions, Alert,Text,TouchableOpacity,StatusBar,
  TextInput,
  Platform, } from "react-native";
import { updateUser } from "./../api/userController";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from 'expo-image-picker'

const EditUserDetails = ({ navigation,route }) => {
const [userName,setUserName] = useState(null)
const [email,setEmail] = useState(null)
const [password,setPassword] = useState(null)
const [userType,setUserType] = useState(null)
const [image,setImage] = useState("")
const [userId,setUserId] = useState(null)

useEffect(() => {
    const listener = navigation.addListener('focus' , async () => {
    let user = route.params.item
    console.log('USER IN ADMIN SCREEN ', user)
    setUserName(user.userName)
    setEmail(user.email)
    setPassword(user.password)
    setUserType(user.userType)
    setImage(user.userImage)
    setUserId(user.userId)
    });
    return listener;
    
})

const handlePickAvatar=async()=>{
       // UserPermissions.getPhotoPermissions()
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3]
        })
        if(!result.cancelled){
            console.log(result.uri)
            setImage(result.uri);
        }
    }

const btnUpdateUser = async () => {
  let userToUpdate = {
    
    Email: email,
    Password: password,
    UserName: userName,
    userType : userType,
    userID: userId,
    userImage:image,
    
  }
  console.log('user to update ',userToUpdate)
  const returnedUser = await updateUser(userToUpdate);
  console.log(returnedUser)
    if (returnedUser !== null) {
      Alert.alert( "העדכון בוצע בהצלחה");
      navigation.navigate('AdminEditUsers');
    }
    if (returnedUser === null) Alert.alert("תקלה");
  
}


return(
    <View style={styles.container}>
      <StatusBar backgroundColor="#F08080" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>עדכון פרטי משתמש</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text_footer, { marginTop: 20 }]}>אימייל</Text>
        <View style={styles.action}>
          <Feather name="mail" color="#05375a" size={20} />
          <TextInput
            value={email}
            placeholder="אימייל"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={setEmail}
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>
        <Text style={[styles.text_footer, { marginTop: 20 }]}>סיסמה</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={password}
            placeholder="סיסמה"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={setPassword}
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>סוג משתמש</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={userType}
            placeholder="סוג משתמש"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={setUserType}
              
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>
         <View style={styles.action}>
         <TouchableOpacity style={styles.avatarPlaceholder}onPress={()=>handlePickAvatar()}>
                <Image source={{uri:image}} style={styles.avatar}/>
                <Feather name="plus" size={32} color="#FFF" style={{marginTop:6,marginLeft:2}}/>
                 <Text
            style={[
              styles.textSign,
              {
                color: "#009387",
              },
            ]}
          >
            בחר תמונה          </Text>
            </TouchableOpacity>
            </View>


        <TouchableOpacity
          onPress={() => btnUpdateUser()}
          style={[
            styles.signIn,
            {
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
          
        >
        <Text> בצע עריכה </Text>
        </TouchableOpacity>
           </View>
           </View>

  );
};

export default EditUserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F08080",
  },
  header: {
    flex: 1,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    textAlign: "right",
  },
  actionError: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FF0000",
    paddingBottom: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 0 : -12,
    paddingLeft: 10,
    color: "#05375a",
    textAlign: "right",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

