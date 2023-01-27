import React, { useState } from "react";
import styled from "styled-components";
import firestore from '@react-native-firebase/firestore';
const Container = styled.View`
    flex:1;
`;
const TitleView = styled.View`
    align-items: center;
`;
const Title = styled.Text`
   
   
    margin-top: 60px;
    font-size: 43px;
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
    
`;
const MainProfileTextInputView = styled.View`
    margin-left: 40px;
    justify-content: center;
    
`;
const MainProfileTextInput = styled.TextInput`
    font-size: 16px;
    margin-bottom: 5px;
    
`;
const MainProfileButtonView= styled.View`
    flex-direction: row;
`;
const MainProfileButton = styled.Button`
    
`;
const Profile =()=>{
    const [nickName, setNickName] = useState("");
    const [age, setAge] = useState("");
    const [job, setJob] = useState("");
    const [address, setAddress] = useState("");
    
    const SaveProfile = ()=>{
        firestore().collection("Profile").add({
           nickname: nickName,
           age: age,
            job: job,
           address: address,
        })
        console.log("aa");
    }
    return(
        <Container>
            <TitleView>
            <Title>Profile</Title>
            </TitleView>
            <Main>
            <MainProfileView>
                <MainProfileImage source={require('../assets/profile.png')}/>
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
                        value={address}
                        onChangeText={(text)=>setAddress(text)}
                        placeholder="address"
                     />
                </MainProfileTextInputView>
            </MainProfileView>
            <MainProfileButtonView>
            <MainProfileButton title="확인" color="black" onPress={SaveProfile}/>
            <MainProfileButton title="수정" color="black"/>
            </MainProfileButtonView>
            </Main>
        </Container>
    )
}
export default Profile;