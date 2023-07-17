import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Ionicons from 'react-native-vector-icons/Ionicons';
import uuid from 'react-native-uuid';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { NAVY_COLOR, PEACH_COLOR, RED_COLOR } from "../styled/Colors";
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
const BodyView = styled.View`
    align-items: center;
`;

const BodyText = styled.Text`
    font-size: 22px;  
`;
const BodyImageView = styled.View`
    align-items: center;
    padding: 10px;
`;
const BodyImage = styled.Image`
    width: 150px;
   height:150px;
   border-radius: 40px;
`;
const BottomAllView = styled.View`
     flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-top: 20px;
`;
const BottomView = styled.TouchableOpacity`
  
`;
const BottomView2 = styled.TouchableOpacity`
 
`;
const BottomButtonChat = styled.Text`
    padding: 10px;
    font-weight: 500;
    font-size: 22px;
    border: 5px;
    margin: 10px;
    border-radius: 15px;
    border-color: ${PEACH_COLOR};
    color: ${PEACH_COLOR};
`;
const BottomButtonDelete = styled.Text`
    font-size: 22px;
    border: 5px;
    margin: 10px;
    padding: 10px;
    border-radius: 15px;
    font-weight: 500;
    border-color: ${NAVY_COLOR};
    color: ${NAVY_COLOR};
`;
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
       console.log(infoData)
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
    const Delete = ()=>{
        firestore().collection("Profile").doc(UID).collection("QR").doc(infoData.id).delete();
        console.log("delete");
        navigate("BottomTabs",{screen:"History"});
    }
 return(  
  <Container>
        <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                
                <HeaderChatView onPress={ChatMove}>
                
                </HeaderChatView>
            </HeaderView>
            <HeaderText>History</HeaderText>
           
        <BodyImageView>
        <BodyImage source={infoData.image.assets[0]}></BodyImage>
        </BodyImageView>
        <BodyView>
        <BodyText>별칭 : {infoData.nickname}</BodyText>
        <BodyText>나이 : {infoData.age}</BodyText>
        <BodyText>직업 : {infoData.job}</BodyText>
        <BodyText>지역 : {infoData.region}</BodyText>
        
      
    </BodyView>
    <BottomAllView>
        <BottomView onPress={()=>ChatMove()}>
            <BottomButtonChat>채팅하기</BottomButtonChat>
        </BottomView>
        <BottomView2 onPress={()=>Delete()}>
            <BottomButtonDelete>삭제하기</BottomButtonDelete>
        </BottomView2>
    </BottomAllView>

    </Container>
)}
export default HistoryInfo;