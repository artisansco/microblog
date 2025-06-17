import bcrypt from "bcryptjs";
import { and, eq } from "drizzle-orm";
import { Hono } from "hono";
import { Jwt } from "hono/utils/jwt";
import { nanoid } from "nanoid";
import { db } from "../db/drizzle.js";
import { usersTable } from "../db/schema.js";
import { sanitizeObject } from "../utils/sanitizedStrings.js";
import { loginSchema, registerSchema } from "../validators/users.js";
import "dotenv/config";

const authRouter = new Hono().basePath("/auth");

//register
authRouter.post("/register", async (c) => {
  try {
    let reqbody;

    try {
      reqbody = await c.req.json();
    } catch (err) {
      console.log(err);
      return c.json(
        {
          ok: false,
          message: "invalid body",
        },
        400,
      );
    }

    //validating the reqBody
    const result = registerSchema.safeParse(reqbody);
    if (!result.success) {
      return c.json(
        {
          ok: false,
          message: "All fields required",
        },
        400,
      );
    }

    //sanitizing the data sent
    const sanitizedObj = sanitizeObject(result.data);

    //getting the data from the sanitizedObj
    const { fullname, username, email, password } = sanitizedObj;

    //checking if the user already exist
    const user = await db
      .select()
      .from(usersTable)
      .where(and(eq(usersTable.username, username), eq(usersTable.email, email)))
      .limit(1);

    if (user.length !== 0) {
      return c.json(
        {
          ok: false,
          message: "User with that email and username already exist",
        },
        409,
      );
    }

    //if user doesn't exist , we hashed the password and create a new user in the database
    const passwordHashed = await bcrypt.hash(password, 10);

    await db.insert(usersTable).values({
      id: nanoid(),
      username,
      email,
      password: passwordHashed,
      name: fullname,
    });

    //sending a 201 response if all was done correctly
    return c.json(
      {
        ok: true,
        message: "user registered successfully",
      },
      201,
    );
  } catch (err) {
    console.log(err);
    return c.json(
      {
        ok: false,
        message: "Internal server error",
      },
      500,
    );
  }
});

//login
authRouter.post("/login", async (c) => {
  try {
    const reqbody = await c.req.json();

    //validation the incoming requestion with zod
    const result = loginSchema.safeParse(reqbody);
    if (!result.success) {
      return c.json(
        {
          ok: false,
          message: "invalid request data",
        },
        400,
      );
    }

    //sanitizing the incoming request using sanitize-html
    const sanitizedObj = sanitizeObject(result.data);

    //clean data
    const { username, password } = sanitizedObj;

    //checking if the user exist in the database
    const user = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.username, username))
      .limit(1);

    if (user.length === 0) {
      return c.json(
        {
          ok: false,
          message: "invalid username",
        },
        404,
      );
    }

    //checking to see if the password matches the one in the database
    const passwordMatch = await bcrypt.compare(password, user[0].password as string);
    if (!password) {
      return c.json(
        {
          ok: false,
          message: "invalid password",
        },
        404,
      );
    }

    //creating an access token
    console.log(process.env.JWT_SECRET);
    const accessToken = await Jwt.sign(
      { id: user[0].id, username: user[0].username, exp: 24 * 60 * 60 },
      process.env.JWT_SECRET!,
      "HS256",
    );

    //sending the response and the accessToken
    return c.json(
      {
        ok: true,
        message: "user logged in",
        data: {
          token: accessToken,
        },
      },
      200,
    );
  } catch (err) {
    console.log(err);
    return c.json(
      {
        ok: false,
        message: "internal server error",
      },
      500,
    );
  }
});

export default authRouter;
