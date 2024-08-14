import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../redux/Slice";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
function Signin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);
    const navigate = useNavigate('')

    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(loginUser({ email, password }));
        setShowMessage(true);
    };

    useEffect(() => {
        if (status === 'succeeded') {
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
            
            <form className="p-10 border-[1px] bg-black border-white  rounded-xl space-y-4" onSubmit={handleSubmit}>
            <p className="text-white text-2xl ml-2">Login</p>
            <p className="text-gray-300 text-md ml-2">Enter your email below to login to your account</p>
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
                        Login
                    </button>
                </div>
                <div className="flex items-center justify-center">
                <p className="text-white text-ms">Don't have an account?<Link to="/signup"  className="text-blue-500 hover:text-blue-300"> Signup</Link>   <p onClick={()=>navigate("/signup")}></p></p>
                </div>
                {showMessage && status && (
                    <div className={`text-center text-xl font-bold ${status === 'Failed' ? 'text-red-900' : 'text-white'}`}>
                        {status === 'succeeded' ? 'Login successful!' : status}
                    </div>
                )}
                {showMessage && error && <div className="text-red-900 text-2xl text-center font-bold">{error}</div>}
            </form>
            </>
    );
}

export default Signin;
