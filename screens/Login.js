import React, { useEffect, useState } from "react";
import styled from "styled-components";
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { googleSigninConfigure } from "../key";
import { AppleButton,appleAuth } from '@invertase/react-native-apple-authentication';
import {
    KakaoOAuthToken,
    KakaoProfile,
    getProfile as getKakaoProfile,
    login,
    logout,
    unlink,
  } from '@react-native-seoul/kakao-login';
  
const Container = styled.View`

`;
const Title = styled.Text``;
const GoogleLogin = styled.TouchableOpacity`
    margin-top: 30px;
    
`;
const GoogleLoginText = styled.Text``;
const GoogleImage = styled.Image`
    width: 192px;
    height: 48px;
`;
const KakaoLogin = styled.TouchableOpacity`
    margin-top: 30px;
    
`;
const KakaoLoginText = styled.Text``;
const KakaoImage = styled.Image`
   
`;
const Email= styled.TextInput`
    width: 200px;
    height: 50px;
    align-items: center;
    color: black;
    border-color: black;
    border: 5px;
`;
const Password = styled.TextInput`
     width: 200px;
    height: 50px;
    align-items: center;
    color: black;
    border-color: black;
    border: 5px;
`;
const Btn = styled.TouchableOpacity``;
const BtnText = styled.Text``;
const AppleLogin = styled.View`
    align-items: center;
    justify-content: center;
`;

const Login =()=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [result,setResult]= useState("");

useEffect(()=>{
    googleSigninConfigure();
},[])


const Google = async()=>{
 try {
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
 } catch (err) {
    console.log(err);
 }  
}
const Kakao = async()=>{
    try {
        const token = await login();
      const {kakaoToken} = JSON.stringify(token);
        
    } catch (err) {
        console.log(err);
    }
   
}
const Apple = async()=>{
    try {
        const appleAuthRequestResponse = await appleAuth.performRequest({
            requestedOperation: appleAuth.Operation.LOGIN,
            requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME],
          });
          if (!appleAuthRequestResponse.identityToken) {
            throw new Error('Apple Sign-In failed - no identify token returned');
          }
        
          // Create a Firebase credential from the response
          const { identityToken, nonce } = appleAuthRequestResponse;
          const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
        
          // Sign the user in with the credential
          return auth().signInWithCredential(appleCredential);
    } catch (e) {
        console.log(e);
    }
}
const Test = ()=>{
    try {
        console.log(email);
        auth().createUserWithEmailAndPassword(email,password);
    } catch (err) {
        console.log(err);
    }
   
}
const Login = ()=>{
    try{
        auth().signInWithEmailAndPassword(email,password);
    }catch(err){
        console.log(err);
    }
}

    return(
        <Container>
            <Title>Login</Title>
            <GoogleLogin
             onPress={Google}
             
             >
               <GoogleImage 
                source={require('../assets/googleBtn.png')}   
            />
            </GoogleLogin>
           <KakaoLogin onPress={Kakao}>
                <KakaoImage source={require('../assets/kakaoBtn.png')}/>
           </KakaoLogin>
           <AppleLogin>          
                <AppleButton 
                buttonStyle={AppleButton.Style.BLACK}
                buttonType={AppleButton.Type.SIGN_IN}
                style={{
                    width: 160,
                    height: 45,
                    
                }}
                onPress={Apple}
            />
           </AppleLogin>

           <Email 
            value={email}
            onChangeText={(text)=>setEmail(text)}
           />
           <Password 
            value={password}
            onChangeText={(text)=>setPassword(text)}
           />
           <Btn onPress={Test}>
            <BtnText>확인</BtnText>
           </Btn>
           <Btn onPress={Login}>
            <BtnText>로그인</BtnText>
           </Btn>
        </Container>
    )
}
export default Login;