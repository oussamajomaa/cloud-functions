import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as cors from 'cors';
const corsHandler = cors({ origin: true });


admin.initializeApp();

const listAllUsers = async (nextPageToken: string | undefined = undefined) => {
	const listUsersResult = await admin
		.auth()
		.listUsers(1000, nextPageToken)
		.catch((error) => {
			console.log('Error listing users:', error);
		});

	if (!listUsersResult) throw new Error("Something went wrong...");

	return listUsersResult.users
};

export const getUser = functions.https.onRequest((req, res) => {
	corsHandler(req, res, async () => {
		const result = await listAllUsers()
		res.send(result);
	});
})

exports.randomNumber = functions.https.onRequest((req, res) => {
	admin.auth().createUser({})
	const number = Math.round(Math.random() * 100)
	res.send(number.toString())
})

// exports.newUser = functions.https.onRequest((req,res)=>{
// 	admin.auth().createUser({
// 		email:req.body.email,
// 		password:req.body.password
// 	}).then()
// })

exports.newUser = functions.https.onRequest((req, res) => {
	corsHandler(req, res, async () => {

		await admin
			.auth()
			.createUser({
				email: req.body.email,
				password: req.body.password,
				disabled: false,
			})
			.then((userRecord) => {
				// See the UserRecord reference doc for the contents of userRecord.
				
				console.log("Successfully created new user:", userRecord.uid)
			})
			.catch((error) => {
				console.log('Error creating new user:', error);
			});
	})
})



