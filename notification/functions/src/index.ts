import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
// import * as cors from 'cors';
// const corsHandler = cors({origin: true});
admin.initializeApp();



export const newNotification = functions.firestore.document('notification/{uid}')
    .onWrite(async(event) => {
        const title = event.after.get('title')
        const body = event.after.get('body')

        const payLoad = {
            notification:{
                title: title,
                body:body,
                sound: "default"
            }
        };
        console.log(payLoad);
          
        
        let response = await admin.messaging().sendToTopic('all',payLoad)
        console.log(response);
        

    })
