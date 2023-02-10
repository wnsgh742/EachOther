import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GREY_COLOR } from "../styled/Colors";
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { Alert, Linking, Vibration } from "react-native";
import { Camera, CameraType, CameraScreen } from "react-native-camera-kit";
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
const CameraView = styled.View`
    flex:1;
`;
const ScannerView = styled.TouchableOpacity``;
const ScannerText = styled.Text``;
const QRscan =({navigation:{navigate}})=>{
    const [scaned, setScaned] = useState(true);
    const ref = useRef(null);
    const HomeBack = ()=>{
        navigate("Home");
       }
       const onSuccess = (e)=>{
            Linking.openURL(e.data).catch(err =>
                console.error(err)
                )
       }
       const onBarCodeRead = () => {
        if (!scaned) return;
        setScaned(false);
        Vibration.vibrate();
        Alert.alert("QR Code", event.nativeEvent.codeStringValue, [
          { text: "OK", onPress: () => setScaned(true) },
        ]);
      };
      
       useEffect(()=>{
        setScaned(true);
       },[])
    return(
        <Container>
            <HeaderView onPress={HomeBack}>
                <Ionicons name="chevron-back-outline" size={24} color="black" />
                <Title>Home</Title>
            </HeaderView>
         {/* 
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
         */}  
<CameraView>
<CameraScreen
  actions={{ rightButtonText: 'Done', leftButtonText: 'Cancel' }}
  onBottomButtonPressed={(event) => this.onBottomButtonPressed(event)}
  //flashImages={{
   // on: require('path/to/image'),
   // off: require('path/to/image'),
   // auto: require('path/to/image'),
  //}}
  //cameraFlipImage={require('path/to/image')}
  //captureButtonImage={require('path/to/image')}
  //torchOnImage={require('path/to/image')}
  //torchOffImage={require('path/to/image')}
  hideControls={false} // (default false) optional, hides camera controls
  showCapturedImageCount={false} // (default false) optional, show count for photos taken during that capture session
  
  // Barcode props
  scanBarcode={true}
  onReadCode={onBarCodeRead} //optional
  showFrame={true} //(default false) optional, show frame with transparent layer (qr code or barcode will be read on this area ONLY), start animation for scanner,that stoped when find any code. Frame always at center of the screen
  laserColor='red' // (default red) optional, color of laser in scanner frame
  frameColor='white' // (default white) optional, color of border of scanner frame
  ref={ref}
  cameraType={CameraType.Front} // Front/Back(default)
  zoomMode
  focusMode
 
/>
       
      </CameraView>
        </Container>
    )
}
export default QRscan;