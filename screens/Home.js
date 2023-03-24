import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { FlatList } from "react-native";
import LogContext from "../contexts/LogContext";
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
     background-color: ${(props)=> props.theme.btnColor};
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    border-radius: 15px;
    width: 250px;
    height: 60px;
`;
const OutText =styled.Text`
   font-size: 30px;
    color: white;
    border-color: black;
`;
const ChatView = styled.TouchableOpacity`
   background-color: ${(props)=> props.theme.btnColor};
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    border-radius: 15px;
    width: 250px;
    height: 60px;
`;
const ChatText = styled.Text`
   font-size: 30px;
    color: white;
    border-color: black;
`;
const MoveCardView = styled.TouchableOpacity`
   background-color: ${(props)=> props.theme.btnColor};
    align-items: center;
    justify-content: center;
    margin-top: 30px;
    border-radius: 15px;
    width: 250px;
    height: 60px;
`;
const MoveCardText = styled.Text`
   font-size: 30px;
    color: white;
    border-color: black;
`;
const Home =({navigation:{navigate},route})=>{
    const pa = route.params;
    const {LogUser} = useContext(LogContext);
    const UIDHome = auth().currentUser.uid;
    const [profileData, setProfileData] = useState([]);
    const [chat , setChat] = useState();
    const getProfile = ()=>{
       
        firestore().collection("Profile").where("id","==",UIDHome)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.docs
            .forEach((doc)=>setProfileData(doc.data()));
        })  
      
    }
    const getChat = ()=>{
      let a = []
   //   const CombinedId = profileData.id > UIDHome ? profileData.id+UIDHome:UIDHome+profileData.id;
      const CombinedId = UIDHome > profileData.id ? UIDHome+profileData.id: profileData.id+UIDHome;
      
      firestore().collection("chat").doc(CombinedId).collection("ProfileChat")
      .onSnapshot((snapshot)=>{
        snapshot.docs
        .forEach((doc)=>{
          a.push({...doc.data()});
        setChat(a);
        })
      })
     
     
    }
    useEffect(()=>{
        getProfile();
        getChat();
     console.log(pa);
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
    const MoveChat = ()=>{
      navigate("InNav",{screen:"Chatting", params:[profileData]})
    }
    const MoveCard = ()=>{
      navigate("InNav", {screen:"CardCheck"})
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
         <MoveCardView onPress={MoveCard}>
          <MoveCardText>Cards</MoveCardText>
         </MoveCardView>
    
        </Container>
    )
}
export default Home;