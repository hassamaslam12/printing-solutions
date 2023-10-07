import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getDatabase,set,ref,child,get,push, onValue,onChildAdded,remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-auth.js";


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

  const dbRef = ref(getDatabase());
  var passwordForAdmin;


  onAuthStateChanged(auth, (user) => {
    if (user) {
      return;
    } else {
     window.location.replace("../index.html")
    }
  });





  get(child(dbRef, `adminPass`)).then((snapshot) => {
    if (snapshot.exists()) {
    //   console.log(snapshot.val());
      passwordForAdmin = snapshot.val();
      passwordForAdmin = passwordForAdmin.pass;
      //   console.log(passwordForAdmin);
      
var promptAns = prompt('Enter your password');
if(promptAns === passwordForAdmin){
    return
}
} else {
        window.location.replace('../index.html');
        // console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});




var hamburgerIcon = document.getElementById('hamburgerIcon');
var hamburger = document.getElementById('hamburger');
var actualPage = document.getElementById('actualPage');
var categories = document.getElementById('categories');
var tableDataToBeRendered = document.getElementById('tableDataToBeRendered')

hamburgerIcon.addEventListener('click', () => {
    if(hamburger.className==="hamburger"){

        hamburger.classList.add('hamburgerExpanded');
        actualPage.classList.add('actualPageMinimized')
        categories.style.display = "inline";
    }else{
        
        categories.style.display = "none";
        actualPage.classList.remove('actualPageMinimized')
        hamburger.classList.remove('hamburgerExpanded');
    }


})


var transactions= [];
onValue(ref(database,"transactions"), (snapshot) => {
    const data = snapshot.val();
    // updateStarCount(postElement, data);
    // console.log(data);
    var cardsToBeRendered =document.getElementById("cardsToBeRendered");
    cardsToBeRendered.innerHTML = "";
    var cardsLength = data.length-1;
    // console.log(cardsLength);
    for (var i = 0; i < data.length;i++) {
        // console.log("1");
        cardsToBeRendered.innerHTML += ` <div class="card mt-2 ps-3">
        <h4 id="nameOfWorkerDipslay">
        ${data[i].nameOfWorker}
            
        </h4>
        <p id="transactionDisplay">
        ${data[i].transaction}
        </p>
    </div>` 
    }
    // console.log(data[0].transaction);
    // console.log(cardsToBeRendered);
  });