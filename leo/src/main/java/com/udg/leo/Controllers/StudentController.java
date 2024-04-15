package com.udg.leo.Controllers;

import com.udg.leo.Models.StudentModel;
import com.udg.leo.Services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/students")//localhost:8080/students
public class StudentController {
    @Autowired
    StudentService studentService;

    //get
    @GetMapping()
    public ArrayList<StudentModel> getAllStudents(){
        return  studentService.getAllStudents();
    }

    //post
    @PostMapping()
    public StudentModel saveStudent(@RequestBody StudentModel studentModel){
        return studentService.saveStudent(studentModel);
    }
    //edit
    @PutMapping()
    public StudentModel updateStudent(@RequestBody StudentModel studentModel){
        return studentService.saveStudent(studentModel);
    }
    //search by code
    @GetMapping(path ="/code")//localhost:8080/students/{code}
    public Optional<StudentModel> findByCode(@RequestParam("code")String code){
        return studentService.findByCode(code);
    }
    //search by name
    @GetMapping(path ="/name")//localhost:8080/students/{name}
    public ArrayList<StudentModel> findByName(@RequestParam("name")String name){
        return studentService.findByName(name);
    }
    //search by id
    @GetMapping(path ="/id")//localhost:8080/students/{name}
    public Optional<StudentModel> findById(@RequestParam("id")long id){
        return studentService.findById(id);
    }
    @DeleteMapping(path="/delete")
    public String deleteStudentById(@RequestParam("id") long id){
        return studentService.deleteStudent(id);

    }

}