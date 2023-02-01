import React from "react";
import styled from "styled-components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GREY_COLOR } from "../styled/Colors";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Linking } from "react-native";
const Container = styled.View`
    flex: 1;
`;
const Title = styled.Text`
    font-size: 22px;
`;
const HeaderView = styled.TouchableOpacity`
    flex-direction: row;
   
    margin-top: 50px;
`;
const ScannerView = styled.TouchableOpacity``;
const ScannerText = styled.Text``;
const QRscan =({navigation:{navigate}})=>{
    const HomeBack = ()=>{
        navigate("Home");
       }
       const onSuccess = (e)=>{
            Linking.openURL(e.data).catch(err =>
                console.error(err)
                )
       }
    return(
        <Container>
            <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="Black" />
                <Title>Home</Title>
            </HeaderView>
            <QRCodeScanner 
                onRead={onSuccess}
                flashMode={RNCamera.Constants.FlashMode.torch}
                topContent={
                    <ScannerText>QRscan</ScannerText>
                }
                bottomContent={
                    <ScannerView>
                        <ScannerText>OK</ScannerText>
                    </ScannerView>
                }
            />
        </Container>
    )
}
export default QRscan;