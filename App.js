import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { 
  NavigationContainer, 
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme
} from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import RootStackScreen from './screens/RootStackScreen';
import Tabs from './screens/RootStackScreen';


const App= () => {
  return (
 
    <NavigationContainer>
     
   <RootStackScreen >
   <Tabs/>
 </RootStackScreen>
    
    </NavigationContainer>

  );
}

export default App;

