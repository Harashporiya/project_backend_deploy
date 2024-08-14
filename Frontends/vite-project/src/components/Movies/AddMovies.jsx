import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { moviesAdd } from "../redux/Slice";

function AddMovies() {
    const [Image, setImage] = useState('');
    const [Hero_Name, setHero_Name] = useState('');
    const [Real_Name, setReal_Name] = useState('');
    const [Superpower, setSuperPower] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    
    const status = useSelector((state) => state.app.status);
    const error = useSelector((state) => state.app.error);

    const handleSubmit =  (e) => {
        e.preventDefault();
        try {
             dispatch(moviesAdd({ Image, Hero_Name, Real_Name, Superpower }));
            setShowMessage(true);
        } catch (err) {
            console.log('Failed to add movie: ', err);
            setShowMessage(true);
        }
    };
    

    useEffect(() => {
        if (status === 'succeeded') {

        }

        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000); 

            return () => clearTimeout(timer);
        }
    }, [status, showMessage, navigate]);

    return (
        <><div className = " h-screen w-screen bg-black bg-grid-white/[0.2]  relative flex flex-col  items-center justify-center">
             <div className = " absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" ></div>
            <form className="p-10 border-[1px] bg-black border-white rounded-xl space-y-4" onSubmit={handleSubmit}>
                <p className="text-white text-2xl ml-2">Movies Add</p>
                <div className="space-y-2">
                    <label className="p-2 text-white text-xl" htmlFor="image">Image URL</label>
                    <input
                        className="border-[1px] border-gray-500 text-white p-2 rounded-md w-full bg-black focus:border-white focus:border-1"
                        type="url"
                        id="image"
                        value={Image}
                        onChange={(e) => setImage(e.target.value)}
                        placeholder="url......"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="p-2 text-white text-xl" htmlFor="heroName">Hero Name</label>
                    <input
                        className="border-[1px] border-gray-500 text-white p-2 rounded-md w-full bg-black focus:border-white focus:border-1"
                        type="text"
                        id="heroName"
                        value={Hero_Name}
                        onChange={(e) => setHero_Name(e.target.value)}
                        placeholder="Hero Name"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="p-2 text-white text-xl" htmlFor="realName">Real Name</label>
                    <input
                        className="border-[1px] border-gray-500 text-white p-2 rounded-md w-full bg-black focus:border-white focus:border-1"
                        type="text"
                        id="realName"
                        value={Real_Name}
                        onChange={(e) => setReal_Name(e.target.value)}
                        placeholder="Real name"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="p-2 text-white text-xl" htmlFor="superPower">SuperPower</label>
                    <input
                        className="border-[1px] border-gray-500 text-white p-2 rounded-md w-full bg-black focus:border-white focus:border-1"
                        type="text"
                        id="superPower"
                        value={Superpower}
                        onChange={(e) => setSuperPower(e.target.value)}
                        placeholder="SuperPower"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-black w-full font-normal text-[17px] bg-white p-1 rounded-lg hover:bg-white">
                        Add Movie
                    </button>
                </div>

                {showMessage && status && (
                    <div className={`text-center text-xl font-bold ${status === 'Failed' ? 'text-red-900' : 'text-white'}`}>
                        {status === 'succeeded' ? 'Movie Add Successful!' : status}
                    </div>
                )}
                {showMessage && error && <div className="text-red-900 text-2xl text-center font-bold">{error}</div>}
            </form>
            </div>
        </>
    );
}

export default AddMovies;
