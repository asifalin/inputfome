
let nameInput = document.getElementById('name-input');
let fnameInput = document.getElementById('fname-input');
let addBtn = document.getElementById('add-btn');
let tableBody = document.getElementById('table-body');
let updateNameInput = document.getElementById('update-name-input');
let updateFnameInput = document.getElementById('update-fname-input');

let updateBtn = document.getElementById('update-btn');
let cancelBtn = document.getElementById('cancel-btn');
let users = JSON.parse(localStorage.getItem('users')) || [];
let currentUserId = null;
const valid = '';

function renderTable() {
  tableBody.innerHTML = "";
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    let tr = document.createElement("tr");
    let idTd = document.createElement("td");
    let nameTd = document.createElement("td");
    let fnameTd = document.createElement("td");
    let actionTd = document.createElement("td");
    let editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    let deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    idTd.innerText = user.id;
    nameTd.innerText = user.name;
    fnameTd.innerText = user.fname;
    editBtn.innerText = "Edit";
    deleteBtn.innerText = "Delete";
    editBtn.addEventListener("click", () => {
      showUpdateForm(user.id);
    })
addBtn.addEventListener("click", addUser);

 
let btn12 = document.getElementById("popup")
    deleteBtn.addEventListener("click", () => {
      if(btn12.style.display = "none"){
        btn12.style.display = "block"
      }
      let yesss = document.getElementById("popup-yasbtn")
      yesss.addEventListener('click' , ()=>{
        deleteUser(user.id);
        btn12.style.display = "none"
      })
      let nono = document.getElementById("popup-nobtn")
      nono.addEventListener('click' ,()=>{
        console.log("this is also working ")
        btn12.style.display = "none"

        
      })
    });
    actionTd.appendChild(editBtn);
    actionTd.appendChild(deleteBtn);
    tr.appendChild(idTd);
    tr.appendChild(nameTd);
    tr.appendChild(fnameTd);
    tr.appendChild(actionTd);
    tableBody.appendChild(tr);
  }
}


function addUser() {
  const name = nameInput.value.trim();
  const fname = fnameInput.value.trim();
  if (fname.match(valid)) {
    if (name !== "" && fname !== "") {
      let id = 1;
      let val = users.map(function(x) {return x.id; }).indexOf(id);
      while(val !== -1) {
        id++;
        val = users.map(function(x){return x.id; }).indexOf(id);
      }
      const user = {
        id: id,
        name: name,
        fname: fname
      };
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      fnameInput.value = "";
      nameInput.value = "";
      renderTable();
    } else {
      alert("Name and fname are required.");
    }
  }
}

function updateUser() {
  let name = updateNameInput.value;
  let fname = updateFnameInput.value;
  if (fname.match(valid)) {
    const index = users.findIndex((user) => user.id === currentUserId);
    if (index !== -1) {
      users[index].name = name;
      users[index].fname = fname;
      localStorage.setItem("users", JSON.stringify(users));
      hideUpdateForm();
      renderTable();
    }
  } 
}
// showUpdateForm

function showUpdateForm(userId) {
  const user = users.find((user) => user.id === userId);
  if (user) {
    updateNameInput.value = user.name;
    updateFnameInput.value = user.fname;
    currentUserId = user.id;
    updateBtn.addEventListener("click", updateUser);
    cancelBtn.addEventListener("click", hideUpdateForm);
    updateBtn.style.display = "inline-block";
    cancelBtn.style.display = "inline-block";
    updateNameInput.style.display = "inline-block";
    updateFnameInput.style.display = "inline-block";
    
    document.getElementById("update-container").style.display = "block";
  }
}

function hideUpdateForm() {
  updateNameInput.value = "";
  updateFnameInput.value = "";
  currentUserId = null;
  updateBtn.removeEventListener("click", updateUser);
  cancelBtn.removeEventListener("click", hideUpdateForm);
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
  updateNameInput.style.display = "none";
  updateFnameInput.style.display = "none";
  document.getElementById("update-container").style.display = "none";
}

function deleteUser(userId) {
  users = users.filter((user) => user.id !== userId);
  localStorage.setItem("users", JSON.stringify(users));
  if (users.length === 0) {
    hideUpdateForm();
  }
  renderTable();
}

// =========search=========

const searchInput = document.getElementById("search");
const table = document.querySelector("table");
searchInput.addEventListener("input", function () {
  searchRows(searchInput.value);
});
function searchRows(query) {
  
  const tbody = table.querySelector("tbody");
  const rows = Array.from(tbody.querySelectorAll("tr"));
  rows.forEach((row) => {
    const cells = row.querySelectorAll("td");
    let rowMatches = false;
    cells.forEach((cell) => {
      if (cell.textContent.toLowerCase().includes(query.toLowerCase())) {
        rowMatches = true;
      }
    });
    if (rowMatches) {
      row.style.display = "";
    } else {
      row.style.display = "none";
    }
  });
}

// Initialize table
renderTable();


