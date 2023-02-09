import React, { useEffect, useState } from "react";
import styled from "styled-components"
import Ionicons from 'react-native-vector-icons/Ionicons';
const Container = styled.View`
    flex: 1;
`;
const Title = styled.Text``
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
    margin-top: 50px;
`;
const HeaderText = styled.Text`
     font-size: 22px;
`;
const BodyView = styled.View``;
const BodyText = styled.Text``;
const HistoryInfo = ({navigation:{navigate,goBack}, route})=>{
   
    const paramsData =[
        route.params[0].id,
        route.params[0].age,
        route.params[0].nickname,
        route.params[0].job,
        route.params[0].region,
       
       ]
       const [infoData,setInfoData] = useState(paramsData);
    const HomeBack = ()=>{
        goBack();
    }
    useEffect(()=>{
        console.log(route.params[0]);
    },[])
 return(  
  <Container>
        <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                <HeaderText>Home</HeaderText>
            </HeaderView>
    <BodyView>
        <BodyText>{infoData[1]}</BodyText>
        <BodyText>{infoData[2]}</BodyText>
        <BodyText>{infoData[3]}</BodyText>
        <BodyText>{infoData[4]}</BodyText>
        <BodyText>{infoData[5]}</BodyText>
    </BodyView>

    </Container>
)}
export default HistoryInfo;