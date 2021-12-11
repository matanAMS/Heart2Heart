import React , {useEffect,useState,useCallback} from "react";
import { View, StyleSheet, Image, Dimensions,FlatList, Alert,Text,TouchableOpacity,StatusBar,
  TextInput,
  Platform, } from "react-native";
import {PostText} from '../styles/feedStyles';
import { useFocusEffect } from '@react-navigation/native';
import { MaterialCommunityIcons,AntDesign  } from "@expo/vector-icons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { deleteAmuta } from "./../api/userController";


  const ifAmutaScreen = ({ navigation,route }) => {
const [amutot,setAmutot] = useState(null)
const [user,setUser] = useState(null)
   const loadAmutot = async () =>{
    let res = await fetch("http://proj4.ruppin-tech.co.il/GetAllAmutotForAdmin")
    let data = await res.json();
    setAmutot(data) //יישום העמותות במערך
     console.log("data ",data)
     console.log("amutot ",amutot)
    }
  useFocusEffect(
    useCallback( () => {
     
      loadAmutot(); //fetch func for Get all users from db
      
      return () => {
       
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );


   const approveAmuta = async (amuta) =>
   { //Update Amuta Display

    
    fetch("http://proj4.ruppin-tech.co.il/UpdateAmutaDisplay", {
      method: "POST",
      body: JSON.stringify(amuta),
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
          
          if (result) navigation.navigate("AdminScreen");
          else {
            Alert.alert("אופס, הוכנסו פרטים שגויים, אנא נסה שוב");
          }
        },
        (error) => {
          console.log("error Post= ", error);
        }
      );

   }
const removeItemFromList = (id)=>{
let filtered = amutot.filter(amuta=> amuta.amutaID != id)
deleteAmuta(id);
setAmutot(filtered);

}

   return(
      <View style={styles.container}>
                   <FlatList 
                    style={styles.feed}
                    data={amutot}
                    renderItem={ ({ item }) => (
          
                <View
                style={{
                 flexDirection: 'row',
                  padding: 16,
                  alignItems: 'center'
        }}>
        <Image 
          source={{uri: item.amutaImage ? item.amutaImage : null}}style={styles.avatar}/>
        
        <PostText>
        {item.amutaName} {"   "}  {item.amutaHP}
        </PostText>
         <AntDesign name="check" size={24} color="black"
            style={styles.icon}
            onPress={() =>
              Alert.alert(`🚨`, `לאשר עמותה זו?`, [
                {
                  text: "לא",
                  style: "cancel",
                },
                {
                  text: "כן",
                  onPress: () => {
                  approveAmuta(item);
                  },
                },
              ])
            }
          />
           <AntDesign name="delete" size={24} color="black"
            style={styles.icon2}
            onPress={() =>
              Alert.alert(`🚨`, `תרצה למחוק עמותה זו?`, [
                {
                  text: "לא",
                  style: "cancel",
                },

                {
                  text: "כן",
                  onPress: () => {
                 removeItemFromList(item.amutaID);
                  },
                },
              ])
            }
          />
      </View>
   
  )}
                    keyExtractor={(item) => item.amutaID}                 
                    showsVerticalScrollIndicator={false}

                   
            > </FlatList>
      </View>
   )
  }
  export default ifAmutaScreen;


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