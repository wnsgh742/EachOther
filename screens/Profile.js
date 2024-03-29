import React, { useEffect, useState } from "react";
import styled from "styled-components";  
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Alert, FlatList, Platform } from "react-native";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ProfileInfodata from "../assets/ProfileInfodata/ProfileInfodata";
import uuid from "react-native-uuid";

const Container = styled.View`
    flex:1;
`;
const TitleView = styled.View`
    align-items: center;
    
    margin-top: 20px;
`;
const Title = styled.Text`
    font-size: 43px;
`;
const AddTitle = styled.TouchableOpacity`
    
    align-items: flex-end;
    margin-top: 30px;
    padding-right: 10px;
    padding-top: 10px;
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
    border-radius: 40px;
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
const ImageButton = styled.TouchableOpacity`
    align-items: center;
`;
const ImageButtonText = styled.Text``;


const InfoMove = styled.TouchableOpacity`
    justify-content: center;
    align-items: center;
    margin-top: 10px;
`;
const InfoMoveText = styled.Text`
    font-weight: bold;
    font-size: 22px;
`;
const Wrapper = styled.View`
    align-items: center;
`;

const ProfileInfoView = styled.View`
     width: 310px;
    height: 187px;
  justify-content: center;
    border-radius: 20px;
    border-color: ${(props)=>props.theme.textColor};
    border: 5px;
    background-color: ${(props)=>props.theme.mainBgColor};
    margin-top: 20px;
`;

const ProfileInfoSection1 = styled.View`
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ProfileInfoSection2 = styled.View`
    margin-top: 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const ProfileInfoText= styled.Text`
    font-size: 16px;
    font-weight: 500;
`;
const CardView = styled.View`
   margin-left: 25px;
`;
const CardBox = styled.View`
    width: 85px;
    height: 150px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
    background-color: beige;
`;
const CardText = styled.Text``;
const CardEmoji = styled.Text`
    margin-bottom: 15px;
    margin-left: 30px;
`;

const Profile =({navigation:{navigate},route})=>{
    const UID = auth().currentUser.uid;
    
    const [nickName, setNickName] = useState("");
    const [age, setAge] = useState("");
    const [job, setJob] = useState("");
    const [region, setRegion] = useState("");
    const [profileData, setProfileData] = useState();
    const [profileList, setProfileList] = useState(ProfileInfodata);
    const [editToggle, setEditToggle] = useState(true);
    const [card, setCard] = useState();
    const [infoHobby , setInfoHobby] = useState([]);
    const [infoLoveValue , setInfoLoveValue] = useState([]);
    const [infoTypes , setInfoTypes] = useState([]);
    const [infoReligion , setInfoReligion] = useState([]);
    const [randomCode , setRandomCode] = useState(uuid.v4().slice(30));
        const getProfile = ()=>{
           let b = []
            firestore().collection("Profile").where("id","==",UID)
            .onSnapshot((snapshot)=>{
                snapshot.docs
                .forEach((doc)=>b.push({...doc.data()}));
              
               setProfileData(b[0]);
            })
           
        }
        const getProfileInfo = ()=>{
            let c = []
            firestore().collection("Profile").doc(UID).collection("ProfileInfo").where("id","==",UID)
            .onSnapshot((snapshot)=>{
                c = snapshot.docs.map((doc)=>({
                    ...doc.data(),
                })
            
                  );
                  
               if(c[0] !== undefined || c[1] !== undefined || c[2] !== undefined|| c[3] !== undefined){
                setInfoHobby(c[0].hobby);
                setInfoLoveValue(c[0].loveValue);
                setInfoTypes(c[0].types);
                setInfoReligion(c[0].religion);
               
               }else{
                console.log("not");
               }
                
                   
              
            })
        }
       /* const test = ()=>{
            let c = []
            let d = []
            
            firestore().collection("Profile").doc(UID).collection("ProfileInfo")
            .get()
            .then((querySnapshot)=>{
                querySnapshot.docs
                .forEach((doc)=> c.push({...doc.data()}));
                c[0].hobby.map((name)=>{
                    d.push(name.name);
                })
                c[0].loveValue.map((name)=>{
                   d.push(name.name)
                })
                c[0].types.map((name)=>{
                   d.push(name.name)
                })
                c[0].religion.map((name)=>{
                   d.push(name.name);
                })
            
               setInfoData(d);
              
              
            })
        } */
    const SaveProfile = ()=>{
      
        firestore().collection("Profile").doc(UID).set({
            id:UID,
           nickname: nickName,
           age: age,
            job: job,
           region: region,
           image:response,
           randomCode:randomCode,
           date:Date.now(),
        })
        setEditToggle(true);
        getProfile();
        console.log("Sucess");
       
        
       
    }
    
    const EditProfile = ()=>{
        setEditToggle(false);
      /* firestore().collection("Profile").doc(UID).delete();
        console.log("Delete")
        setResponse(null); */
        getProfile();
    }
    const getCard = ()=>{
        let c = []
        firestore().collection("Card").doc(UID).collection("CardCollect")
        .onSnapshot((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
               c.push(doc.data());
            })
            setCard(c);
        })
    }

    useEffect(()=>{
        getProfile();
        getProfileInfo();
        getCard();
     console.log(card);
    
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
             
              setResponse(res);
            
          },
        );
        
      };
      const Info = ()=>{
        navigate("InNav",{screen:"ProfileInfo"});
      }
      const Setting = ()=>{
        navigate("InNav",{screen:"Set"});
      }

    return(
        <Container>
            <AddTitle onPress={Setting}>
                <Ionicons name="settings-outline" color="black" size={25}/>
            </AddTitle>

            <TitleView>
            <Title>Profile</Title> 
            </TitleView>
            {profileData && editToggle ? 
             <Main>
             <MainProfileView>
             <ImageButton onPress={onSelectImage}>
                {profileData.image == null ?
                <MainProfileImage source={require("../assets/profile.png")}/>
                 :
                 <MainProfileImage source={{uri:profileData.image.assets[0]?.uri}}/> 
                 }
                  <ImageButtonText>
            <Ionicons name="add" color="white" size={22}/>
            </ImageButtonText>
            
          </ImageButton>
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
            <ImageButton onPress={onSelectImage}>
               
                 
            <ImageButtonText>
            <Ionicons name="add" color="white" size={22}/>
            </ImageButtonText>
          </ImageButton>
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
            <InfoMove onPress={Info}>
                <InfoMoveText>Check List</InfoMoveText>
            </InfoMove>

            
            <FlatList 
                data={card}
                horizontal={false}
                numColumns={3}
                renderItem={({item})=>(
                   <CardView>
                    <CardBox>
                        <CardText>{item.name}</CardText>
                        <CardEmoji>{item.emoji}</CardEmoji>
                    </CardBox>
                    </CardView>
                )}
            />
                
                

                
        </Container>
    )
}
export default Profile;
{/*   <Wrapper>
          <ProfileInfoView>
         
           <ProfileInfoSection1>
           {infoHobby.map((item)=>(
                <ProfileInfoText key={item.id}>{item.name}</ProfileInfoText> 
            ))}
           {infoLoveValue.map((item)=>(
                <ProfileInfoText key={item.id}>{item.name}</ProfileInfoText> 
            ))} 
            
          
            </ProfileInfoSection1>

            <ProfileInfoSection2>
            {infoTypes.map((item)=>(
                <ProfileInfoText key={item.id}>{item.name}</ProfileInfoText> 
            ))}
            {infoReligion.map((item)=>(
                <ProfileInfoText key={item.id}>{item.name}</ProfileInfoText> 
            ))}
            </ProfileInfoSection2>

          </ProfileInfoView>
          </Wrapper>
          */}