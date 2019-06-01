//Code below is for future implementation and reference.

// import * as functions from "firebase-functions";
// import * as admin from "firebase-admin";

// admin.initializeApp(functions.config().firebase);

// const adminFirestore = admin.firestore();

// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// //
// export const helloWorld = functions.https.onRequest((request, response) => {
//   response.send("Hello from Firebase!");
// });

// export const getAllPlants = functions.https.onRequest(
//   async (request, response) => {
//     const snapshot = await adminFirestore.collection("garden").get();
//     const gardens = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//     response.json({ gardens });
//   }
// );

// export const sanitizeContent = functions.firestore
//   .document(`garden/{gardenId}`)
//   .onWrite(async change => {
//     if (!change.after.exists) return;
//     const { content, santitized } = change.after.data() as any;
//     if (content && !santitized) {
//       return change.after.ref.update({
//         content: content.replace(/CoffeeScript/g, "*******"),
//         santitized: true
//       });
//     }
//     return null;
//   });
