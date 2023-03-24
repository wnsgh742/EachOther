import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, FlatList, LayoutAnimation, PanResponder, ScrollView, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import styled from "styled-components";

import ProfileInfodata from "../assets/ProfileInfodata/ProfileInfodata";
import ProfileColor from "../assets/ProfileInfodata/CardColor";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
const Container = styled.View`
    flex: 1;
    background-color: ${(props)=> props.theme.btnColor};
`;
const Title = styled.Text`
    margin-top: 30px;
`;
const HeaderView = styled.TouchableOpacity`
    margin-top: 50px;
`;
const HeaderText = styled.Text``;
const SecondFlatList = styled.FlatList`
   
    
`;
const ThirdFlatList = styled.FlatList`
   
    
`;
const CardContainer = styled.View``;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);
const FourFlatList = styled.FlatList``;
const CardView = styled.TouchableOpacity`
    width: 85px;
    height: 150px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
   
    margin-left: 15px;
`;
const AnimatedView = Animated.createAnimatedComponent(CardView);

const Box = styled.View`
      background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(TouchableOpacity);

const CardText = styled.Text``;
const CardEmoji = styled.Text`
    margin-bottom: 15px;
    margin-left: 30px;
`;

const CardCheck  = ({navigation:{navigate,goBack}, route})=>{
    const [cardData , setCardData] = useState(ProfileInfodata);
    const [cardColor , setCardColor] = useState(ProfileColor);
    const [cardSelets, setCardSelets] = useState();
    const UID = auth().currentUser.uid;
    const scale = useRef(new Animated.Value(1)).current;
    const slide = useRef(new Animated.Value(0)).current;
    const X = new Animated.Value(0);
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderGrant:()=>onPressIn(),
        onPanResponderRelease:()=>onPressOut(),
        
    })).current;
   

    const onPressIn=()=>{Animated.spring(scale,{toValue:0.95, useNativeDriver:true}).start();}
    
    const onPressOut=()=>{Animated.spring(scale,{toValue:1, useNativeDriver:true}).start();}
   
const GoBack = ()=>{
   navigate("BottomTabs",{screen:"Home",params:cardColor});
  
}
const CardBackGround = ()=>{
    const randomColor = Math.floor(Math.random(cardColor) * 16777215)
    .toString(16)
    .padStart(6, '0');
     return `#${randomColor}`;
}
const CardCollect = (item)=>{
 
        firestore().collection("Card").doc(UID).collection("CardCollect").add({
            id:UID,
            name:item.name,
            emoji:item.emoji,
        })
       
        console.log("Sucess");       
}

const GetCard = async()=>{
   
  
}

const moveUp = () => {
    Animated.spring(X, {
        toValue:200,
        bounciness:15,
        useNativeDriver:true,
  
      }).start();

};

  const duration1 = 8000;
  const duration2 = 8000;
  const duration3 = 8000;
  const duration4 = 8000;
 const animated1 = new Animated.Value(250);
 const animated2 = new Animated.Value(300);
 const animated3 = new Animated.Value(200);
 const animated4 = new Animated.Value(250);
 const AnimateTotal = ()=>{
    Animated.loop(
        Animated.sequence([
          
          Animated.timing(animated1, {
            toValue: -520,
            duration: duration1,
            useNativeDriver: true,
          }),
          Animated.timing(animated1, {
            toValue: 450,
            duration: duration1,
            useNativeDriver: true,
          }),
          
          
        ]),
      
      ).start();
      Animated.loop(
        Animated.sequence([
            Animated.timing(animated2, {
                toValue: -520,
                duration: duration2,
                useNativeDriver: true,
              }),
              Animated.timing(animated2, {
                toValue: 450,
                duration: duration2,
                useNativeDriver: true,
              }),
           ]),
      ).start();
      Animated.loop(
        Animated.sequence([
            Animated.timing(animated3, {
                toValue: -520,
                duration: duration3,
                useNativeDriver: true,
              }),
              Animated.timing(animated3, {
                toValue: 450,
                duration: duration3,
                useNativeDriver: true,
              }),
           ]),
      ).start();
      Animated.loop(
        Animated.sequence([
            Animated.timing(animated4, {
                toValue: -520,
                duration: duration4,
                useNativeDriver: true,
              }),
              Animated.timing(animated4, {
                toValue: 450,
                duration: duration4,
                useNativeDriver: true,
              }),
           ]),
      ).start();
 }
useEffect(()=>{
  //  GetCard();
 AnimateTotal();
},[])

    return(
        <Container>
            <HeaderView onPress={GoBack}>
                <HeaderText>뒤로가기</HeaderText>
            </HeaderView>
      
            <AnimatedFlatList 
               
                horizontal={true}
                data={cardData[0]}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                   
                  <AnimatedBox 
                    
                  >
                   <AnimatedView
                    {...panResponder.panHandlers}
                    style={{
                     
                        transform:[{translateX:animated1},{scale:scale}],
                       backgroundColor:CardBackGround(),
                    }}
                   //  onPress={()=>CardCollect(item)}
                   >
                
                    <CardEmoji>{item.emoji}</CardEmoji>
                    <CardText>{item.name}</CardText>
                  
                   
                        
                    </AnimatedView> 
                    </AnimatedBox>
                )}
               
            />
              <SecondFlatList  
               
               horizontal={true} 
               data={cardData[1]}
               keyExtractor={(item)=>item.id}
               renderItem={({item})=>(
                       
                  
                  <AnimatedView
                    {...panResponder.panHandlers}
                    style={{
                        transform:[{scale:scale},{translateX:animated2}],
                       backgroundColor:CardBackGround(),
                    }}
                    
                  >
                   <CardEmoji>{item.emoji}</CardEmoji>
                   <CardText>{item.name}</CardText>
                       
                      
                       </AnimatedView>
                     
               )}
           />
            <ThirdFlatList 
               
               horizontal={true}
               data={cardData[2]}
               keyExtractor={(item)=>item.id}
               renderItem={({item})=>(
                       
                  
                  <AnimatedView
                    {...panResponder.panHandlers}
                    style={{
                        transform:[{scale:scale},{translateX:animated3}],
                       backgroundColor:CardBackGround(),
                    }}
                    
                  >
                   <CardEmoji>{item.emoji}</CardEmoji>
                   <CardText>{item.name}</CardText>
                       
                      
                       </AnimatedView>
                     
               )}
           />
            <FourFlatList 
               
               horizontal={true}
               data={cardData[3]}
               keyExtractor={(item)=>item.id}
               renderItem={({item})=>(
                       
                  
                  <AnimatedView
                    {...panResponder.panHandlers}
                    style={{
                        transform:[{scale:scale},{translateX:animated4}],
                       backgroundColor:CardBackGround(),
                    }}
                    
                  >
                   <CardEmoji>{item.emoji}</CardEmoji>
                   <CardText>{item.name}</CardText>
                       
                      
                       </AnimatedView>
                     
               )}
           />
         
        </Container>
    )
}
export default CardCheck;