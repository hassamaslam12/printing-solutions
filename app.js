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






  
 onAuthStateChanged(auth, (user) => {
    if (user) {
      return;
    } else {
     window.location.replace("./pages/index.html")
    }
  });



  window.signOutUser = function(){
      signOut(auth).then(() => {
            window.location.replace("./pages/index.html");

    }).catch((error) => {
      console.log(error);
    });
}



const dbRef = ref(getDatabase());
  
var tableData = [];


window.getDataFromDatabase = ()=>{
    
    get(child(dbRef, `products`)).then((snapshot) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
            tableData = snapshot.val();
            render();
        } else {
            console.log("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
}

getDataFromDatabase();

// var transactions = [{nameOfWorker:`hassam`,transaction:`took 4 printer at 04:00`}];
// set(ref(database, 'transactions/'), transactions);
var transactions= [];
get(child(dbRef, `transactions`)).then((snapshot) => {
    if (snapshot.exists()) {
        transactions = snapshot.val();
        console.log(transactions);
      
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});















// console.log("running");

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




window.render = () => {
    tableDataToBeRendered.innerHTML = "";
    tableData.forEach((item, index) => {
        tableDataToBeRendered.innerHTML += `
        <tr>
        <td>${index+1}</td>
            <td>${item.product}</td>
            <td>${item.quantity}</td>
            <td><input type="text" placeholder="Enter Name" id = "nameOfWorker"/></td>
            <td><input type="number" step="1" placeholder="Enter Quantity" id="quantityOftransaction"/></td>
            <td><button class="btn btn-dark" onclick="checkoutItem(${index})">checkout item</button></td>
            <td><button class="btn btn-dark" onclick="addItem(${index})">add item</button></td>
        </tr>
        `;
    });
    tableDataToBeRendered.innerHTML +=`<tr>
        <td colspan="5"><button class="btn btn-dark" onclick="addNewItem();">Add new item</button></td>
    </tr>`
}
// render()
// window.onload(render())


// window.checkPass = ( ) =>{
//     var promptAns = prompt('Enter your password');
//     if(promptAns === passwordForAdmin){
//         window.location.replace('./pages/admin.html');
//     }
// }

window.addNewItem = () => {


        var nameOfProduct = prompt('Enter the name of the product');
        var quantityOfProduct = prompt('Enter the quantity of the product');
        if(!nameOfProduct || isNaN(quantityOfProduct)){
            return;
        }
            tableData.push({
                product: nameOfProduct,
                quantity: quantityOfProduct,
            });
            
            set(ref(database, 'products/'), tableData);
        
    }
    // const newPostKey = push(child(ref(database), 'posts')).key;



render();

// console.log(x);
window.checkoutItem = (i) => {
    var nameOfWorker = document.getElementById('nameOfWorker').value;
    var quantityOftransaction = +document.getElementById('quantityOftransaction').value;
    if(!nameOfWorker || !quantityOftransaction){
        alert("enter valid details")
        return;
    }
    tableData[i].quantity -= quantityOftransaction;
    // console.log(tableData[i].quantity);
    // console.log(quantityOftransaction);
    set(ref(database, 'products/'+i), {
        product: tableData[i].product,
        quantity: tableData[i].quantity,
    }).then(function(){
        getDataFromDatabase()
    });

    var d = new Date(); // for now
d.getHours(); // => 9
d.getMinutes(); // =>  30
d.getSeconds(); // => 51
var x = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " on " + d.getDate()+ "/" + d.getMonth() + "/" + d.getFullYear();
    transactions.push(
        {
            nameOfWorker: nameOfWorker,
            transaction:`took ${quantityOftransaction} ${tableData[i].product} from inventory at ${x}`
        }
    );
    remove(ref(database,"transactions"));
    set(ref(database,"transactions"),transactions);
    
    // nameOfWorker.innerHTML =``

}
window.addItem = (i) => {
    var nameOfWorker = document.getElementById('nameOfWorker').value;
    var quantityOftransaction = +document.getElementById('quantityOftransaction').value;
    // tableData[i].quantity = parseInt(tableData[i].quantity);
    if(!nameOfWorker || !quantityOftransaction){
        alert("enter valid details")
        return;
    }
    var temp = tableData[i].quantity + quantityOftransaction;
    // var temp = eval(tempExp);
    // console.log(temp);
    // console.log(tableData);
    // temp = temp.toString()
    // temp = temp.toString(); 
    // tableData[i].quantity += quantityOftransaction;
    // console.log(tableData[i].quantity);
    // console.log(+quantityOftransaction);
    set(ref(database, 'products/'+i), {
        product: tableData[i].product,
        quantity: temp,
    }).then(function(){
        getDataFromDatabase()
    });






    var d = new Date(); // for now
    d.getHours(); // => 9
    d.getMinutes(); // =>  30
    d.getSeconds(); // => 51
    var x = d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() + " on " + d.getDate()+ "/" + d.getMonth() + "/" + d.getFullYear();


    transactions.push(
        {
            nameOfWorker: nameOfWorker,
            transaction:`added ${quantityOftransaction} ${tableData[i].product} to inventory at ${x}`
        }
    );
    remove(ref(database,"transactions"));
    set(ref(database,"transactions"),transactions);

}
// window.addEventListener("beforeunload", function (e) {
//     var confirmationMessage = "\o/";
//     signOutUser()
  
//     (e || window.event).returnValue = confirmationMessage; //Gecko + IE
//     return confirmationMessage;                            //Webkit, Safari, Chrome
//   });