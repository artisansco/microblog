import { Hono } from "hono";
import { loginSchema, registerSchema } from "../validators/users.ts";
import { db } from "../db/drizzle.ts";
import { usersTable } from "../db/schema.ts";
import {eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { Jwt } from "hono/utils/jwt";
import 'dotenv/config'

const app = new Hono().basePath("/auth");

app.post("/token", async (c) => {
  try{
    const reqBody = await c.req.json()

    //validating the user input data
    const result = loginSchema.safeParse(reqBody)
    if(!result.success){
      return c.json({
        ok:false,
        message:"invalid input data"
      },404)
    }

    //geting the validated data
    const {username, password} = result.data

    //checking if the user exist
    const user = await db.select().from(usersTable).where(eq(usersTable.username, username))
    if(user.length === 0 ){
      return c.json({
        ok:false,
        message:"invalid username",
      }, 401)
    }

    //checking the password
    const passwordMatch = await bcrypt.compare(password, user[0].password as string)
    if(!passwordMatch){
      return c.json({
        ok:false,
        message:"invalid password",
      }, 401)
    }

    //creating the accessToken
    const accessToken = await Jwt.sign({id:user[0].id, username:user[0].username, exp: 24 * 60 * 60}, process.env.JWT_SECRET as string, 'HS256')
    console.log(accessToken)

    //send success response to the user with the accessToken
    return c.json({
      ok:true,
      message:"user login successfull",
      data: accessToken,
    }, 200)
    
  }catch(err){
    console.log(err)
    return c.json({
      ok:false,
      message:"internal server error",
    },500)
  }
});

app.post('/register', async(c) => {
  try{
    const reqBody = await c.req.json()

    //validating the request body
    const result = registerSchema.safeParse(reqBody)
    if(!result.success){
      return c.json({
        ok:false,
        message:"invalid input data",
      }, 404)
    }

    //getting the data from the result
    const {fullname, username, email, password} = result.data

    //check if user already exist 
    const user = await db.select().from(usersTable).where(or(eq(usersTable.username, username), eq(usersTable.name, fullname), eq(usersTable.email, email)))
    if(user.length !== 0){
      return c.json({
        ok:false,
        message:"User with username and fullname already exist",
      },409)
    }

    //hashing the password
    const passwordHash = await bcrypt.hash(password, 10)

    //creating the new user
    await db.insert(usersTable).values({name:fullname, email:email, username:username, password:passwordHash})

    //sending the success response to the user
    return c.json({
      ok:true,
      message:"User registration successfull",
    },201) 

  }catch(err){
    console.log(err)
    return c.json({
      ok:false,
      message:"internal server error",
    }, 500)
  }
})

export default app;
