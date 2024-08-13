import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../redux/Slice";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showMessage, setShowMessage] = useState(false);

    const dispatch = useDispatch();
    const { status, error } = useSelector((state) => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signupUser({ name, email, password }));
        setShowMessage(true);
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

    return (
        <div className="min-h-screen flex justify-center items-center">
            <form className="bg-sky-700 p-10 rounded-xl space-y-4" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label className="p-4 text-white font-bold text-2xl" htmlFor="username"> Username: </label>
                    <input
                        className="border-2 border-gray-950 p-2 rounded-md w-full"
                        type="text"
                        id="username"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your Username"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="p-4 text-white font-bold text-2xl" htmlFor="email"> Email: </label>
                    <input
                        className="border-2 border-gray-950 p-2 rounded-md w-full"
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                </div>
                <div className="space-y-2">
                    <label className="p-4 text-white font-bold text-2xl" htmlFor="password"> Password: </label>
                    <input
                        className="border-2 border-gray-950 p-2 rounded-md w-full"
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                    />
                </div>
                <div className="flex justify-center">
                    <button type="submit" className="text-white font-bold text-2xl bg-blue-950 p-4 rounded-lg hover:bg-slate-900">
                        Signup
                    </button>
                </div>
                {showMessage && status && (
                    <div className={`text-center text-xl font-bold ${status === 'Failed' ? 'text-red-900' : 'text-white'}`}>
                        {status === 'succeeded' ? 'Signup successful!' : status}
                    </div>
                )}
                {showMessage && error && <div className="text-red-900 text-2xl text-center font-bold">{error}</div>}
            </form>
        </div>
    );
}

export default Signup;
