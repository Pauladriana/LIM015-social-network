const firebaseConfig = {
  apiKey: 'AIzaSyAyGQEpYaCLstvnMVyXhRbjcWa55lxOJVg',
  authDomain: 'traveler-c61bb.firebaseapp.com',
  projectId: 'traveler-c61bb',
  storageBucket: 'traveler-c61bb.appspot.com',
  messagingSenderId: '705019484824',
  appId: '1:705019484824:web:b7699ce662aea2f1e1ceed',
  measurementId: 'G-G0ECPD95F6',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const fs = firebase.firestore();
firebase.analytics();
