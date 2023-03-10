import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Container = styled.View`
    flex: 1;
`;
const Title = styled.Text``
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 50px;
    justify-content: space-between;
    padding: 10px;
`;
const HeaderText = styled.Text`
     font-size: 22px;
`;
const BodyView = styled.View``;
const BodyText = styled.Text``;
const HeaderChatView = styled.TouchableOpacity``;
const HeaderChatText = styled.Text``;
const HistoryInfo = ({navigation:{navigate,goBack}, route})=>{
    const UID = auth().currentUser.uid;
    const UUID = uuid.v4();

       const [infoData,setInfoData] = useState(route.params.item); 
      
        const [myNickName , setMyNickName] = useState();
       const getProfile = ()=>{
       
        firestore().collection("Profile").where("id","==",UID)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.docs
            .forEach((doc)=>setMyNickName(doc.data().nickname));
           
        })  
        
    }
    const HomeBack = ()=>{
        goBack();
    }
    useEffect(()=>{
  
       getProfile();
    },[])
    const ChatMove = ()=>{
       // navigate("Chat",{params:infoData});
       SaveMessageList();
       navigate("BottomTabs",{screen:"Message", params:infoData});
    }
    const SaveMessageList = ()=>{
        firestore().collection("MessageList").add({
            myId:UID,
            targetId:infoData.id,
            targetName:infoData.nickname,
            targetRegion:infoData.region,
            targetAge : infoData.age,
            uuid:UUID,
            myName:myNickName,
        })
    }
 return(  
  <Container>
        <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                <HeaderText>History</HeaderText>
                <HeaderChatView onPress={ChatMove}>
                <HeaderText>Chat</HeaderText>
                </HeaderChatView>
            </HeaderView>
    <BodyView>
        <BodyText>nickname : {infoData.nickname}</BodyText>
        <BodyText>age : {infoData.age}</BodyText>
        <BodyText>job : {infoData.job}</BodyText>
        <BodyText>region : {infoData.region}</BodyText>
        
      
    </BodyView>

    </Container>
)}
export default HistoryInfo;