import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "react-native-qrcode-svg";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Container = styled.View`
   
    
`;
const Title = styled.Text`
    font-size: 22;
`;
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
   
    margin-top: 50px;
`;
const HeaderBack = styled.TouchableOpacity``;
const QRView = styled.View`
    align-items: center;
    margin-top: 30px;
`;
const QRgenerator =({navigation:{navigate}, route})=>{
    console.log(route.params[0]);
   const paramsData =[
    route.params[0].id,
    route.params[0].age,
    route.params[0].nickname,
    route.params[0].job,
    route.params[0].region,
   
   ]
    const [profile, setProfile] = useState(paramsData);
   const HomeBack = ()=>{
    navigate("Home");
   }
    useEffect(()=>{
        console.log(profile);
    },[])
    return(
        <Container>

            <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="Black" />
                <Title>Home</Title>
            </HeaderView>

            <QRView>
            <QRCode 
               value={profile[0]}
               
            />
            </QRView>

        </Container>
    )
}
export default QRgenerator;