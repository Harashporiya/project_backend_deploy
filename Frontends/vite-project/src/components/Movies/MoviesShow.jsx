import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./index.css"
import { useNavigate } from 'react-router';
const DEPLOY_URL = import.meta.env.VITE_DEPLOY_URL;

function MoviesShow() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate('');

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get(`${DEPLOY_URL}/api/marvel`);
                setMovies(response.data);
            } catch (error) {
                setError(error.message);
                console.error('Error fetching movies:', error);
            }
        };

        fetchMovies();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen text-white p-4">
            <h1 className="text-4xl font-bold mb-8">Movies List</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-wrap pt-2 justify-center ">
            {movies && movies.map((datas) => (
          <div id='card' className='rounded-lg shadow-2xl bg-white m-4 ' key={datas.id}>
            <img id='img' className='cover rounded-t-lg h-[400px] w-[400px]' src={datas.Image} alt='' />
            <div className='p-4 text-black'>
              <p className='font-bold text-xl'>{datas.Hero_Name}</p>
              <p className='text-gray-600'>{datas.Real_Name}</p>
              <p className='mt-2'><span className='font-bold'>Superpower:</span> {datas.Superpower}</p>
              <p className='mt-2'><span className='font-bold'>First Appearance:</span> {datas.First_Appearance}</p>
              <p className='mt-2'><span className='font-bold'>Costume Quirk:</span> {datas.Costume_Quirk}</p>
              <p className='mt-2'><span className='font-bold'>Catchphrase:</span> {datas.Catchphrase}</p>
              <p className='mt-2'><span className='font-bold'>Backstory:</span> {datas.Backstory}</p>
              <p className='mt-2'><span className='font-bold'>Most Useless Moment:</span> {datas.Most_Useless_Moment}</p>
            </div>
          </div>
        ))}
            </div>

            <div className='flex justify-center'>
        
        <button onClick={()=>navigate("/addMovies")} className="inline-flex h-12 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
         Add Movies
        </button>
  
            </div>
        </div>
    );
}

export default MoviesShow;
