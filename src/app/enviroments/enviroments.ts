export const environment = {
production: false,
firebaseConfig: {
apiKey: "AIzaSyBk-E5ln9KJ2XjP3z086zOnx4EYUclMwRo",
    authDomain: "marcaje-93c32.firebaseapp.com",
    databaseURL: "https://marcaje-93c32.firebaseio.com",
    projectId: "marcaje-93c32",
    storageBucket: "marcaje-93c32.appspot.com",
    messagingSenderId: "4468632050"
 }
 };

 /*

curl https://fcm.googleapis.com/fcm/send \
     -H "Content-Type: application/json" \
     -H "Authorization: key='AIzaSyBk-E5ln9KJ2XjP3z086zOnx4EYUclMwRo'" \
     -d '{ "notification": {"title": "Test title", "body": "Test Body", "click_action" : "https://angularfirebase.com"},"to" : "'fAWN_fZptc4:APA91bG9YpD2u4x6YC531WFSvCSgRIxaq_imuSZNsKMCFh7WGOwXNLpi8E5SpE7V85cFOusJG2KdF3z1koWNA4IZNeQWqjgTt1kso5e4eqAD9yMCXUHZUQT3hxXw82-3IKs-YGqzY85r'"}'

curl -X POST -H "Authorization: AIzaSyBk-E5ln9KJ2XjP3z086zOnx4EYUclMwRo" -H "Content-Type: application/json" -d '{
"message":{
  "notification": {
    "title": "FCM Message",
    "body": "This is an FCM Message",
  },
  "token": "fAWN_fZptc4:APA91bG9YpD2u4x6YC531WFSvCSgRIxaq_imuSZNsKMCFh7WGOwXNLpi8E5SpE7V85cFOusJG2KdF3z1koWNA4IZNeQWqjgTt1kso5e4eqAD9yMCXUHZUQT3hxXw82-3IKs-YGqzY85r"
  }
}' "https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send"


curl -X POST -H "Authorization: key=AIzaSyBk-E5ln9KJ2XjP3z086zOnx4EYUclMwRo" -H "Content-Type: application/json" -d '{
"message":{
  "notification": {
    "title": "FCM Message",
    "body": "This is an FCM Message",
  },
 "token": "fAWN_fZptc4:APA91bG9YpD2u4x6YC531WFSvCSgRIxaq_imuSZNsKMCFh7WGOwXNLpi8E5SpE7V85cFOusJG2KdF3z1koWNA4IZNeQWqjgTt1kso5e4eqAD9yMCXUHZUQT3hxXw82-3IKs-YGqzY85r"
  }
}' "https://fcm.googleapis.com/v1/projects/myproject-b5ae1/messages:send"
 */