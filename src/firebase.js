//firebase.js
import firebase from "firebase/compat/app"
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDC4urKLSKcxlKAV_4XotGqeYuSLnN-xCY",
    authDomain: "allttaemerona.firebaseapp.com",
    projectId: "allttaemerona",
    storageBucket: "allttaemerona.appspot.com",
    messagingSenderId: "738824971047",
    appId: "1:738824971047:web:b0287b2e6bae848e223f02",
    measurementId: "G-VCC1SYCXQY"
  };

// firebaseConfig 정보로 firebase 시작
firebase.initializeApp(firebaseConfig);

// firebase의 firestore 인스턴스를 변수에 저장
const firestore = firebase.firestore();

// 필요한 곳에서 사용할 수 있도록 내보내기
export { firestore };