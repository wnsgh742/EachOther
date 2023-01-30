import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EditProfile from "../screens/EditProfile";
import QRgenerator from "../screens/QRgenerator";
import QRscan from "../screens/QRscan";

const Nav = createNativeStackNavigator();

const InNav = ()=>{
    return(
        <Nav.Navigator screenOptions={{headerShown:false}}>
            <Nav.Screen name="EditProfile" component={EditProfile}/>
           <Nav.Screen name="QRgenerator" component={QRgenerator} />
           <Nav.Screen name="QRscan" component={QRscan} />
        </Nav.Navigator>
    )
}
export default InNav;