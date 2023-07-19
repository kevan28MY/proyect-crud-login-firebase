import { saveCar,getCars,onGetCars,deleteCar,getCar, updateCar,saveCarWithImage,getStorageURL } from "./firebase.js"



const carForm=document.getElementById('car-form')
const carsContainer=document.getElementById('cars-container')

const carImageInput = document.getElementById("image-input");

const file = carForm["image-input"].files[0];


let editStatus=false
let id=''
window.addEventListener('DOMContentLoaded', async()=>{
  
  onGetCars( (querySnapshot)=>{ 
    carsContainer.innerHTML = "";
    // let html = "";
    querySnapshot.forEach(async (doc) => {
      const car=doc.data()
      const downloadURL = await getStorageURL(car.imageUrl);
      carsContainer.innerHTML += `
      <div class="card card-body mt-2 border-primary">
        <div class="row">
          <div class="col-md-6">
            <h3 class="h5">${car.title}</h3> 
            <p>${car.description}</p>
            <p>${car.cant}</p>
            <div>
              <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button>
              <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Update</button>  
            </div>
          </div>
          <div class="col-md-6">
            <br><img class="img" src="${downloadURL}" style="max-width: 60%; height: auto;" />
          </div>
        </div>
      </div>
    `;
    });
    
});
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



