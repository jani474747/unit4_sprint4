const express=require("express")

const mongoose= require("mongoose")


 
const app= express()
app.use(express.json())

const connect= ()=>{
    return mongoose.connect("mongodb+srv://riyazMongo:Riyaz123@cluster0.nfiqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
}

// user schema
const userSchema= new mongoose.Schema({
    firstName:{type:String,required:true},
    lastName:{type:String},
    email:{type:String,required:true},
    password:{type:String,require:true}
},{
    timestamps:true,
    versionKey:false
})
// user model
const User=mongoose.model("user",userSchema)


// todo schema
const todoSchema=new mongoose.Schema({
    title:{type:String,required:true}

},{
    timestamps:true,
    versionKey:false
})
// todo model
const Todo=mongoose.model("todo",todoSchema)



app.post("/register",async(req,res)=>{
    try{
const user=await User.create(req.body)
      return res.status(200).send(user)
    }
    catch(err)
    {
     return res.status(401).send(err.message)
    }
})


app.get("/login",async(req,res)=>{
    try{
const user=await User.find({}).lean().exec()
      return res.status(200).send(user)
    }
    catch(err)
    {
     return res.status(401).send(err.message)
    }
})


app.post("/todos",async(req,res)=>{
    try{
        const todo=await Todo.create(req.body)
              return res.status(200).send(todo)
            }
            catch(err)
            {
             return res.status(401).send(err.message)
            }
})


app.get("/todos",async(req,res)=>{
    try{
        const todo=await Todo.find({}).lean().exec()
              return res.status(200).send(todo)
            }
            catch(err)
            {
             return res.status(401).send(err.message)
            }
})


app.get("/todos/:id",async(req,res)=>{
    try{

      const user=await Todo.findById(req.params.id)
      return res.status(200).send(user)

    }
    catch
    {
        return res.status(401).send(err.message)
    }
})

app.patch("/todos/:id",async(req,res)=>{
    try{

        const user=await Todo.findByIdAndUpdate(req.params.id, req.body,{new:true})
        return res.status(200).send(user)
  
      }
      catch
      {
          return res.status(401).send(err.message)
      }
})

app.delete("/todos/:id",async(req,res)=>{
    try{
        const user=await Todo.findByIdAndDelete(req.params.id,req.body,{new:true})
        return res.status(200).send(user)
    }
    catch{
        return res.status(401).send(err.message)
    }
    

})



















app.listen(3000,async()=>{
    try{
       await connect()
       console.log("port 3000 for evaluation is working fine")
    }
    catch(err)
    {
       console.log(err.message)
    }
})