import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FlatList } from "react-native";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { SwipeListView } from 'react-native-swipe-list-view';

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
const Wrapper = styled.TouchableOpacity``;
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
    border-radius: 40px;
`;
const SwipeHiddenItemContainer = styled.View`
    flex: 1;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;
    height: 100%;
`;
const SwipeHiddenItem = styled.TouchableOpacity`
    width: 70px;
    height: 137px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
   margin-right: 10px;
   margin-top: 20px;
`;
const SwipeHiddenItemText = styled.Text`
    color: white;
    font-size: 14px;
`;
const History =({navigation:{navigate}, route})=>{
    const [qrData, setQrData] = useState(route.params);
   const [qrid, setQrId] = useState();
    const UID = auth().currentUser.uid;
    const [profileData, setProfileData] = useState([]);

    const getProfile = ()=>{
       
       let b = []
        firestore().collection("Profile")//.where("id","==",QRdata)
        .onSnapshot((snapshot)=>{
            snapshot.docs.forEach((doc)=>{
                b.push({
                    ...doc.data(),
                })
                setProfileData(b);
               
            })
        }) 
    }
    const getQR = ()=>{
        
        console.log(qrid);
        let b =[]
        firestore().collection("Profile").where("id","in",qrid)
            .onSnapshot((snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                    b.push({
                        ...doc.data(),
                    })
                    setProfileData(b);
                   
                })
                console.log(profileData);
            }) 
           
        
    }
    const getQRId = () =>{
        let c = []
            firestore().collection("Profile").doc(UID).collection("QR")
            .onSnapshot((snapshot)=>{
                snapshot.docs.forEach((doc)=>{
                    
                  c.push({
                    ...doc.data(),
                  })  
                  
                })
                let data3 = []
                for(let i = 0; i < c.length; i++) {
                  data3.push(c[i].qrID);
                 
               };
               console.log(data3);
              setQrId(data3);
            
            })
            getQR();
    }
    useEffect(()=>{
        
        if(qrData){
            
            firestore().collection("Profile").doc(UID).collection("QR").add({
                qrID:qrData.params,
            })
          getQRId();
        }else{
            getQRId();
            
        }
       
       
       
    },[])
    const HomeBack = ()=>{
        navigate("Home");
       }
    const Delete = ()=>{
        firestore().collection("Profile")
        .doc(UID).delete();
        console.log("delete");
       
    }
    const MoveInfo = ({item})=>{
        navigate("InNav",{screen:"HistoryInfo",params:{item}});
    }
    return(
        <Container>
            <TitleView>
            <Title>History</Title>
            </TitleView>
            <SwipeListView 
                 data={profileData}
                 keyExtractor={(item)=>item.id}
                 renderItem={({item})=>(
                
                    <HistoryView onPress={()=>navigate("InNav",{screen:"HistoryInfo",params:{item}})}>
                        {item.image == null 
                        ? <HistoryImage source={require("../assets/profile.png")}/>
                         :  <HistoryImage source={{uri:item.image.assets[0].uri}}/>
                          }
                       
                        <HistoryInputView>
                        <HistoryText>{item.nickname}</HistoryText>
                        <HistoryText>{item.age}</HistoryText>
                        <HistoryText>{item.job}</HistoryText>
                        <HistoryText>{item.region}</HistoryText>
                        </HistoryInputView>
                    </HistoryView>
                  
                )}
               
                rightOpenValue={-70} // 오른쪽으로 스와이프 했을 때, 열리는 넓비
                
                renderHiddenItem={(data, rowMap)=>(
                    <SwipeHiddenItemContainer>
                        <SwipeHiddenItem>
                      {/*<SwipeHiddenItemText>left</SwipeHiddenItemText> */}  
                        </SwipeHiddenItem>
                      
                      <SwipeHiddenItem
                      onPress={Delete}
                       style={{backgroundColor:"#FAB1A0"}}>
                            <SwipeHiddenItemText>delete</SwipeHiddenItemText>
                    </SwipeHiddenItem>
                    </SwipeHiddenItemContainer>
             )}
            />
           
        </Container>
    )
}
export default History;