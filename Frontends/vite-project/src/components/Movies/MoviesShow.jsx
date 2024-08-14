import axios from 'axios';
import React, { useEffect, useState } from 'react';
import "./index.css"
const DEPLOY_URL = import.meta.env.VITE_DEPLOY_URL;

function MoviesShow() {
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(null);
    

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
        <div className="bg-gray-900 min-h-screen text-white p-8">
            <h1 className="text-4xl font-bold mb-8">Movies List</h1>
            {error && <p className="text-red-500">{error}</p>}
            <div className="flex flex-wrap pt-28 justify-center ">
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
        </div>
    );
}

export default MoviesShow;
