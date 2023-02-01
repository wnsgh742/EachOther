import React, { useEffect, useState } from "react";
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

const QRscanner = styled.TouchableOpacity`
    background-color: ${(props)=> props.theme.btnColor};
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    border-radius: 15px;
    width: 250px;
    height: 60px;
`;
const QRscannerText = styled.Text`
      font-size: 30px;
    color: white;
    border-color: black;
`;
const Out = styled.TouchableOpacity`
    
`;
const OutText =styled.Text``;
const Home =({navigation:{navigate}})=>{
    const UIDHome = auth().currentUser.uid;
    const [profileData, setProfileData] = useState([]);
    const getProfile = ()=>{
       
        firestore().collection("Profile").where("id","==",UIDHome)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.docs
            .forEach((doc)=>setProfileData(doc.data()));
        })  
      
    }
    useEffect(()=>{
        getProfile();
     console.log(profileData);
    },[])
    
    const QRgenerate = ()=>{
       navigate("InNav",{screen: "QRgenerator" , params:[profileData]});
    }
    const QRscan = ()=>{
        navigate("InNav",{screen:"QRscan"});
    }
    const SignOut = ()=>{
        auth().signOut();
    }
   
    return(
        <Container>
        
            
          <QRgenerator onPress={QRgenerate}>
            <QRgeneratorText>QR생성하기</QRgeneratorText>
          </QRgenerator>
          <QRscanner onPress={QRscan}>
            <QRscannerText>QR스캔하기</QRscannerText>
          </QRscanner>
          <Out onPress={SignOut} >
            <OutText>SignOut</OutText>
          </Out>
        </Container>
    )
}
export default Home;