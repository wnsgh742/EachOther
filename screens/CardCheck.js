import React, { useEffect, useRef, useState } from "react";
import { Animated, Button, FlatList, LayoutAnimation, PanResponder, ScrollView, TouchableOpacity, TouchableOpacityBase, View } from "react-native";
import styled from "styled-components";

import ProfileInfodata from "../assets/ProfileInfodata/ProfileInfodata";
import ProfileColor from "../assets/ProfileInfodata/CardColor";
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
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
const CardContainer = styled.View``;
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const FourFlatList = styled.FlatList``;
const CardView = styled.View`
    width: 85px;
    height: 150px;
    border-radius: 20px;
    justify-content: center;
    align-items: center;
   
    margin-left: 15px;
`;
const AnimatedView = Animated.createAnimatedComponent(CardView);

const Box = styled.TouchableOpacity`
      background-color: tomato;
  width: 200px;
  height: 200px;
`;
const AnimatedBox = Animated.createAnimatedComponent(Box);
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
    const X = new Animated.Value(0);
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
        toValue:-200,
        bounciness:15,
        useNativeDriver:true,
  
      }).start();

};
useEffect(()=>{
  //  GetCard();
},[])
    return(
        <Container>
            <HeaderView onPress={GoBack}>
                <HeaderText>뒤로가기</HeaderText>
                <AnimatedBox 
                    	onPress={moveUp} 
                        styled={{
                        transform: [{translateX : X}],
                    }}
                />

            
            </HeaderView>
       
            <AnimatedFlatList 
               
                horizontal={true}
                data={cardData[0]}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>(
                   
                  
                   <AnimatedView
                    {...panResponder.panHandlers}
                    style={{
                        transform:[{scale}],
                       backgroundColor:CardBackGround(),
                    }}
                   //  onPress={()=>CardCollect(item)}
                   >
                
                    <CardEmoji>{item.emoji}</CardEmoji>
                    <CardText>{item.name}</CardText>
                  
                   
                        
                    </AnimatedView> 
                   
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
                        transform:[{scale}],
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
                        transform:[{scale}],
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
                        transform:[{scale}],
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