import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,set,ref,child,get,push, onValue,onChildAdded } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


  const firebaseConfig = {
    apiKey: "AIzaSyAUt8QpD94wGyxFZgIkoMS1Ujg_r3seWUs",
    authDomain: "printingsolution-ltd.firebaseapp.com",
    projectId: "printingsolution-ltd",
    storageBucket: "printingsolution-ltd.appspot.com",
    messagingSenderId: "1036577161854",
    appId: "1:1036577161854:web:71e21b33648a06c4c28e2f"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const database = getDatabase(app);

  var email,password;


  window.loginUser = () => {
      email = document.getElementById('email').value;
      password = document.getElementById('password').value;
 
      if(!email || !password){
          alert('Please enter valid info')
          
        }
    
    signInWithEmailAndPassword(auth,email,password)
    .then(function(response){
      window.location.replace('../index.html');
    })
    .catch(function(err){
      alert(err);
    });
  }