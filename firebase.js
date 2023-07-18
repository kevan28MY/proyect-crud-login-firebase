
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
  import { getFirestore, collection, addDoc,getDocs,onSnapshot,deleteDoc,doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    //datos confidenciales de la base de datos firestore
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  
const db = getFirestore();

export const saveTask=async(title,description)=>{
  try {
    const docRef = await addDoc(collection(db, "tasks"), { title, description });
    
  } catch (error) {
    console.error("Error al guardar el registro:", error);
  }
}


export const getTasks=()=> getDocs(collection(db,'tasks'));

export const onGetTasks=(callback)=> onSnapshot(collection(db,'tasks'),callback);


export const deleteTask=id => deleteDoc(doc(db,'tasks',id));

export const getTask=(id) => getDoc(doc(db,'tasks',id));

export const updateTask=(id,newFields)=>updateDoc(doc(db,'tasks',id), newFields);