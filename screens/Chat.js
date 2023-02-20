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

const Chat = ({navigation:{navigate,goBack}, route}) => {
    const ChoiceUser = route.params.params[0];
   console.log(ChoiceUser);
    console.log(UIDChat);
    const UIDChat = auth().currentUser.uid;
    
        
    
    const [messages, setMessages] = useState([]);
    const infoData = [
       { age:route.params.params[1]},
       { nickname : route.params.params[2]},
       { job:route.params.params[3]},
       { region:route.params.params[4]},
       {image :route.params.params[5]},
       {id :route.params.params[0]},
    ]

    const getChat = ()=>{
        const CombinedId = UIDChat > ChoiceUser ? UIDChat+ChoiceUser: ChoiceUser+UIDChat;
        firestore().collection("chat").doc(CombinedId).collection("ProfileChat").orderBy('createdAt', 'desc')
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
      console.log(UIDChat);
      }, [])
    
      const onSend = useCallback((messages = []) => {
       // setMessages(previousMessages => GiftedChat.append(previousMessages, messages));
        const CombinedId = UIDChat > ChoiceUser ? UIDChat+ChoiceUser: ChoiceUser+UIDChat;
        const { _id, createdAt, text, user,} = messages[0]
      firestore().collection("chat").doc(CombinedId).collection("ProfileChat").add({ _id, createdAt,  text, user });
  
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
                    choiceuser : ChoiceUser,
                    name: auth().currentUser.displayName,
                    
                }}
            />

        </Container>
    )
}
export default Chat;