import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBMoK5LWNmVK7JlZP3YtLH4uuq6XgasrLI',
  authDomain: 'dailyspendly.firebaseapp.com',
  projectId: 'dailyspendly',
  storageBucket: 'dailyspendly.firebasestorage.app',
  messagingSenderId: '821611034975',
  appId: '1:821611034975:web:cdba976a90f60113f81eea',
  measurementId: 'G-GDP1007Z8V',
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
