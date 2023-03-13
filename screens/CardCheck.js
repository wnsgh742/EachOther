import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, FlatList, LayoutAnimation, PanResponder, ScrollView, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import styled from "styled-components";

import ProfileInfodata from "../assets/ProfileInfodata/ProfileInfodata";
import ProfileColor from "../assets/ProfileInfodata/CardColor";
import { FaceDetector } from "react-native-camera";
const Container = styled.View`
    flex: 1;
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
const FourFlatList = styled.FlatList``;
const CardView = styled.TouchableOpacity`
    width: 85px;
    height: 150px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
   
    margin-left: 15px;
`;
const AnimatedBox = Animated.createAnimatedComponent(CardView);
const TTT = styled.TouchableOpacity`
    width: 85px;
    height: 150px;
    border-radius: 20px;
`;
const CardText = styled.Text``;
const CardEmoji = styled.Text`
    margin-bottom: 15px;
    margin-left: 30px;
`;
const CardCheck  = ({navigation:{navigate,goBack}, route})=>{
    const [cardData , setCardData] = useState(ProfileInfodata);
    const [cardColor , setCardColor] = useState(ProfileColor);
    const scale = useRef(new Animated.Value(1)).current;
   
    const panResponder = useRef(PanResponder.create({
        onStartShouldSetPanResponder:()=>true,
        onPanResponderGrant:()=>onPressIn(),
        onPanResponderRelease:()=>onPressOut(),
        
    })).current;

    const onPressIn=()=>{Animated.spring(scale,{toValue:0.95, useNativeDriver:true}).start();}
    
    const onPressOut=()=>{Animated.spring(scale,{toValue:1, useNativeDriver:true}).start();}
    
const GoBack = ()=>{
   goBack();
}
const CardBackGround = ()=>{
    const randomColor = Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0');
     return `#${randomColor}`;
}
useEffect(()=>{
    console.log(cardData[0]);
},[])
    return(
        <Container>
            <HeaderView onPress={GoBack}>
                <HeaderText>뒤로가기</HeaderText>
            </HeaderView>
       
            <Animated.FlatList 
               
                horizontal={true}
                data={cardData[0]}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                        
                   
                   <AnimatedBox
                     {...panResponder.panHandlers}
                     style={{
                         transform:[{scale}],
                        backgroundColor:CardBackGround(),
                     }}
                     
                   >
                    <CardEmoji>{item.emoji}</CardEmoji>
                    <CardText>{item.name}</CardText>
                        
                       
                        </AnimatedBox>
                      
                )}
            />
            <SecondFlatList 
               
               horizontal={true}
               data={cardData[1]}
               keyExtractor={(item)=>item.id}
               renderItem={({item})=>(
                       
                  
                  <AnimatedBox
                    {...panResponder.panHandlers}
                    style={{
                        transform:[{scale}],
                       backgroundColor:CardBackGround(),
                    }}
                    
                  >
                   <CardEmoji>{item.emoji}</CardEmoji>
                   <CardText>{item.name}</CardText>
                       
                      
                       </AnimatedBox>
                     
               )}
           />
            <ThirdFlatList 
               
               horizontal={true}
               data={cardData[2]}
               keyExtractor={(item)=>item.id}
               renderItem={({item})=>(
                       
                  
                  <AnimatedBox
                    {...panResponder.panHandlers}
                    style={{
                        transform:[{scale}],
                       backgroundColor:CardBackGround(),
                    }}
                    
                  >
                   <CardEmoji>{item.emoji}</CardEmoji>
                   <CardText>{item.name}</CardText>
                       
                      
                       </AnimatedBox>
                     
               )}
           />
            <FourFlatList 
               
               horizontal={true}
               data={cardData[3]}
               keyExtractor={(item)=>item.id}
               renderItem={({item})=>(
                       
                  
                  <AnimatedBox
                    {...panResponder.panHandlers}
                    style={{
                        transform:[{scale}],
                       backgroundColor:CardBackGround(),
                    }}
                    
                  >
                   <CardEmoji>{item.emoji}</CardEmoji>
                   <CardText>{item.name}</CardText>
                       
                      
                       </AnimatedBox>
                     
               )}
           />
         
        </Container>
    )
}
export default CardCheck;