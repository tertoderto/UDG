
let ids=[];
let codes = [];
let names = [];
let emails = [];
let degrees = [];
let scores = [];
let i =0;
async function fetchAndPopulateTable(url) {
    const globalResponse = await fetch(url);
    const globalStudents = await globalResponse.json();
    try {
        globalStudents.forEach(currentStudent => {
            ids.push(currentStudent.id);
            codes.push(currentStudent.code);
            names.push(currentStudent.name);
            emails.push(currentStudent.email);
            degrees.push(currentStudent.degree);
            scores.push(currentStudent.score);
        })
        populateTable();
    } catch (error) {
    console.log("Error fetching data:", error);
    }
}
const url = "http://localhost:8080/students";
fetchAndPopulateTable(url);
function populateTable(){
    const tableBody = document.getElementById("tableBody");
    tableBody.innerHTML = '';
    ids.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
                    <td>${ids[i]}</td>
                    <td>${codes[i]}</td>
                    <td>${names[i]}</td>
                    <td>${emails[i]}</td>
                    <td>${degrees[i]}</td>
                    <td>${scores[i]}</td>
                    <td><button type="button" id="${ids[i]}" onclick="deleteStudentButton(id)" class="btn btn-danger">Delete</button></td>
                    <td><button type="button" id="${ids[i]}" onclick="editStudent(id)" class="btn btn-warning">Edit</button></td>
                `;
        row.setAttribute("id",ids[i]);
        tableBody.appendChild(row);
        i++;
    })
    i=0;
}
function findStudent(){
    let findingStudentCode = document.getElementById("studentCode").value;
    populateTableByCode(findingStudentCode);
    document.getElementById("studentCode").value="";
}
function populateTableByCode(id){
    let studentExist = false;
    let length = codes.length;
    for(let j=0;j<length;j++) {
        if(codes[j]==id) {
            const tableBody = document.getElementById("tableBody");
            tableBody.innerHTML = '';
            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${ids[j]}</td>
                    <td>${codes[j]}</td>
                    <td>${names[j]}</td>
                    <td>${emails[j]}</td>
                    <td>${degrees[j]}</td>
                    <td>${scores[j]}</td>
                    <td><button type="button" id="${ids[j]}" onclick="deleteStudentButton(id)" class="btn btn-danger">Delete</button></td>
                    <td><button type="button" id="${ids[j]}" onclick="editStudent(id)" class="btn btn-warning">Edit</button></td>
                `;
            row.setAttribute("id", ids[j]);
            tableBody.appendChild(row);
            studentExist=true;
        }
    }
    if(!studentExist){
        alert("there is no student with that code");
    }
}

function deleteStudent(id){
    const deleteUrl = "http://localhost:8080/students/delete?id="+id;
    fetch(deleteUrl,{
        method: 'DELETE',
        headers: {
            'content-Type': 'application/json'
        },
    })
        .then(response =>{
            if(!response.ok){
                throw new Error("Network response is not ok");
            }
            return response;
        })
        .then(data=>{
            console.log("item deleted succesfully: "+data)
            deleteById(id);
            i=0;
            populateTable();
        })
        .catch(error=>{
            console.log("there was a problem with the fetch operation: ",error)
        });
}

function deleteById(id){
    let length = ids.length;
    for(let j=0;j<length;j++) {
        if(ids[j] == id){
            ids.splice(j,1);
            codes.splice(j,1);
            names.splice(j,1);
            emails.splice(j,1);
            degrees.splice(j,1);
            scores.splice(j,1);
        }
    }
}
function deleteStudentButton(id){
    if(confirm("Are you sure you want to delete the student with id = " + id)){
        deleteStudent(id);
    } else {
        console.log("No changes were made to the student.");
    }
}

function editStudent(id){
    //todo: conocer el id del usuario a editar,cambiar las propiedades de las filas pra poder editar
    //cambiar el txto del boton y color
    let currentRow = document.getElementById(id);

    let codeCell = currentRow.children.item(1);
    let nameCell = currentRow.children.item(2);
    let emailCell = currentRow.children.item(3);
    let degreeCell = currentRow.children.item(4);
    let scoreCell = currentRow.children.item(5);

    codeCell.setAttribute("contenteditable","true");
    nameCell.setAttribute("contenteditable","true");
    emailCell.setAttribute("contenteditable","true");
    degreeCell.setAttribute("contenteditable","true");
    scoreCell.setAttribute("contenteditable","true");

    currentRow.children.item(1).focus();

    let editButton = currentRow.children.item(7).children.item(0);
    editButton.setAttribute("class","btn btn-success");
    editButton.innerHTML = "Save";
    editButton.setAttribute("onClick","saveStudent("+id+")");
    let cancelButton = currentRow.children.item(6).children.item(0);
    cancelButton.innerHTML = "Cancel";
    cancelButton.setAttribute("onClick","cancel()");
}
function saveStudent(id){
    let currentRow = document.getElementById(id);

    let codeCell = currentRow.children.item(1).innerHTML;
    let nameCell = currentRow.children.item(2).innerHTML;
    let emailCell = currentRow.children.item(3).innerHTML;
    let degreeCell = currentRow.children.item(4).innerHTML;
    let scoreCell = currentRow.children.item(5).innerHTML;
    const editStudent ={
        id: id,
        code:codeCell,
        name:nameCell,
        email: emailCell,
        degree:degreeCell,
        score:scoreCell
    }
    const editUrl ="http://localhost:8080/students"
    const requestOptions = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(editStudent)
    };
    fetch(editUrl, requestOptions)
        .then(response =>{
            if(!response.ok){
                throw new Error("HTTP error Status: " + response.status);
            }
            console.log(response.json());
        })
        .then(data=>{
            console.log("Success "+data);
            saveById(id,codeCell,nameCell,emailCell,degreeCell,scoreCell);
            populateTable();
        })
        .catch(error=>{
            console.error('Error: ',error);
        })
}
function saveById(id,codeCell,nameCell,emailCell,degreeCell,scoreCell){
    let length = ids.length;
    for(let j=0;j<length;j++) {
        if(ids[j] == id){
            codes[j]=codeCell;
            names[j]=nameCell;
            emails[j]=emailCell;
            degrees[j]=degreeCell;
            scores[j]=scoreCell;
        }
    }
}
function cancel(){
    populateTable();
}