
// const {error} = require("node:console")
let {blogs} = require("../data/data")
// const {read} = require("node:fs")
// const { title} = require("node:process")

function sendBlogs(req, res){
    try{
        res.status(200).json({
            success:true,
            data:blogs,
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:`something went wrong`,
            error:err.message
        })
    }
}

function sentBlogsId(req, res){
    try{
        let blogId = req.params.id
        let blog = blogs.find(b=>b.id===blogId)
        if(!blog){
            return res.status(404).json({
                success:false,
                message:`Blog with  id is not found`
            })
        }res.status(200).json({
            success:true,
            message:`blog is fetched succesfully`,
            data:blog
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:`not found`
        })
    }
}

function cretorBlog(req, res){
    try{
        let body = req.body
        if(!body.title || !body.content){
            return res.status(404).json({
                success:false,
                message:`title and content is not found`
            })
        }
        let newObj={
            title:body.title,
            content:body.content,
            userid:body.userid,
            id:Date.now().toString()
        }
        blogs.push(newObj)
        res.status(201).json({
            success:true,
            message:`new blog is created succesfullyy..!`,
            data:newObj
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:`something went wrong`
        })
    }

}

function updateBlog(req, res){
    try{
        let updateId = req.params.id;
        let body = req.body;
        let blogIndex=blogs.findIndex(b=>b.id===updateId)
        if (blogIndex === -1){
            return res.status(404).json({
                success:false,
                message:`blog with id is not found..!`
            })
        }
        if (!body.title || !body.content){
            return res.status(400).json({
                success:false,
                message:`title and content is not found`
            })
        }
        let UpdateObj={
            ...blogs[blogIndex],
            title:body.title,
            content:body.content
        }
        blogs[blogIndex]=UpdateObj;

    res.status(200).json({
            success:true,
            message:`blog is updatee..!`,
            data:UpdateObj
        })
    }catch(err){
        res.status(500).json({
            success:false,
            message:`something went wrong`,
            error:err.message
        })
    }
}

function removeBlogs(req, res){
    try{
        let removeId = req.params.id
        let removeIndex = blogs.findIndex(b => b.id === removeId)
        if (removeIndex === -1){
            return res.status(404).json({
                success:false,
                message:`remove id is not found...!`
            })
        }
        let removedBlog = blogs.splice(removeIndex, 1)[0]
        return res.status(200).json({
            success:true,
            message:`blog is removed successfully..!`,
            data:removedBlog
        })
    }catch(err){
        return res.status(500).json({
            success:false,
            message:`something went wrong`,
            
        })
    }
}


module.exports={
    sendBlogs,
    sentBlogsId,
    cretorBlog,
    updateBlog,
    removeBlogs
}