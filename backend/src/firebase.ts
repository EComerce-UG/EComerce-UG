// src/firebase.ts
import admin from "firebase-admin";

  const serviceAccount = JSON.parse(process.env.FIREBASE_ADMIN_KEY as string);

  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      storageBucket: "ecomerce-ug.appspot.com"
    });
  }

  export const db = admin.firestore();
  export const auth = admin.auth();
  export const bucket = admin.storage().bucket();
