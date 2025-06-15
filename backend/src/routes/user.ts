import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {  sign } from 'hono/jwt'
type Bindings = {
    DATABASE_URL: string,
    JWT_SECRET:string
  }
export const userRouter= new Hono<{Bindings:Bindings}>()


userRouter.post('/signup',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())

const {email,password}=await c.req.json();
const user =await prisma.user.create({
  data:{
    email:email,
    password:password
  },
})
const token= await sign({id:user.id},c.env.JWT_SECRET)
return c.json({
  jwt:token
})


})

// signin
userRouter.post('/signin',async (c)=>{
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
}).$extends(withAccelerate())
  const body=await c.req.json();
  const user =await prisma.user.findUnique({
    where:{
      email:body.email,
      password:body.password
    }
  })
  if(!user){
    c.status(401);
    return c.json({message:"Invalid email or password"})
  }
  const jwt=await sign({id:user.id},c.env.JWT_SECRET);
  return c.json({jwt});

})
