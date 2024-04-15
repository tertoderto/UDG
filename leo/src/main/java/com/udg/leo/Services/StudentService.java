package com.udg.leo.Services;

import com.udg.leo.Models.StudentModel;
import com.udg.leo.Repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class StudentService {
    @Autowired
    StudentRepository studentRepository;

    //mostrar todos los estudiantes
    public ArrayList<StudentModel> getAllStudents(){
        return (ArrayList<StudentModel>) studentRepository.findAll();
    }
    //guardar estudiante
    public StudentModel saveStudent(StudentModel studentModel){
        if(studentRepository.findByCode(studentModel.getCode()).isEmpty()){
            return this.studentRepository.save(studentModel);
        }else {
            StudentModel studentError = new StudentModel();
            studentError.setId(-1L);
            return studentError;
        }

    }
    //editar
    public StudentModel editById(StudentModel studentModel){
        return studentRepository.save(studentModel);
    }
    //buscar por codigo
    public Optional<StudentModel> findByCode(String code){
        return studentRepository.findByCode(code);
    }
    //buscar por nombre
    public ArrayList<StudentModel> findByName(String name){
        return studentRepository.findByName(name);
    }
    //buscar por id
    public Optional<StudentModel> findById(long id){
        return studentRepository.findById(id);
    }
    //eliminar por id
    public String deleteStudent(long id){
        Optional<StudentModel> respuesta =studentRepository.findById(id);

        if(respuesta.isPresent()){
            studentRepository.deleteById(id);
            return"estudiante eliminado";
        }else{
            return"no se encontro un estudiante con ese id";
        }
    }

}
