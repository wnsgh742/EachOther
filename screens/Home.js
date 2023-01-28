import React, { useEffect, useState } from "react";
import QRCode from "react-native-qrcode-svg";
import styled from "styled-components";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Container = styled.View`
  align-items: center;
    justify-content: center;
   margin-top: 50px;
   
`;
const Title = styled.Text`
   
`;
const QRgenerator = styled.TouchableOpacity`
    background-color: ${(props)=> props.theme.btnColor};
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    border-radius: 15px;
    width: 250px;
    height: 60px;
`;
const QRgeneratorText = styled.Text`
    font-size: 30px;
    color: white;
    border-color: black;
    
    
`;
const Out = styled.TouchableOpacity``;
const OutText =styled.Text``;
const Home =({navigation:{navigate}})=>{
    //const UID = auth().currentUser.uid;
    const [profileData, setProfileData] = useState([]);
    const getProfile = ()=>{
       
        firestore().collection("Profile")
        .get()
        .then((querySnapshot)=>{
            querySnapshot.docs
            .forEach((doc)=>setProfileData(doc.data()));
        })  
       console.log(profileData);
    }
    useEffect(()=>{
        getProfile();
       
    },[])
    
    const QR = ()=>{
       navigate("InNav",{screen: "QRgenerator" , params:[profileData]});
    }
    const SignOut = ()=>{
        auth().signOut();
    }
   
    return(
        <Container>
        
            
          <QRgenerator onPress={QR}>
            <QRgeneratorText>QR생성하기</QRgeneratorText>
          </QRgenerator>
          <Out onPress={SignOut} >
            <OutText>SignOut</OutText>
          </Out>
        </Container>
    )
}
export default Home;