import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/Slice";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate('')

    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.app);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            dispatch(signupUser({ name, email, password }));
        setShowMessage(true);
        setTimeout(()=>{
            navigate("/moviesShow")
        },3000)
        } catch (error) {
            console.log("error", error);
        }
        
    };

    useEffect(() => {
        if (status === 'succeeded') {
            setName('');
            setEmail('');
            setPassword('');
        }

        if (showMessage) {
            const timer = setTimeout(() => {
                setShowMessage(false);
            }, 5000); 

            return () => clearTimeout(timer);
        }
    }, [status, showMessage]);

    return (<>
             <div className = " h-screen w-screen bg-black bg-grid-white/[0.2]  relative flex flex-col  items-center justify-center">
             <div className = " absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" ></div>
            <form className="p-10 border-[1px] bg-black border-white  rounded-xl space-y-4" onSubmit={handleSubmit}>
            <p className="text-white text-2xl ml-2">Signup</p>
            <p className="text-gray-300 text-md ml-2">Enter your information to create an account</p>
                <div className="space-y-2">
                    <label className="p-2 text-white  text-xl" htmlFor="username"> Username</label>
                    <input
                        className="border-[1px] border-gray-500 text-white p-2 rounded-md w-full bg-black focus:border-white focus:border-1"
                        type="text"
                        id="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Jhon"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="p-2 text-white  text-xl" htmlFor="email"> Email</label>
                    <input
                        className="border-[1px] border-gray-500 text-white p-2 rounded-md w-full bg-black focus:border-white focus:border-1"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="@example.com"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="p-2 text-white text-xl" htmlFor="password"> Password </label>
                    <input
                        className="border-[1px] border-gray-500 text-white p-2 rounded-md w-full bg-black focus:border-white focus:border-1"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="password"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-black w-full font-normal  text-[17px] bg-white p-1 rounded-lg hover:bg-white">
                        Create an account
                    </button>
                </div>
             
                <div className="flex items-center justify-center">
                <p className="text-white text-ms">Already have an account?<Link to="/signin"  className="text-blue-500 hover:text-blue-300"> Signin</Link>   <p onClick={()=>navigate("/signin")}></p></p>
                </div>
                {showMessage && status && (
                    <div className={`text-center text-xl font-bold ${status === 'Failed' ? 'text-red-900' : 'text-white'}`}>
                        {status === 'succeeded' ? 'Signup successful!' : status}
                    </div>
                )}
                {showMessage && error && <div className="text-red-900 text-2xl text-center font-bold">{error}</div>}
            </form>
            </div>
            </>
    );
}

export default Signup;
