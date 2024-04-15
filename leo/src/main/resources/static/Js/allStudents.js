function findStudent(){
    let findingStudentCode = document.getElementById("studentCode").value;
    console.log(findingStudentCode);
    const findingStudentUrl = "http://localhost:8080/students/code?code="+findingStudentCode;
    fetchDataAndPopulateTable(findingStudentUrl);
    document.getElementById("studentCode").value="";
}
async function fetchDataAndPopulateTable(url) {
    try {
        const response = await fetch(url);
        const students = await response.json();

        const tableBody = document.getElementById("tableBody");
        tableBody.innerHTML = '';

        try{
            students.forEach(currentStudent => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${currentStudent.id}</td>
                    <td>${currentStudent.code}</td>
                    <td>${currentStudent.name}</td>
                    <td>${currentStudent.email}</td>
                    <td>${currentStudent.degree}</td>
                    <td>${currentStudent.score}</td>
                    <td><button type="button" id="${currentStudent.id}" onclick="deleteStudentButton(id)" class="btn btn-danger">Delete</button></td>
                    <td><button type="button" id="${currentStudent.id}" onclick="editStudent(id)" class="btn btn-warning">Edit</button></td>
                `;
                row.setAttribute("id",currentStudent.id);
                tableBody.appendChild(row);
            })
        }catch (e){

            const row = document.createElement("tr");
            row.innerHTML = `
                    <td>${students.id}</td>
                    <td>${students.code}</td>
                    <td>${students.name}</td>
                    <td>${students.email}</td>
                    <td>${students.degree}</td>
                    <td>${students.score}</td>
                    <td><button type="button" id="${students.id}" onclick="deleteStudentButton(id)" class="btn btn-danger">Delete</button></td>
                    <td><button type="button" id="${students.id}" onclick="editStudent(id)" class="btn btn-warning">Edit</button></td>
                `;
            row.setAttribute("id",students.id);
            tableBody.appendChild(row);
        }

    } catch (error) {
        console.log("Error fetching data:", error);
    }
}

const url = "http://localhost:8080/students";
fetchDataAndPopulateTable(url);
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
            fetchDataAndPopulateTable(url);
        })
        .catch(error=>{
            console.log("there was a proiblem with the fetch operation: ",error)
        });
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
            console.log("Success "+data)
            fetchDataAndPopulateTable(url);
        })
        .catch(error=>{
            console.error('Error: ',error);
        })
}
function cancel(){
    fetchDataAndPopulateTable(url);
}