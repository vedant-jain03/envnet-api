const express = require('express')
const router = express.Router();
const bcrypt = require('bcryptjs')
const User = require('../models and schemas/User');
const BlogModel = require('../models and schemas/Blog')
const Fundmodel = require('../models and schemas/Funds')

// User Routes
router.post('/user/create', async (req, res) => {
    try {
        let { name, email,  password, cpassword , Role} = req.body;
        if (password !== cpassword) {
            return res.status(400).json({ message: 'Password not match' })
        }
        try {
            const userexist = await User.findOne({ email: email })
            if (userexist) {
                return res.status(401).json({ message: 'User Already Exist!!' })
            }
            const salt = await bcrypt.genSalt(10);
            password = await bcrypt.hash(password, salt);
            cpassword = await bcrypt.hash(cpassword, salt);
            const user = await new User({ name, email ,password, cpassword, Role })
            const userRegister = await user.save();
            if (userRegister) {
                res.status(200).json({ message: 'User Registered Succesfully!!!' })
            } else {
                res.status(400).json({ message: 'Something Went Wrong' })
            }
        } catch (err) {
            console.log(err);
        }
    } catch (err) {
        console.log(err);
    }
})

router.get('/user/single/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const valid_user = await User.findOne({_id: id})
        if(!valid_user)return res.status(400).json({message: 'Invalid User'})
        return res.status(200).json({message: 'User login successfully', id: valid_user._id, username: valid_user.name, role: valid_user.Role})
    }catch(err){
        console.log(err);
    }
})

router.post('/user/login', async(req,res)=>{
    try{
        const { email,password } = await req.body;
        if(!email || !password){
            return res.status(400).json({message: "Empty Input"})
        }
        const valid_user = await User.findOne({email: email})
        if(!valid_user){
            return res.status(401).json({message: 'User not Register'})
        }
        const valid_password = await bcrypt.compare(password, valid_user.password);
        if(!valid_password){
            return res.status(401).json({message: 'Invalid Credentials'})
        }
        return res.status(200).json({message: 'User login successfully', id: valid_user._id, username: valid_user.name, role: valid_user.Role});
    }catch(err){
        console.log(err);
    }
})


// Blog Routes
router.post('/blog/create', async(req,res)=>{
    try{
        const {title,ImageURLs, desc, sponsered, userId, sponserid, total, first, second, third, firstapprove, secondapprove, thirdapprove} = req.body;
        const newBlog = await new BlogModel({title,ImageURLs, desc, sponsered, userId, sponserid, total, first, second, third, firstapprove, secondapprove, thirdapprove});
        const result = await newBlog.save();
        if(!result)return res.status(404).json({message: 'Something Went Wrong!'})
        return res.status(200).json({message: 'Blog Uploaded', blogdata: result});
    }catch(err){
        console.log(err);
    }
})

router.get('/blog/getAll', async(req,res)=>{
    try{
        const Blogs = await BlogModel.find({});
        return res.status(200).json({data: Blogs});
    }catch(err){
        console.log(err);
    }
})

router.get('/blog/single/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const Blog = await BlogModel.findById({_id:id});
        if(!Blog){
            return res.status(400).json({message: "No Such Blog"})
        }
        return res.status(200).json({Blog: Blog});
    }catch(err){
        console.log(err);
    }
})


router.patch('/blog/addFund/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const blog = await BlogModel.findByIdAndUpdate(id, req.body, {new: true})
        return res.status(200).json({blog:  blog});
    }catch(err){
        console.log(err);
    }
})


// Funding routes

router.post('/blog/post/create', async(req,res)=>{
    try{
        const {blogid, title, images} = req.body;
        const newFund = await new Fundmodel({blogid, title, images});
        return res.status(200).json({newFund: newFund});
    }catch(err){
        console.log(err);
    }
})

router.get('/blog/post/getAll/:id', async(req,res)=>{
    try{
        const id = req.params.id;
        const posts = await Fundmodel.find({_id: id})
        return res.status(200).json({result: posts});
    }catch(err){
        console.log(err);
    }
})

module.exports = router