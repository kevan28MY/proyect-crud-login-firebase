
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
  import { getFirestore, collection, addDoc,getDocs,onSnapshot,deleteDoc,doc,getDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
  import { getStorage, ref, uploadBytes} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  const firebaseConfig = {
    //datos confidenciales de la base de datos firestore
    apiKey: "AIzaSyDeXI7CbOUN67lt63wLzL7jLW-CjerrilE",
    authDomain: "hotwheels-93f09.firebaseapp.com",
    projectId: "hotwheels-93f09",
    storageBucket: "hotwheels-93f09.appspot.com",
    messagingSenderId: "267155086369",
    appId: "1:267155086369:web:1959cc39bd56c6c1d0d760",
    storageBucket: ''
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();


  
  const storage = getStorage(app);

  // export const getDownloadURL = (filePath) => {
  //   const storageRef = ref(storage, filePath);
  //   return storageRef.getDownloadURL();
  // };
 

export const saveCar=async(title,description,cant,  imageUrl)=>{
  try {
    const docRef = await addDoc(collection(db, "cars"), { title, description,cant, imageUrl });
    
  } catch (error) {
    console.error("Error al guardar el registro:", error);
  }
}


export const getCars=()=> getDocs(collection(db,'cars'));

export const onGetCars=(callback)=> onSnapshot(collection(db,'cars'),callback);


export const deleteCar=id => deleteDoc(doc(db,'cars',id));

export const getCar=(id) => getDoc(doc(db,'cars',id));

export const updateCar=(id,newFields)=>updateDoc(doc(db,'cars',id), newFields);

////////////////////////////////////////////////////////////////
export const saveCarWithImage = async (title, description, cant, file) => {
  try {
    const storageRef = ref(storage, "car-images/" + file.name);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    await saveCar(title, description, cant, downloadURL);
  } catch (error) {
    console.log(error);
  }
};

export const getDownloadURL = async (filePath) => {
  try {
    const fileRef = ref(storage, filePath);
    const downloadURL = await getDownloadURL(fileRef);
    return downloadURL;
  } catch (error) {
    console.log("Error al obtener la URL de descarga:", error);
    throw error;
  }
};