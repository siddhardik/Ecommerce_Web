
const db=require("../models");
const Category=db.category;

const validatorCategoryRequest=(req,res,next)=>{
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the category can't be empty !"
        })
    }
    next();
}


const validatorProductRequest=(req,res,next)=>{
    
    if(!req.body.name){
        res.status(400).send({
            message:"Name of the product can't be empty !"
        })
        return ;
    }
    if(!req.body.cost){
        res.status(400).send({
            message:"Cost of the product can't be empty !"
        })
        return;
    }

    if(req.body.categoryId){
        Category.findByPk(req.body.categoryId)
        .then(category=>{
            if(!category){
                res.status(400).send({
                    message:"Category id passed is not availabe"
                })
                return;
            }
            next();
        })
        .catch(err=>{
            res.status(500).send({
                message:"Some internal error while fetching the product details"
            })
        })
    }else{
        res.status(400).send({
            message:"Category id was not passed"
        })
    }
    
}

module.exports={
    validatorCategoryRequest:validatorCategoryRequest,
    validatorProductRequest:validatorProductRequest
    
}