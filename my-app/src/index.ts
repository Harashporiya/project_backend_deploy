import { Hono } from 'hono';
import userController from '../routes/userSignup';
import userlogin from '../routes/userlogin';
import marvel from '../marvelMovies.json'
import movieRoute from "../routes/movies"
import { cors } from 'hono/cors'

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
  };
}>();

app.use(cors())

app.get('/api/marvel',(c)=>{
  return c.json(marvel);
})

app.route('/user', userController);
app.route('/user', userlogin)
app.route('/api', movieRoute)

app.get('/', (c) => {
  return c.text('harash');
});

export default app;
