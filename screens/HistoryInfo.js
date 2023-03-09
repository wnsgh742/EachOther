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
  /*  const paramsData =[
        route.params[0].id,
        route.params[0].age,
        route.params[0].nickname,
        route.params[0].job,
        route.params[0].region,
        route.params[0].image,
       ] */
       const [infoData,setInfoData] = useState(route.params.item); 
    const HomeBack = ()=>{
        goBack();
    }
    useEffect(()=>{
       console.log(infoData)
     
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