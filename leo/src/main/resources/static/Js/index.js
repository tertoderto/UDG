function studentRegister(){
    const formStudentName = document.getElementById("studentName").value;
    const formStudentCode = document.getElementById("studentCode").value;
    const formStudentEmail = document.getElementById("studentEmail").value;
    const formStudentDegree = document.getElementById("studentDegree").value;
    const formStudentScore = document.getElementById("studentScore").value;

    const apiUrl = "http://localHost:8080/students"
    //crear el objeto
    const studentData = {
        code : formStudentCode,
        name : formStudentName,
        email : formStudentEmail,
        degree : formStudentDegree,
        score : formStudentScore
    };
    //crear el las acciones de coneccion
    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(studentData)
    };

    fetch(apiUrl, requestOptions)
        .then(response =>{
            if(!response.ok){
                throw new Error("HTTP error Status: " + response.status);
            }
            console.log(response.json());
        })
        .catch(error=>{
            console.error('Error: ',error);
        })
    //llamar a la url
    document.getElementById("studentName").value="";
    document.getElementById("studentCode").value="";
    document.getElementById("studentScore").value="";
    document.getElementById("studentEmail").value="";
    document.getElementById("studentDegree").value="";
}