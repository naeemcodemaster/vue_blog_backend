const httpStatus = require("http-status");
const { AuthenticationService } = require("../services");
const catchAsync = require("../utils/catchAsync");

class AuthenticationController{
    static register = catchAsync(async (req,res)=>{
    
        const res_obj = await AuthenticationService.register(req?.body);
        res.status(httpStatus.CREATED).send(res_obj);
    })

    static login = catchAsync(async (req,res)=>{
        const res_obj = await AuthenticationService.login(req?.body);
        res.status(httpStatus.OK).send(res_obj);
    })


    static UserProfile = catchAsync(async (req,res)=>{
        const res_obj = await AuthenticationService.UserProfile(req?.user);
        res.status(httpStatus.OK).send(res_obj);
    })

    static post = catchAsync(async (req,res)=>{
        const res_obj = await AuthenticationService.createPost(req?.user,req?.body,req?.file);
        res.status(httpStatus.CREATED).send(res_obj);
    })

    static AllPosts = catchAsync(async (req,res)=>{
        const res_obj = await AuthenticationService.AllPosts();
        res.status(httpStatus.OK).send(res_obj);
    })

    static SinglePost = catchAsync(async (req,res)=>{
        const res_obj = await AuthenticationService.SinglePost(req?.params?.id);
        res.status(httpStatus.OK).send(res_obj);
    })

    static DeletePost = catchAsync(async (req,res)=>{
        const res_obj = await AuthenticationService.DeletePost(req?.params?.id);
        res.status(httpStatus.OK).send(res_obj);
    })

    static Contact = catchAsync(async (req,res)=>{
        const res_obj = await AuthenticationService.Contact(req?.body);
        res.status(httpStatus.CREATED).send(res_obj);
    })


}
module.exports = AuthenticationController