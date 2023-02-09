import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Ionicons from 'react-native-vector-icons/Ionicons';
import ProfileInfodata from "../assets/ProfileInfodata/ProfileInfodata";
import CheckboxList from 'rn-checkbox-list';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Container = styled.View`
    flex: 1;
`;
const Title = styled.Text`
    font-size: 22px;
`;
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: space-between;
    margin-top: 50px;
`;
const CheckboxView = styled.ScrollView`
   
    
`;
const SaveTitle = styled.TouchableOpacity`
   
`;
const ProfileInfo = ({navigation:{navigate, goBack}})=>{
    const UID = auth().currentUser.uid;
    const UID2 = UID + "a";
    const [profileList, setProfileList] = useState(ProfileInfodata);
    const [hobby, setHobby] = useState([]);
    const [loveValue, setLoveValue] = useState([]);
    const [types, setTypes] = useState([]);
    const [religion, setReligion] = useState([]);
    const [info, setInfo] = useState([]);
    const [hobby2, setHobby2] = useState();
    const HomeBack = ()=>{
      goBack();
       }

       const InfoSave = ()=>{
        firestore().collection("Profile").doc(UID).collection("ProfileInfo").doc(UID).set({
            id:UID,
          hobby:hobby,
          loveValue:loveValue,
          types:types,
          religion:religion,
        })
       

        goBack();   
       }

       useEffect(()=>{
        
       },[])

       return(
    <Container>
       
        <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                <Title>Home</Title>
                <SaveTitle onPress={InfoSave}>
                <Ionicons name="add" color="black" size={35}/>
            </SaveTitle>
            </HeaderView>
            <CheckboxView>
            <CheckboxList 
            
                 headerName="취미"
                 headerStyle={{
                    text: {
                    color: 'black',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }, flexDirection: 'row',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  padding: 10,
                }}
                selectedListItems={hobby}
                 theme="red"
                 listItemStyle={{ borderBottomColor: '#eee', }}
                checkboxProp={{ boxType: 'square' }}
                listItems={profileList[0]}
            />
           
        
         <CheckboxList 
            
            headerName="연애 가치관"
            headerStyle={{
               text: {
               color: 'black',
               fontWeight: 'bold',
               fontSize: 20,
             }, flexDirection: 'row',
             alignItems: 'center',
             backgroundColor: 'white',
             padding: 10,
           }}
           selectedListItems={loveValue}
            theme="red"
            listItemStyle={{ borderBottomColor: '#eee', }}
           checkboxProp={{ boxType: 'square' }}
           listItems={profileList[1]}
       />
       <CheckboxList 
            
            headerName="이상형"
            headerStyle={{
               text: {
               color: 'black',
               fontWeight: 'bold',
               fontSize: 20,
             }, flexDirection: 'row',
             alignItems: 'center',
             backgroundColor: 'white',
             padding: 10,
           }}
           selectedListItems={types}
            theme="red"
            listItemStyle={{ borderBottomColor: '#eee', }}
           checkboxProp={{ boxType: 'square' }}
           listItems={profileList[2]}
       />
       <CheckboxList 
            
            headerName="종교"
            headerStyle={{
               text: {
               color: 'black',
               fontWeight: 'bold',
               fontSize: 20,
             }, flexDirection: 'row',
             alignItems: 'center',
             backgroundColor: 'white',
             padding: 10,
           }}
           selectedListItems={religion}
            theme="red"
            listItemStyle={{ borderBottomColor: '#eee', }}
           checkboxProp={{ boxType: 'square' }}
           listItems={profileList[3]}
       />
         
         </CheckboxView>
    </Container>
)}
export default ProfileInfo;