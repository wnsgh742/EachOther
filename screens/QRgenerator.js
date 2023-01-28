import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "react-native-qrcode-svg";
import firestore from '@react-native-firebase/firestore';
const Container = styled.View`
    margin-top: 30px;
    align-items: center;
`;
const Title = styled.Text``;

const QRgenerator =({navigation:{navigate}, route})=>{
    console.log(route.params[0]);
   const paramsData =[
    route.params[0].id,
    route.params[0].age,
    route.params[0].nickname,
    route.params[0].job,
    route.params[0].address,
   
   ]
    const [profile, setProfile] = useState(paramsData);
   
    useEffect(()=>{
        console.log(profile);
    },[])
    return(
        <Container>
            <Title>QRgenerator</Title>
            <QRCode 
               value={profile}
               
            />
        </Container>
    )
}
export default QRgenerator;