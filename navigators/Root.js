import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import BottomTabs from "./BottomTabs";
import InNav from "./InNav";
import OutNav from "./OutNav";

const Nav = createNativeStackNavigator();

const Root = ({userObj})=>{
   
    return(
        <Nav.Navigator screenOptions={{headerShown:false}} userObj={userObj}>
            <Nav.Screen name="BottomTabs" component={BottomTabs} />
            <Nav.Screen name="InNav" component={InNav} />
            
        </Nav.Navigator>
    )
}
export default Root;