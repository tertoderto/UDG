package com.udg.leo.Repositories;


import com.udg.leo.Models.StudentModel;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface StudentRepository extends CrudRepository<StudentModel,Long> {
    public abstract Optional<StudentModel>findByCode(String code);
    public abstract ArrayList<StudentModel>findByName(String name);
    public abstract Optional<StudentModel> findById(long id);

}