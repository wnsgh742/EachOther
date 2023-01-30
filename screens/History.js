import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
const Container = styled.View`
    flex: 1;
`;
const TitleView = styled.View`
    align-items: center;
`;
const Title = styled.Text`
   
   
    margin-top: 10px;
    font-size: 43px;
`;
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
   
    margin-top: 50px;
`;
const HeaderText = styled.Text`
     font-size: 22px;
`;

const HistoryView = styled.TouchableOpacity`
   
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
const HistoryInputView = styled.View`
    margin-left: 40px;
    justify-content: center;
`;
const HistoryText = styled.Text`
     font-size: 16px;
    margin-bottom: 5px;
`;
const HistoryImage = styled.Image`
    width: 104px;
    height: 104px;
    margin-left: 15px;
`;
const History =({navigation:{navigate}, route})=>{
    const userObj = auth().currentUser.uid;
    const [profileData, setProfileData] = useState([]);
    const getProfile = ()=>{
       let b = []
        firestore().collection("Profile").where("id","==",userObj)
        .get()
        .then((querySnapshot)=>{
            querySnapshot.docs
            .forEach((doc)=>{
                b.push({
                   ...doc.data(),
                   
                })
               setProfileData(b);
            })
        })  
       
    }
    useEffect(()=>{
        getProfile();
      
    },[])
    const HomeBack = ()=>{
        navigate("Home");
       }
    return(
        <Container>
             <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                <HeaderText>Home</HeaderText>
            </HeaderView>
            <TitleView>
            <Title>History</Title>
            </TitleView>
            <FlatList 
                data={profileData}
                keyExtractor={(item)=>item.date}
                renderItem={({item})=>(
                    <HistoryView>
                        <HistoryImage source={require("../assets/profile.png")}/>
                        <HistoryInputView>
                        <HistoryText>{item.nickname}</HistoryText>
                        <HistoryText>{item.age}</HistoryText>
                        <HistoryText>{item.job}</HistoryText>
                        <HistoryText>{item.region}</HistoryText>
                        </HistoryInputView>
                    </HistoryView>
                )}
            />
        </Container>
    )
}
export default History;