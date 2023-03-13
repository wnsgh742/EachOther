import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import CardCheck from "../screens/CardCheck";
import Chat from "../screens/Chat";
import Chatting from "../screens/Chatting";
import EditProfile from "../screens/EditProfile";
import HistoryInfo from "../screens/HistoryInfo";
import ProfileInfo from "../screens/ProfileInfo";
import QRgenerator from "../screens/QRgenerator";
import QRscan from "../screens/QRscan";

const Nav = createNativeStackNavigator();

const InNav = ()=>{
    return(
        <Nav.Navigator screenOptions={{headerShown:false}}>
            <Nav.Screen name="EditProfile" component={EditProfile}/>
           <Nav.Screen name="QRgenerator" component={QRgenerator} />
           <Nav.Screen name="QRscan" component={QRscan} />
           <Nav.Screen name="ProfileInfo" component={ProfileInfo} options={{presentation:"modal"}} />
           <Nav.Screen name="HistoryInfo" component={HistoryInfo}/>
           <Nav.Screen name="Chat" component={Chat}/>
           <Nav.Screen name="Chatting" component={Chatting} />
           <Nav.Screen name="CardCheck" component={CardCheck} />
        </Nav.Navigator>
    )
}
export default InNav;