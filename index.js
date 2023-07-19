import { saveCar,getCars,onGetCars,deleteCar,getCar, updateCar,saveCarWithImage,getDownloadURL } from "./firebase.js"



const carForm=document.getElementById('car-form')
const carsContainer=document.getElementById('cars-container')

const carImageInput = document.getElementById("image-input");

const fileData = document.querySelector(".filedata");
let editStatus=false
let id=''
window.addEventListener('DOMContentLoaded', async()=>{
  
  onGetCars( (querySnapshot)=>{
    let html = "";
    querySnapshot.forEach(async (doc) => {
      const car=doc.data()
      //const carId = doc.id;
      const downloadURL = await getDownloadURL(`car-images/${doc.id}`);
      const html =`
          <div class="card card-body mt-2 border-primary">
            <h3 class="h5">${car.title}</h3> 
            <p>${car.description}</p>
            <p>${car.cant}</p>
            <img class="img" src="${downloadURL}" />
            <div>
              <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button>
              <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Update</button>  
            </div>

          </div>
        `;
    });
    carsContainer.innerHTML += html;

    const btnsDelete = carsContainer.querySelectorAll('.btn-delete')

    btnsDelete.forEach(btn=>{
      btn.addEventListener("click", ({target:{dataset}})=> {
          deleteCar(dataset.id)
          
          carForm['btn-car-save'].innerHTML='Guardar'
      })
    })

    const btnsEdit = carsContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn=>{
      btn.addEventListener("click", async e=> {
          const carDoc= await getCar(e.target.dataset.id) 
          const car=carDoc.data();

          carForm['car-title'].value=car.title
          carForm['car-description'].value=car.description
          carForm['car-cant'].value=car.cant
          editStatus=true;
          id=carDoc.id;

          carForm['btn-car-save'].innerHTML='Update'
          // Bloquear el botón de eliminar
          const deleteButton = e.target.parentElement.querySelector('.btn-delete');
          deleteButton.disabled = true;
      })
    })



  } );
  
});


// carImageInput.addEventListener("change", (e) => {
//   const file = e.target.files[0];
//   const fileName = Math.round(Math.random() * 9999) + file.name;
//   // if (fileName) {
//   //   fileData.style.display = "block";
//   // }
//   // fileData.innerHTML = fileName;
//   console.log("nombre: "+ fileName);
//   const reader = new FileReader();
//   reader.onload = function (e) {
//     const img = document.querySelector('.img');
//     img.src = e.target.result;
//   };
//   reader.readAsDataURL(file);


// });
/////////////////////////////////////////////
carForm.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const titleValue = carForm["car-title"].value;
  const descriptionValue = carForm["car-description"].value;
  const cantValue = carForm["car-cant"].value;
  const file = carForm["image-input"].files[0];
  if (!editStatus) {
    
    saveCarWithImage(titleValue, descriptionValue, cantValue, file);
  } else {
    updateCar(id, {
      title: titleValue,
      description: descriptionValue,
      cant: cantValue
    });
    editStatus = false;
    
  }
  carForm.reset();
})



