import React, { useEffect, useState } from "react";
import styled from "styled-components";
import uuid from "react-native-uuid";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Container = styled.View`
    flex: 1;
    align-items: center;
    margin-top: 50px;
`;
const Title = styled.Text`
    font-size: 30px;
    
`;
const RandomCodeView = styled.View`
    border: 2px;
    width: 180px;
    height: 50px;
    border-radius: 20px;
    margin-top: 30px;
    align-items: center;
    justify-content: center;
`;
const RandomCodeText = styled.Text``;
const InviteCode = styled.View`

`;
const InviteCodeTextInput= styled.TextInput`
    width: 180px;
    height: 50px;
    margin-top: 10px;
    align-items: center;
   
    border: 2px;
    border-radius: 20px;
`;
const InviteCodeText = styled.Text`
    margin-top: 30px;

`;
const Back = styled.TouchableOpacity``;
const BackText = styled.Text``;
const Connect = styled.TouchableOpacity``;
const ConnectText = styled.Text``;
const Set = ({navigation:{navigate,goBack}, route})=>{
    const UID = auth().currentUser.uid;
    const [randomCode , setRandomCode] = useState();
    const [inViteCode, setInViteCode] = useState();
    const [inViteId , setInViteId] = useState();
    const Profile = ()=>{
        goBack();
    }
    const GetCode = ()=>{
        let b = []
        firestore().collection("Profile").where("id","==",UID)
        .onSnapshot((snapshot)=>{
            snapshot.docs
            .forEach((doc)=>b.push({...doc.data()}));
          
           setRandomCode(b[0].randomCode);
        })
       
     
        }
    
        const Confirm = ()=>{
            let b = []
            firestore().collection("Profile").where("randomCode","==",inViteCode)
            .onSnapshot((snapshot)=>{
                snapshot.docs
                .forEach((doc)=>b.push({...doc.data()}));
                setInViteId(b[0].id);
            })
            firestore().collection("Profile").doc(inViteId).collection("QR").add({
                qrID:UID,
            })
        }
        
    useEffect(()=>{
       GetCode();
       console.log(inViteId);
    },[])

    return( 
        <Container>
            <Title>Setting</Title>
            <Back onPress={Profile}>
                <BackText>뒤로가기</BackText>
            </Back>
            <RandomCodeView>
                <RandomCodeText>{randomCode}</RandomCodeText>
            </RandomCodeView>
            <InviteCodeText>초대코드입력하기</InviteCodeText>
            <InviteCode>
                <InviteCodeTextInput
                    value={inViteCode}
                    onChangeText={(item)=>setInViteCode(item)}
                />
                <Connect onPress={Confirm}>
                    <ConnectText>확인</ConnectText>
                </Connect>
                
            </InviteCode>
        </Container>
    )
}
export default Set;