import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  Button,
  StyleSheet,
  StatusBar,
  Image,
  Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import * as ImagePicker from 'expo-image-picker'
import {Ionicons} from '@expo/vector-icons'

  const pickerItems = [
  { label: "נקבה", value: "f" },
  { label: "זכר", value: "m" },
];
const SignUpScreen = ({ navigation }) => {
  const [data, setData] = React.useState({
    userName: "",
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirm_password: "",
    city:"",
    userImage: null,
    gender: pickerItems[0].value,
    description: "",
    userType: 2,
    check_textInputChange: false,
    secureTextEntry: true,
    confirm_secureTextEntry: true,
  });


  const [cities, setCities] = React.useState([])
  const [pickerSelected, setPickerSelected] = React.useState(pickerItems[0]);
  const [password, setPassword] = React.useState("");
  const [confirm_password, setConfirmPassword] = React.useState("");

  

const isEmail = (email) => {
  const regEx = /^[a-zA-Z0-9._$!%^]{3,}@{1}[a-zA-Z]{2,20}[.]{1,}[a-zA-Z]{2,10}$/;
  return email.match(regEx);
};

  const textInputChange = (val) => {
    var emailValid =
      /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;
    if (emailValid.test(val)) {
      setData({ ...data, email: val, check_textInputChange: true });
    } else {
      setData({ ...data, email: val, check_textInputChange: false });
    }
  };

  const handlePasswordChange = (val) => {
    if (val.length >= 6)
      setData({
        ...data,
        password: val,
      });
  };

const handleCityChange = (val) => {
   setData({
        ...data,
        city: val,
      });
  };

  const handleConfirmPasswordChange = (val) => {
    setData({
      ...data,
      confirm_password: val,
    });
  };

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  const updateConfirmSecureTextEntry = () => {
    setData({
      ...data,
      confirm_secureTextEntry: !data.confirm_secureTextEntry,
    });
  };
 

    const handlePickAvatar=async()=>{
       // UserPermissions.getPhotoPermissions()
        let result=await ImagePicker.launchImageLibraryAsync({
            mediaTypes:ImagePicker.MediaTypeOptions.Images,
            allowsEditing:true,
            aspect:[4,3]
        })
        if(!result.cancelled){
            console.log(result.uri)
            setData({ ...data, userImage: result.uri });
        }
    }

  const LoadCities = async () => {
     let response = await fetch(
      `https://data.gov.il/api/3/action/datastore_search?resource_id=1bf27e56-364c-4b61-8b6b-efa9933da677&q=${data.city}`
    );
    let data = await response.json();
    setCities(data.ersult.records)
  }

  const btnRegister = async () => {
  const _handleRegister = async () => {
    if (
      data.password.trim() === "" ||
      data.email.trim() === "" ||
      data.firstName.trim() === "" ||
      data.lastName.trim() === ""
    ) {

      alert("✋", "שם דוא'ל או סיסמא ריקים");
      return;
    }
  };
  if(password!=confirm_password)
  {
  alert('סיסמא לא תקינה');
  return;
  }
   if (!isEmail(data.email)) {
      alert("כתובת דוא'ל לא תקינה ✋⚠️");
      return;}
    const _user = {
    userName: data.userName,
    password: password,
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    userImage: data.userImage,
    gender:data.gender,
    userType: 2,
    description: data.description,
    };
    console.log(_user.email)
    

    console.log(_user);
    fetch("http://proj4.ruppin-tech.co.il/InsertNewUser", {
      method: "POST",
      body: JSON.stringify(_user),
      headers: new Headers({
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      }),
    })
      .then(res =>{
         return res.json()
     }).then((result)=>{
         console.log("POST => ", JSON.stringify(result))
        
         if(result.status==200 || result.status==201||result)
         {   
          alert('נרשם בהצלחה')
          navigation.navigate("SignInScreen")
         }
         else
          alert("אופס, הוכנסו פרטים שגויים, אנא נסה שוב")
 
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
        <Text style={styles.text_header}>הירשם עכשיו</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>אימייל</Text>
        <View style={styles.action}>
          <FontAwesome name="user-o" color="#05375a" size={20} />
          <TextInput
            placeholder="האימייל שלך"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
          {data.check_textInputChange ? (
            <Animatable.View animation="bounceIn">
              <Feather name="check-circle" color="green" size={20} />
            </Animatable.View>
          ) : null}
        </View>
        <Text style={[styles.text_footer, { marginTop: 20 }]}>שם פרטי</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={data.firstName}
            placeholder="שם פרטי"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(txt) =>
                setData({ ...data, firstName: txt, userName: txt + " " + data.lastName })}
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>


        <Text style={[styles.text_footer, { marginTop: 20 }]}>שם משפחה</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={data.lastName}
            placeholder="שם משפחה"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(txt) =>
                setData({ ...data, lastName: txt, userName: data.firstName + " " + txt })
              }
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>

        <Text style={[styles.text_footer, { marginTop: 20 }]}>בחר עיר</Text>
        <View style={styles.action}>
          <Feather name="user" color="#05375a" size={20} />
          <TextInput
            value={data.city}
            placeholder="עיר"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(txt) =>
                setData({ ...data, city: txt })}
          />
          <Feather name="eye-off" color="grey" size={20} />
          <Text>{JSON.stringify(cities)}</Text>
        </View>


        <Text style={[styles.text_footer, { marginTop: 20 }]}>סיסמה</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="הסיסמה שלך"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={setPassword}
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>
        <Text style={[styles.text_footer, { marginTop: 20 }]}>אשר סיסמה</Text>
        <View style={styles.action}>
          <Feather name="lock" color="#05375a" size={20} />
          <TextInput
            placeholder="אשר את הסיסמה"
            secureTextEntry={data.confirm_secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={setConfirmPassword}
          />
          <Feather name="eye-off" color="grey" size={20} />
        </View>
          <TouchableOpacity style={styles.avatarPlaceholder}onPress={()=>handlePickAvatar()}>
                <Image source={{uri:data.userImage}} style={styles.avatar}/>
                <Ionicons name="ios-add" size={32} color="#FFF" style={{marginTop:6,marginLeft:2}}/>
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
          


        <TouchableOpacity
          onPress={() => btnRegister()}
          style={[
            styles.signIn,
            {
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#009387",
              },
            ]}
          >
            הירשם עכשיו
          </Text>
        </TouchableOpacity>

       

        <TouchableOpacity
          onPress={() => navigation.navigate("SignInScreen")}
          style={[
            styles.signIn,
            {
              borderColor: "#009387",
              borderWidth: 1,
              marginTop: 15,
            },
          ]}
        >
          <Text
            style={[
              styles.textSign,
              {
                color: "#009387",
              },
            ]}
          >
            משתמש רשום? התחבר עכשיו
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F08080",
  },
  header: {
    flex: 0.6,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 10,
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
