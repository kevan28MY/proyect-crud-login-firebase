import { saveTask,getTasks,onGetTasks,deleteTask,getTask, updateTask } from "./firebase.js"



const taskForm=document.getElementById('task-form')
const tasksContainer=document.getElementById('tasks-container')
let editStatus=false
let id=''
window.addEventListener('DOMContentLoaded', async()=>{
  
  onGetTasks( (querySnapshot)=>{
    let html = "";
    querySnapshot.forEach(doc => {
      const task=doc.data()
      html +=`
          <div class="card card-body mt-2 border-primary">
            <h3 class="h5">${task.title}</h3> 
            <p>${task.description}</p>
            <div>
              <button class="btn btn-primary btn-delete" data-id="${doc.id}">Delete</button>
              <button class="btn btn-secondary btn-edit" data-id="${doc.id}">Update</button>  
            </div>

          </div>
        `;
    });
    tasksContainer.innerHTML = html

    const btnsDelete = tasksContainer.querySelectorAll('.btn-delete')

    btnsDelete.forEach(btn=>{
      btn.addEventListener("click", ({target:{dataset}})=> {
          deleteTask(dataset.id)
          
          taskForm['btn-task-save'].innerHTML='Guardar'
      })
    })

    const btnsEdit = tasksContainer.querySelectorAll('.btn-edit')
    btnsEdit.forEach(btn=>{
      btn.addEventListener("click", async e=> {
          const taskDoc= await getTask(e.target.dataset.id) 
          const task=taskDoc.data();

          taskForm['task-title'].value=task.title
          taskForm['task-description'].value=task.description
          editStatus=true;
          id=taskDoc.id;

          taskForm['btn-task-save'].innerHTML='Update'
          // Bloquear el botón de eliminar
          const deleteButton = e.target.parentElement.querySelector('.btn-delete');
          deleteButton.disabled = true;
      })
    })



  } );
  
});


taskForm.addEventListener('submit',async(e)=>{
  e.preventDefault();
  const titleValue = taskForm["task-title"].value;
  const descriptionValue = taskForm["task-description"].value;

  if (!editStatus) {
    saveTask(titleValue, descriptionValue);
  } else {
    updateTask(id, {
      title: titleValue,
      description: descriptionValue,
    });
    editStatus = false;
    
  }
  taskForm.reset();
})