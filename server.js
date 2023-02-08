var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var port = 3000;

var app = express();

var index = require('./routes/indexS');

// View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

// Set Static Folder
app.use(express.static(path.join(__dirname, 'client')));

// Body Parser Middle Ware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/', index);

app.listen(port, function(){
    console.log('Server started on port '+port);
});const firebaseAdmin = require('firebase-admin');
// you should manually put your service-account.json in the same folder app.js
// is located at.
var serviceAccount = require("path/to/serviceAccountKey.json");

// Kakao API request url to retrieve user profile based on access token
const requestMeUrl = 'https://kapi.kakao.com/v2/user/me?secure_resource=true';

// Initialize FirebaseApp with service-account.json
firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount)
  });


/**
 * requestMe - Returns user profile from Kakao API
 *
 * @param  {String} kakaoAccessToken Access token retrieved by Kakao Login API
 * @return {Promiise<Response>}      User profile response in a promise
 */
function requestMe(kakaoAccessToken) {
  console.log('Requesting user profile from Kakao API server.');
  return request({
    method: 'GET',
    headers: {'Authorization': 'Bearer ' + kakaoAccessToken},
    url: requestMeUrl,
  });
};


/**
 * updateOrCreateUser - Update Firebase user with the give email, create if
 * none exists.
 *
 * @param  {String} userId        user id per app
 * @param  {String} email         user's email address
 * @param  {String} displayName   user
 * @param  {String} photoURL      profile photo url
 * @return {Prommise<UserRecord>} Firebase user record in a promise
 */
function updateOrCreateUser(userId, email, displayName, photoURL) {
  console.log('updating or creating a firebase user');
  const updateParams = {
    provider: 'KAKAO',
    displayName: displayName,
  };
  if (displayName) {
    updateParams['displayName'] = displayName;
  } else {
    updateParams['displayName'] = email;
  }
  if (photoURL) {
    updateParams['photoURL'] = photoURL;
  }
  console.log(updateParams);
  return firebaseAdmin.auth().updateUser(userId, updateParams)
  .catch((error) => {
    if (error.code === 'auth/user-not-found') {
      updateParams['uid'] = userId;
      if (email) {
        updateParams['email'] = email;
      }
      return firebaseAdmin.auth().createUser(updateParams);
    }
    throw error;
  });
};


/**
 * createFirebaseToken - returns Firebase token using Firebase Admin SDK
 *
 * @param  {String} kakaoAccessToken access token from Kakao Login API
 * @return {Promise<String>}                  Firebase token in a promise
 */
function createFirebaseToken(kakaoAccessToken) {
  return requestMe(kakaoAccessToken).then((response) => {
    const body = JSON.parse(response);
    console.log(body);
    const userId = `kakao:${body.id}`;
    if (!userId) {
      return res.status(404)
      .send({message: 'There was no user with the given access token.'});
    }
    let nickname = null;
    let profileImage = null;
    if (body.properties) {
      nickname = body.properties.nickname;
      profileImage = body.properties.profile_image;
    }
    return updateOrCreateUser(userId, body.kaccount_email, nickname,
      profileImage);
  }).then((userRecord) => {
    const userId = userRecord.uid;
    console.log(`creating a custom firebase token based on uid ${userId}`);
    return firebaseAdmin.auth().createCustomToken(userId, {provider: 'KAKAO'});
  });
};


// create an express app and use json body parser
const app = express();
app.use(bodyParser.json());


// default root url to test if the server is up
app.get('/', (req, res) => res.status(200)
.send('KakaoLoginServer for Firebase is up and running!'));

// actual endpoint that creates a firebase token with Kakao access token
app.post('/verifyToken', (req, res) => {
  const token = req.body.token;
  if (!token) return res.status(400).send({error: 'There is no token.'})
  .send({message: 'Access token is a required parameter.'});

  console.log(`Verifying Kakao token: ${token}`);

  createFirebaseToken(token).then((firebaseToken) => {
    console.log(`Returning firebase token to user: ${firebaseToken}`);
    res.send({firebase_token: firebaseToken});
  });
});

// Start the server
const server = app.listen(process.env.PORT || '8000', () => {
  console.log('KakaoLoginServer for Firebase listening on port %s',
  server.address().port);
});
