import { Hono } from "hono";
import { nanoid } from "nanoid";
import { registerSchema } from "../validators/users.ts";
import { db } from "../db/drizzle.ts";
import { usersTable } from "../db/schema.ts";
import { and, eq, or } from "drizzle-orm";
import bcrypt from "bcryptjs";

const app = new Hono().basePath("/auth");

app.post("/token", async (c) => {
  const body = await c.req.json();

  return c.json({ data: { token: nanoid(), ...body } });
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
