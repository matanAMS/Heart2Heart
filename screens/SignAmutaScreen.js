import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Button,
  StyleSheet,
  StatusBar,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignAmutaScreen = ({ navigation }) => {
  const [amuta, setAmuta] = React.useState({
   amutaName:"",
   amutaNumber: "",
   amutaImage:"",
   amutaDescription:"",
   amutaAddress:"",
   check_textInputChange: false,
  });
const [userType,setUserType] = React.useState(null);

const textInputChange = (val) => {
// if(amutaName>3 || amutaNumber>3||amutaDescription>3)
setAmuta(val);
// else
// setAmuta({val,check_textInputChange: false });

}
const [user, setUser] = React.useState(null);
//pull the user data for using props of it/////////////////////////
 
 const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('user')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log('Error',e);
  }
}
useEffect(async () => {
  
  let user = await getData();
  console.log('user:',user);
  setUser(user);
  
 
},[])
//check amuta number with api of amutot
//

  const btnRegisterAmuta = async () => {

    
    let user = await getData();
    console.log('user is:' +user)
    const _amuta = {
      
      amutaName: amuta.amutaName,
      amutaHP: amuta.amutaNumber,
      amutaImage: amuta.amutaImage,
      description: 'amuta.amutaDescription',
      address:' amuta.amutaAddress',
      userID: user.userId,
      display: 0, //when display 0 - admin see and can change display to accept amuta//
    };
 
   
    console.log(_amuta);
     fetch("http://proj4.ruppin-tech.co.il/InsertNewAmuta", {
      method: "POST",
      body: JSON.stringify(_amuta),
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
          console.log("Post => ", JSON.stringify(result));
          setUserType(1);
          if (result) navigation.navigate("PostScreenUsers");
          else {
            Alert.alert("אופס, הוכנסו פרטים שגויים, אנא נסה שוב");
          }
        },
        (error) => {
          console.log("error Post= ", error);
        }
      );
  };


 const updateUserType = async () => { //updating user type after sign as Amuta
    let user = await getData();
    console.log('user is:' +user)
    const _user = {
    userId: user.userId,
    userName: user.userName,
    password: user.password,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    userImage: user.userImage,
    gender:user.gender,
    userType: 1,
    description: user.description,
    };
    console.log(_user);
     fetch("http://proj4.ruppin-tech.co.il/UpdateUser", {
      method: "POST",
      body: JSON.stringify(_user),
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
          console.log("Post => ", JSON.stringify(result));
          setUserType(1);
          if (result) navigation.navigate("PostScreenUsers");
          else {
            Alert.alert("אופס, הוכנסו פרטים שגויים, אנא נסה שוב");
          }
        },
        (error) => {
          console.log("error Post= ", error);
        }
      );
  };


return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#F08080" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.text_header}>הרשמת עמותות</Text>
      </View>
      <View style={styles.footer}>
        <Text style={[styles.text_footer, { marginTop: 20 }]}>שם עמותה</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={amuta.amutaName}
            placeholder="שם עמותה"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(txt) =>
                setAmuta({ ...amuta, amutaName: txt})}
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>
        <Text style={[styles.text_footer, { marginTop: 20 }]}>מספר עמותה</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={amuta.amutaNumber}
            placeholder="מספר עמותה"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(txt) =>
                setAmuta({ ...amuta, amutaNumber: txt})}
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>תמונת עמותה</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={amuta.amutaImage}
            placeholder="בחר תמונה"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(txt) =>
                setAmuta({ ...amuta })
              }
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>
        <TouchableOpacity
          onPress={() =>btnRegisterAmuta()}
          style={[
            styles.signIn,
            {
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
          
        >
        <Text> הירשם </Text>
        </TouchableOpacity>
           </View>
           </View>

  );
};

export default SignAmutaScreen;

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
