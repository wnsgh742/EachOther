import React from "react";
import styled from "styled-components";
import QRCode from "react-native-qrcode-svg";
const Container = styled.View`
    margin-top: 30px;
    align-items: center;
`;
const Title = styled.Text``;

const QRgenerator =()=>{
    return(
        <Container>
            <Title>QRgenerator</Title>
            <QRCode 
                value="asd"
                
            />
        </Container>
    )
}
export default QRgenerator;