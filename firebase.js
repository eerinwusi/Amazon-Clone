
const firebaseConfig = {
  apiKey: "AIzaSyAxNhI5db0FayDphO45KpraiHbjWLOQMFc",
  authDomain: "clone-3-d76ed.firebaseapp.com",
  projectId: "clone-3-d76ed",
  storageBucket: "clone-3-d76ed.appspot.com",
  messagingSenderId: "671856826336",
  appId: "1:671856826336:web:241f1cb5e07b018bf97d85",
  measurementId: "G-B5Z0Q3JQ8G"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const db = firebase.firestore();