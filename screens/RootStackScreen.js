import React from 'react';
import {Text,StyleSheet,View,Image} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SplashScreen from './SplashScreen';
import SignInScreen from './SignInScreen';
import SignUpScreen from './SignUpScreen';
import Regions from './Regions';
import PostScreenAmuta from './PostScreenAmuta';
import PostScreenUsers from './PostScreenUsers';
import AddPostScreen from './AddPostScreen';
import SearchScreen from './SearchScreen';
import MessagesScreen from './MessagesScreen';
import SignAmutaScreen from './SignAmutaScreen';
import ProfileScreen from './ProfileScreen';
import EditProfile from './EditProfile';
import AdminScreen from './AdminScreen';
import AdminEditUsers from './AdminEditUsers';
import EditUserDetails from './EditUserDetails';
import IfAmutaScreen from './IfAmutaScreen';


const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => (
    <RootStack.Navigator headerMode='none'>
        <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
        <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
        <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        <RootStack.Screen name="Regions" component={Regions}/>
          <RootStack.Screen name="SignAmutaScreen" component={SignAmutaScreen}/>
             <RootStack.Screen name="PostScreenUsers" component={Tabs}/>
             <RootStack.Screen name="AddPostScreen" component={Tabs}/>
              <RootStack.Screen name="PostScreenAmuta" component={PostScreenAmuta}/>
              <RootStack.Screen name="EditProfile" component={EditProfile}/>
               <RootStack.Screen name="AdminScreen" component={AdminScreen}/>
               <RootStack.Screen name="AdminEditUsers" component={AdminEditUsers}/>
               <RootStack.Screen name="EditUserDetails" component={EditUserDetails}/>
        <RootStack.Screen name="IfAmutaScreen" component={IfAmutaScreen}/>
               
             {/* <RootStack.Screen name="MessagesScreen" component={Tabs}/>
             <RootStack.Screen name="SearchScreen" component={Tabs}/> */}
             
               
    </RootStack.Navigator>
);
const Tab = createBottomTabNavigator();

const Tabs = () => {
    return(
        <Tab.Navigator headerMode='none'
        screenOptions={{ 
            showLabel: false,
            
            style:{
           position: 'absolute',
         bottom: 25,
        left: 20,
        right: 20,
     elevation:0,
      backgroundColor: 'black',
    borderRadius:15,
      height:90,
    ...styles.shadow
      }
            
           
        }}>
      
        <Tab.Screen name="      " component={PostScreenUsers}
         options={{ 
            tabBarIcon:({focused}) =>(
                <View style={{alignItems: "center", justifyContent: "center" , top: 10}}>
                <Image 
                source={require('../assets/HomeIcon.png')}
                resizeMode='contain'
                style={{
                    width:25,
                    height:25,
                    tintColor: focused? '#e32f45' : '#748c94'
                }}
                />
                <Text style={{color:focused? '#e32f45' : '#748c94' ,fontSize:12}}>
                מסך בית
                </Text>
                </View>
            )
        }} />
         <Tab.Screen name="   " component={ProfileScreen}
                  options={{ 
            tabBarIcon:({focused}) =>(
                <View style={{alignItems: "center", justifyContent: "center" , top: 10}}>
                <Image 
                source={require('../assets/profile.png')}
                resizeMode='contain'
                style={{
                    width:25,
                    height:25,
                    tintColor: focused? '#e32f45' : '#748c94'
                }}
                />
                <Text style={{color:focused? '#e32f45' : '#748c94' ,fontSize:12}}>
                פרופיל
                </Text>
                </View>
            )
        }} />
          <Tab.Screen name="  " component={AddPostScreen}
                   options={{ 
            tabBarIcon:({focused}) =>(
                <View style={{alignItems: "center", justifyContent: "center" , top: 10}}>
                <Image 
                source={require('../assets/post.png')}
                resizeMode='contain'
                style={{
                    width:25,
                    height:25,
                    tintColor: focused? '#e32f45' : '#748c94'
                }}
                />
                <Text style={{color:focused? '#e32f45' : '#748c94' ,fontSize:12}}>
                פרסם
                </Text>
                </View>
            )
        }} />
           <Tab.Screen name=" " component={MessagesScreen}
                    options={{ 
            tabBarIcon:({focused}) =>(
                <View style={{alignItems: "center", justifyContent: "center" , top: 10}}>
                <Image 
                source={require('../assets/MessageIcon.png')}
                resizeMode='contain'
                style={{
                    width:25,
                    height:25,
                    tintColor: focused? '#e32f45' : '#748c94'
                }}
                />
                <Text style={{color:focused? '#e32f45' : '#748c94' ,fontSize:12}}>
                הודעות
                </Text>
                </View>
            )
        }} />
        </Tab.Navigator>

    );
}
const styles = StyleSheet.create({
    shadow:{
        shadowColor:'#7F5DF0',
        shadowOffset: {
            width:0,
            height:10,
        },
        shadowOpacity:0.25,
        shadowRadius:3.5,
        elevation:0,
        backgroundColor:'#ffffff',
        borderRadius:15,
        height:90,
      
    }
})

export default RootStackScreen;