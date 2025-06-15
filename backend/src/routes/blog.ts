import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  verify } from 'hono/jwt'
type Bindings = {
    DATABASE_URL:string,
    JWT_SECRET:string
  }

type Variables={
    userid:string,
    
   
}  
export const blogRouter= new Hono<{Bindings:Bindings,Variables:Variables}>()

// middlewere
blogRouter.use('/*',async (c,next)=>{
let userid;

  const header=c.req.header("authorization")|| "";
//   const token=header.split(" ")[1];
  const response = await verify(header, c.env.JWT_SECRET);

  if(response){
   

     c.set("userid",response.id);
    await next();
  }
  else{
    c.status(401)
    return c.json({error:"unauthorized"})
  }

})


blogRouter.post('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const userid=c.get("userid");
  
    const blog =await prisma.post.create({
    data:{
            title:body.title,
            content:body.content,
            authorId:userid

        }
    })
    return c.json({
        id:blog.id
    })
})
blogRouter.put('/',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const body=await c.req.json();
    const blog =await prisma.post.update({
        where:{
         id:body.id
        },
    data:{
            title:body.title,
            content:body.content,

        }
    })
    return c.json({
        id:blog.id
    })
})


// TODO : PAGINATION
blogRouter.get('/all',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    
    const blog =await prisma.post.findMany();
    return c.json({blog});
})


blogRouter.get('/:id',async (c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())
    const uuid=c.req.param("id");
    try{
    const blog =await prisma.post.findFirst({
        where:{
         id:uuid
        },
    })
    return c.json({
        blog
    })
}
catch(e){
    c.status(404)
    return c.json({messge:"Error while fething blog post"})
}
})


