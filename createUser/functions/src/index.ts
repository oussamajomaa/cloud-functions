import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from 'cors';
const corsHandler = cors({origin: true});


admin.initializeApp();


export const createUser = functions.https.onRequest(async (req, res)=>{
    corsHandler(req, res, () => {});
    admin
        .auth()
        .createUser({
            uid: req.body.email,
            email: req.body.email,
            password: req.body.password,
            emailVerified: true,
            disabled: false,
        })
        .then((userRecord) => {
            // See the UserRecord reference doc for the contents of userRecord.
            console.log('Successfully created new user:', userRecord.uid);
        })
        .catch((error) => {
            console.log('Error creating new user:', error);
        });
})