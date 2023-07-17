import React, { useEffect, useState } from "react";
import styled from "styled-components";
import QRCode from "react-native-qrcode-svg";
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';

const Container = styled.View`
  
    
`;
const Title = styled.Text`
    font-size: 22px;
`;
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
   
    margin-top: 50px;
`;
const HeaderBack = styled.TouchableOpacity``;
const QRView = styled.View`
    align-items: center;
    margin-top: 50px;
    margin-bottom: 50px;
`;
const ImageQRView = styled.View`
    align-items: center;
    margin-top: 100px;
`;
const ImageQR = styled.Image`
   width: 200px;
   height:200px;
   border-radius: 40px;
`;
const ImageQRText = styled.Text``;
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
    const UID = auth().currentUser.uid;
    const [url, setUrl] = useState("https://pf.kakao.com/_bxhxfyxj/friend?from=qr");
    const [ddd,setDdd] = useState("Text :1"+UID + "\n Text :2"+UID);
   const HomeBack = ()=>{
    navigate("Home");
   }
    useEffect(()=>{
        console.log(profile);
    },[])
    let logoFromFile = require('../assets/qrcode_350.png');
     
    
    
   
    return(
        <Container>

            <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="Black" />
                <Title>Home</Title>
            </HeaderView>

            <QRView>
                <QRCode 
                value={ddd}
                size={150}
                />
            </QRView>
         {/*    <QRView>
                <QRCode 
                 value={url}
                size={150}
            //logo={logoFromFile}
                backgroundColor="white"
            //color="white"
                />
            </QRView>
            */}
         <ImageQRView>
            <ImageQR source={require('../assets/qrcode_350.png')}/>
            <ImageQRText>홀딤 플러스친구 등록하기</ImageQRText>
         </ImageQRView>
        </Container>
    )
}
export default QRgenerator;