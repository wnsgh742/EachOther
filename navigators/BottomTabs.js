import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useColorScheme } from "react-native";
import History from "../screens/History";
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import { FIRST_DATE, GREY_COLOR } from "../styled/Colors";
import MessageList from "../screens/MessageList";

const Tab = createBottomTabNavigator();

const BottomTabs=()=>{
    const isDark = useColorScheme()=== "dark";
    return(
        <Tab.Navigator 
        
         screenOptions={{
            tabBarStyle:{borderRadius:20},
            headerShown:false,
            tabBarActiveTintColor: FIRST_DATE,
            tabBarInactiveTintColor : GREY_COLOR ,
            tabBarShowLabel:false,
        }}
         
         >
            <Tab.Screen name="Home" component={Home} options={{
                tabBarIcon:({focused,size,color})=>{
                    
                    return (<Icon name="home-outline" size={32} color={color} />)
                }
            }}/>
            <Tab.Screen name="Message" component={MessageList} options={{
                tabBarIcon:({focused,size,color})=>{
                    
                    return (<MaterialCommunityIcons name="message-processing-outline" size={32} color={color} />)
                }
            }}/>
            <Tab.Screen name="History" component={History} options={{
                tabBarIcon:({focused,size,color})=>{
                    return (<AntDesign name="heart" size={32} color={color} /> )
                }
            }}/>
            <Tab.Screen name="Profile" component={Profile} options={{
                 tabBarIcon:({focused,size,color})=>{
                    return (<MaterialCommunityIcons name="account" size={32} color={color} />)
                }
            }}/>
        </Tab.Navigator>
    )
}
export default BottomTabs;