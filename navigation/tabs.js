//  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
//  import React from 'react';
// import PostScreenUsers from '../screens/PostScreenUsers';
// import AddPostScreen from '../screens/PostScreenUsers';
// import ChatScreen from '../screens/PostScreenUsers';
// import SearchScreen from '../screens/SearchScreen';


// const Tab = createBottomTabNavigator();

// const Tabs = () => {
//     return(
//         <Tab.Navigator
//         tabBarOptions={{ 
//             showLabel: false,
//             style:{
//            position: 'absolute',
//            bottom: 25,
//            left: 20,
//            right: 20,
//            elevation:0,
//            backgroundColor: 'white',
//            borderRadius:15,
//            height:10,

//             }
           
//         }}>
//         <Tab.Screen name="Home" component={PostScreenUsers} />
//          <Tab.Screen name="Search" component={SearchScreen}/>
//           <Tab.Screen name="Post" component={AddPostScreen}/>
//            <Tab.Screen name="Messages" component={ChatScreen}/>
//         </Tab.Navigator>

//     );
// }

// export default Tabs;