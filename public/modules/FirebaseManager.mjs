import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, query, addDoc, orderBy, limit, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBa9_3VgwQPKZ-70EJ-TAu7wKpS8ZiXlFs",
    authDomain: "top-down-survival-shooter.firebaseapp.com",
    projectId: "top-down-survival-shooter",
    storageBucket: "top-down-survival-shooter.appspot.com",
    messagingSenderId: "738570548916",
    appId: "1:738570548916:web:15b1fb08344951e55c89e1",
    measurementId: "G-H5D16R2PWL"
};

export const firebaseApp = initializeApp(firebaseConfig);
export const firestoreDatabase = getFirestore(firebaseApp);

const firebaseCollection = "leaderboard";

export function addData(name, score) {
    addDoc(collection(firestoreDatabase, firebaseCollection), {
        name: name,
        score: score,
    });
}

export async function getData(dataLimit) {
    const leaderboardRef = collection(firestoreDatabase, "leaderboard");
    const q = query(leaderboardRef, orderBy("score", "desc"), limit(dataLimit));
    return await getDocs(q);
}

