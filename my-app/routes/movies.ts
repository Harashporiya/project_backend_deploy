import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

const movie = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

interface MoviesRequest {
  Image: string;
  Hero_Name: string;
  Real_Name: string;
  Superpower: string;
}

movie.post('/add', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const { Image, Hero_Name, Real_Name, Superpower } = await c.req.json<MoviesRequest>();

    const createMovie = await prisma.movies.create({
      data: {
        Image,
        Hero_Name,
        Real_Name,
        Superpower,
      },
    });

    return c.json({ success: true, movie: createMovie,message:"Movie Add Successfull" },201);
  } catch (error) {
    console.error(error);
    return c.json({ success: false, error: 'Failed to add movie' }, 500);
  } 
});

movie.get('/find', async(c)=>{
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
      }).$extends(withAccelerate());

      try {
        const getMovies = await prisma.movies.findMany();
        return c.json({getMovies,sucess:true});
        
      } catch (error) {
        console.error(error);
        return c.json({ success: false, error: 'Failed to fetch movies' }, 500);
      }
})

export default movie;
