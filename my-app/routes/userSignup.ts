import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';

const userController = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

interface UserRequest {
  name?: string;
  email: string;
  password: string;
}


async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

userController.post('/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const { name, email, password } = await c.req.json<UserRequest>();

   
    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password:hashedPassword,
      },
    });

  
    const token = await sign({ email: user.email, id: user.id }, c.env.JWT_SECRET);

    return c.json({ user,token,message:"Create Account Successfuly!" }, 201);
  } catch (error) {
    console.log(error);
    return c.text('Failed to create user', 500);
  }
});

export default userController;
