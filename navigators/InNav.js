import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfile from "../screens/EditProfile";
import QRgenerator from "../screens/QRgenerator";

const Nav = createNativeStackNavigator();

const InNav = ()=>{
    return(
        <Nav.Navigator screenOptions={{headerShown:false}}>
            <Nav.Screen name="EditProfile" component={EditProfile}/>
           <Nav.Screen name="QRgenerator" component={QRgenerator} />
        </Nav.Navigator>
    )
}
export default InNav;