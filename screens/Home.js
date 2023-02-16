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
const Home =({navigation:{navigate}})=>{
  
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
      firestore().collection("Profile").doc(UIDHome).collection("ProfileChat")
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
    const MoveChat = ()=>{
      navigate("InNav",{screen:"Chatting", params:[profileData]})
    }
   
    return(
        <Container>
        
            
          <QRgenerator onPress={QRgenerate}>
            <QRgeneratorText>QR생성하기</QRgeneratorText>
          </QRgenerator>
          <QRscanner onPress={QRscan}>
            <QRscannerText>QR스캔하기</QRscannerText>
          </QRscanner>
          
          {chat ?
          <ChatView onPress={MoveChat}>
        <ChatText>ChatGO</ChatText>
      </ChatView> 
      :
            null
      }
      <Out onPress={SignOut} >
            <OutText>SignOut</OutText>
          </Out>
        </Container>
    )
}
export default Home;