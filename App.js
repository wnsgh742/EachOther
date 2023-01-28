import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import Root from './navigators/Root';
import { useColorScheme } from 'react-native';
import { darkTheme, lightTheme } from './styled/theme';
import {ThemeProvider} from 'styled-components';
import OutNav from './navigators/OutNav';
const Container = styled.View``;
const Title = styled.Text``;
export default function App() {
  
  const isDark = useColorScheme() === "dark";
  const [userObj, setUserObj] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(()=>{
    auth().onAuthStateChanged((user)=>{
      if(user){
        setLoggedIn(true);
        setUserObj(user);
        
      }else{
        setLoggedIn(false);
      }
    })
  },[])

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
    <NavigationContainer >
     {loggedIn ? <Root userObj={userObj}/> :<OutNav />} 
    </NavigationContainer>
    </ThemeProvider>
  );
};