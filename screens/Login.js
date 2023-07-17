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
import { PEACH_COLOR } from "../styled/Colors";
import {
    responsiveHeight,
    responsiveWidth,
    responsiveFontSize
  } from "react-native-responsive-dimensions";
  
const Container = styled.View`
    flex: 1;
  
`;
const LoginView = styled.View`
    align-items: center;
    margin-top: 20px;
    
`;
const ConfrimView= styled.View`
    flex-direction: row;
    padding: 10px;
    justify-content: center;
    width: 250px;
    align-items: center;
`;
const SocialView = styled.View`
    align-items: center;
    padding: 3px;
    
    
`;
const Title = styled.Text``;
const GoogleLogin = styled.TouchableOpacity`
    margin-top: 20px;
   
`;
const GoogleLoginText = styled.Text``;
const GoogleImage = styled.Image`
   height: 35px;
   width: 300px;
`;
const KakaoLogin = styled.TouchableOpacity`
   
   
`;
const KakaoLoginText = styled.Text``;
const KakaoImage = styled.Image`
   height: 35px;
   width: 293px;
   margin-top: 10px;
   
`;
const Email= styled.TextInput`
    width: 200px;
    height: 50px;
    align-items: center;
   border: 2px;
  border-radius: 18px;
  border-color: ${PEACH_COLOR};
  
`;
const Password = styled.TextInput`
     width: 200px;
    height: 50px;
    align-items: center;
    border: 2px;
    margin-top: 5px;
    border-radius: 18px;
    border-color: ${PEACH_COLOR};
   
`;
const Btn = styled.TouchableOpacity`
    
`;
const BtnText = styled.Text``;
const AppleLogin = styled.View`
    align-items: center;
    justify-content: center;
    margin-top: 10px;
`;
const TitleImageView = styled.View`
    align-items: center;
    margin-top: 100px;
`;
const TitleImage = styled.Image`
   width: 200px;
   height:200px;
   border-radius: 40px;
`;
const Login =()=>{
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [result,setResult]= useState("");
 //   const auth = getAuth()

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
            <TitleImageView>
            <TitleImage 
                source={require('../assets/mlbw_logo.png')}
            />
            </TitleImageView>
            <LoginView>
            <Email 
            value={email}
            onChangeText={(text)=>setEmail(text)}
            placeholder="Email"
            textAlign="left"
           />
           <Password 
            value={password}
            onChangeText={(text)=>setPassword(text)}
            placeholder="Password"
            secureTextEntry={true}  

           />
           <ConfrimView>
           <Btn onPress={Login}>
            <BtnText>로그인</BtnText>
           </Btn>
           <Btn onPress={Test}>
            <BtnText>가입하기</BtnText>
           </Btn>
           </ConfrimView>

           </LoginView>
           <SocialView>
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
                    width: 293,
                    height: 35,
                    
                }}
                onPress={()=>Apple()}
            />
           </AppleLogin>
        
          </SocialView>
        </Container>
    )
}
export default Login;