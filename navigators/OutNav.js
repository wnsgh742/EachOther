import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Join from "../screens/Join";
import Login from "../screens/Login";

const Nav = createNativeStackNavigator();

const OutNav = ()=>{
    return(
        <Nav.Navigator screenOptions={{headerShown:false}}>
            
            <Nav.Screen name="Login" component={Login}/>
            
           
        </Nav.Navigator>
    )
}
export default OutNav;