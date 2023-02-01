import React, { useEffect, useState } from "react";
import styled from "styled-components";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, Platform } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
const Container = styled.View`
    flex:1;
`;
const TitleView = styled.View`
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 60px;
`;
const Title = styled.Text`
   
   
   
    font-size: 43px;
`;
const AddTitle = styled.TouchableOpacity`
    margin-right: 10px;
`;
const Main = styled.View`
align-items: center;
`;
const MainProfileView = styled.View`
    margin-top: 20px;
    flex-direction: row;
   
    align-items: center;
    border-radius: 20px;
    width: 310px;
    height: 187px;
    justify-content: center;
    background-color: ${(props)=> props.theme.btnColor};
`;
const MainProfileImage = styled.Image`
    width: 104px;
    height: 104px;
    border-radius: 45px;
`;
const MainProfileTextInputView = styled.View`
    margin-left: 40px;
    justify-content: center;
    
`;
const MainProfileTextInput = styled.TextInput`
    font-size: 16px;
    margin-bottom: 5px;
    
`;
const MainProfileText = styled.Text`
    font-size: 16px;
    margin-bottom: 5px;
`;
const MainProfileButtonView= styled.View`
    flex-direction: row;
`;
const MainProfileButton = styled.Button`
    
`;
const ImageButton = styled.TouchableOpacity``;
const ImageButtonText = styled.Text``;
const ImageSelect = styled.Image`
    width: 20%;
    height: 20%;
`;
const Profile =()=>{
    const UID = auth().currentUser.uid;
    const [nickName, setNickName] = useState("");
    const [age, setAge] = useState("");
    const [job, setJob] = useState("");
    const [region, setRegion] = useState("");

    
        const [profileData, setProfileData] = useState();
        const getProfile = ()=>{
           let b = []
            firestore().collection("Profile")
            .get()
            .then((querySnapshot)=>{
                querySnapshot.docs
                .forEach((doc)=>b.push({...doc.data()}));
               // console.log(b);
               setProfileData(b[0]);
                
            })

        }
    const SaveProfile = ()=>{
        firestore().collection("Profile").doc(UID).set({
            id:UID,
           nickname: nickName,
           age: age,
            job: job,
           region: region,
           image:response,
           date:Date.now(),
        })
       
        getProfile();
       
        console.log("Sucess");
       
    }
    const EditProfile = ()=>{
        firestore().collection("Profile").doc(UID).delete();
        console.log("Delete")
        setResponse(null);
        getProfile();
       
       
    }
    useEffect(()=>{
        getProfile();
       
    },[])
    const [response, setResponse] = useState(null);
    const onSelectImage = () => {
        launchImageLibrary(
          {
            mediaType: 'photo',
            maxWidth: 512,
            maxHeight: 512,
            includeBase64: Platform.OS === 'android',
          },
          (res) => {
            if (res.didCancel) {
                // 취소했을 경우
                return;
              }
              console.log(res);
              setResponse(res);
            
          },
        );
      };
    return(
        <Container>
            <TitleView>
            <AddTitle>
                <Ionicons name="add" color="white" size={65}/>
            </AddTitle>
            <Title>Profile</Title>
           
            <AddTitle>
                <Ionicons name="add" color="black" size={55}/>
            </AddTitle>
            </TitleView>
            {profileData ? 
             <Main>
             <MainProfileView>
                 <MainProfileImage source={{uri:profileData.image.assets[0]?.uri}}/>
                 <MainProfileTextInputView>
                     <MainProfileText>{profileData.nickname}</MainProfileText>
                     <MainProfileText>{profileData.age}</MainProfileText>
                     <MainProfileText>{profileData.job}</MainProfileText>
                     <MainProfileText>{profileData.region}</MainProfileText>
                         
                     
                 </MainProfileTextInputView>
             </MainProfileView>
             <MainProfileButtonView>
             <MainProfileButton title="확인" color="black" onPress={SaveProfile}/>
             <MainProfileButton title="수정" color="black" onPress={EditProfile}/>
             </MainProfileButtonView>
             </Main>
            :
            <Main>
            <MainProfileView>
                <MainProfileImage source={{uri:response?.assets[0]?.uri}}/>
                <MainProfileTextInputView>
                    <MainProfileTextInput 
                        value={nickName}
                        onChangeText={(text)=>setNickName(text)}
                        placeholder="NickName"
                    />
                    <MainProfileTextInput 
                        value={age}
                        onChangeText={(text)=>setAge(text)}
                        placeholder="age"
                    />
                    <MainProfileTextInput
                        value={job}
                        onChangeText={(text)=>setJob(text)}
                        placeholder="job"
                     />
                    <MainProfileTextInput
                        value={region}
                        onChangeText={(text)=>setRegion(text)}
                        placeholder="Region"
                     />
                </MainProfileTextInputView>
            </MainProfileView>
            <MainProfileButtonView>
            <MainProfileButton title="확인" color="black" onPress={SaveProfile}/>
            <MainProfileButton title="수정" color="black" onPress={EditProfile}/>
            </MainProfileButtonView>
            </Main>
            }
          <ImageButton onPress={onSelectImage}>
            <ImageButtonText>Upload Profile Image</ImageButtonText>
          </ImageButton>
         
            
        </Container>
    )
}
export default Profile;