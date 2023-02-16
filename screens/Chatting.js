import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components"
import { GiftedChat } from 'react-native-gifted-chat';
import Ionicons from 'react-native-vector-icons/Ionicons';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const Container = styled.View`
    flex: 1;
    padding: 10px;
`;
const Title = styled.Text``;
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 50px;
    justify-content: space-between;
  
`;
const HeaderText = styled.Text`
     font-size: 22px;
`;
const HeaderChatView = styled.TouchableOpacity``;
const HeaderChatText = styled.Text``;

const Chatting = ({navigation:{navigate,goBack}, route}) => {
    const ChoiceUser = route.params[0].id;
   console.log(ChoiceUser);
    console.log(UIDChat);
    const UIDChat = auth().currentUser.uid;
    const [messages, setMessages] = useState([]);
   
    const getChat = ()=>{
        firestore().collection("Profile").doc(ChoiceUser).collection("ProfileChat").orderBy('createdAt', 'desc')
        .onSnapshot((snapshot) =>
            setMessages(
                snapshot.docs.map(doc =>({
                    _id: doc.data()._id,
                    createdAt: doc.data().createdAt.toDate(),
                    text: doc.data().text,
                    user: doc.data().user,
                }))
            )
          
        )
       console.log(messages.user);
    }

    useEffect(() => {
        getChat();
 
      }, [])
    
      const onSend = useCallback((messages = []) => {
      //  setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        const { _id, createdAt, text, user,} = messages[0]
      firestore().collection("Profile").doc(ChoiceUser).collection("ProfileChat").add({ _id, createdAt,  text, user });
  
      }, [])
   
      const HomeBack = ()=>{
        goBack();
      }

    return(
        <Container>
            <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                <HeaderText>Chat</HeaderText>
                <HeaderChatView >
                <HeaderText>Chat</HeaderText>
                </HeaderChatView>
            </HeaderView>

            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                placeholder=""
                alwaysShowSend={true}
                user={{
                    _id: UIDChat,
                    name: auth().currentUser.displayName,
                    
                }}
            />

        </Container>
    )
}
export default Chatting;