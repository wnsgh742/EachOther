import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, { useEffect, useState } from "react";
import { FlatList } from 'react-native';
import styled from "styled-components"


const Container = styled.View`
    flex: 1;
`;
const TitleView = styled.View`
    align-items: center;
    margin-top: 50px;
`;
const Title = styled.Text`
    margin-top: 10px;
    font-size: 43px;
`;
const MessageView = styled.View``;
const MessageText = styled.Text``;
const ChatList = styled.FlatList``
const RenderView = styled.TouchableOpacity`
  margin-top: 20px;
    flex-direction: row;
   margin-left: 5px;
    align-items: center;
    border-radius: 20px;
    width: 380px;
    height: 137px;
    justify-content: flex-start;
    background-color: ${(props)=> props.theme.btnColor};
`;
const RenderText = styled.Text`
    font-size: 16px;
    margin-bottom: 5px;
`;
const MessageList = ({navigation:{navigate,goBack}, route})=>{
  
   
    const myId = auth().currentUser.uid;
    const [chat , setChat] = useState();
    const [messageList ,setMessageList] = useState();

    const getMessageList = ()=>{
      let a = []
      let b = []
        firestore().collection("MessageList").where("myId","==",myId)
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs
            .forEach((doc)=>{
              a.push({...doc.data()});
             
            });
        }) 
       

        firestore().collection("MessageList").where("targetId","==",myId)
        .onSnapshot((querySnapshot)=>{
            querySnapshot.docs
            .forEach((doc)=>{
              a.push({...doc.data()});
             
            });
        }) 
        setMessageList(a)
    }

    const getChat = ()=>{
        let a = []
        const CombinedId = myId > id ? myId+id : id+myId;
        
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
        //getChat();
        getMessageList();
        console.log(messageList);
      },[])

    return(
        <Container>
        <TitleView>
          
        <Title>MessageList</Title>
        </TitleView>
        
      <MessageView>        
      <ChatList 
            data={messageList}
            keyExtractor={item=>item.id}
            renderItem={({item})=>(
              <RenderView onPress={()=>navigate("InNav",{screen:"Chatting",params:{item}})}>
                
                 <RenderText>{item.targetName}</RenderText>
                
              </RenderView>
    )}
          />
         

        </MessageView>

   
    </Container>
    )
   
}
export default MessageList;