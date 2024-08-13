import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign } from 'hono/jwt';

const userlogin = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_SECRET: string
  }
}>();

interface LoginRequest {
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

userlogin.post('/login', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL
  }).$extends(withAccelerate());

  try {
    const { email, password } = await c.req.json<LoginRequest>();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return c.text('Invalid email or password', 401);
    }

    const hashedPassword = await hashPassword(password);

    if (user.password !== hashedPassword) {
      return c.text('Invalid email or password', 401);
    }

    const token = await sign({ email: user.email, id: user.id }, c.env.JWT_SECRET);

    return c.json({ user, token, message: "Login Successful!" }, 200);
  } catch (error) {
    console.log(error);
    return c.text('Failed to log in', 500);
  }
});

export default userlogin;
