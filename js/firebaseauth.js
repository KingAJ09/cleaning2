// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js"
import {getFirestore, setDoc, doc} from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB3z3ecIyA6t1l1lfWMfJwwur-itpOkX7I",
  authDomain: "spotless-a0df0.firebaseapp.com",
  projectId: "spotless-a0df0",
  storageBucket: "spotless-a0df0.firebasestorage.app",
  messagingSenderId: "365900969547",
  appId: "1:365900969547:web:8b5cd7ec8081670f3c7fce"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function() {
        messageDiv.style.opacity=0;
        
    }, 5000);
}

const signUp=document.getElementById("submitSignUp");
signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById("rEmail").value;
    const password=document.getElementById("rPassword").value;
    const firstName=document.getElementById("fName").value;
    const lastName=document.getElementById("lName").value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     // Signed in user
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName: lastName
        };
        showMessage('Account Created Successfully😎👍!!', 'signUpMessage');
        const docRef=doc(db, "users", user.uid);
        setDoc(docRef, userData)
        .then(()=>{
            window.location.href='home.html';
        })
        .catch((error) => {
            console.error("error writing document", error);
        
        });
    })
    .catch((error) => {
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Already Exists😒 !!!!', 'signUpMessage');
        }
        else{
            showMessage('Error Creating Account!!! Please Try Again😢', 'signUpMessage');
        }
        
    })
});

const signIn=document.getElementById('submitSignIn');
signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
        showMessage('✔ Login Successfully 😎👍!!', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='home.html';
    })
    .catch((error) => {
        const errorCode=error.code;
        if(errorCode=='auth/invalid-email'){
            showMessage('Invalid Email Address�🤦‍♂️!!!', 'signInMessage');
        }
        else if(errorCode=='auth/user-not-found'){
            showMessage('User Not Found�😒!!!', 'signInMessage');
        }
        else if(errorCode=='auth/wrong-password'){
            showMessage('Wrong Password�🤦‍♀️!!!', 'signInMessage');
        }
        else{
            showMessage('Error Logging In!!! Please Try Again👮‍♂️👮‍♂️', 'signInMessage');
        }
    })
})