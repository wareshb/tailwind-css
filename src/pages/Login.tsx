import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Login details:', formData);
        // Mock successful login
        alert('Signed in successfully!');
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white font-black text-2xl mb-4 shadow-lg shadow-indigo-200">
                            S
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Welcome Back</h2>
                        <p className="text-gray-500 mt-2 font-medium">Please enter your details to sign in.</p>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Email Address</label>
                            <input
                                type="email"
                                placeholder="name@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 transition-all font-medium"
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.email}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between mb-2 ml-1">
                                <label className="block text-sm font-bold text-gray-700">Password</label>
                                <Link to="#" className="text-sm font-bold text-indigo-600 hover:underline">Forgot?</Link>
                            </div>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 transition-all font-medium"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.password}</p>}
                        </div>

                        <button type="submit" className="w-full bg-indigo-600 text-white py-4 px-6 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 transform active:scale-[0.98]">
                            Sign In
                        </button>
                    </form>

                    <div className="mt-10">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-100"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-4 bg-white text-gray-400 font-bold uppercase tracking-widest text-[10px]">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-4">
                            <button className="flex items-center justify-center py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors font-bold text-gray-700">
                                <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5 mr-2" alt="Google" />
                                Google
                            </button>
                            <button className="flex items-center justify-center py-3 border border-gray-100 rounded-2xl hover:bg-gray-50 transition-colors font-bold text-gray-700">
                                <img src="https://www.svgrepo.com/show/448234/apple.svg" className="w-5 h-5 mr-2" alt="Apple" />
                                Apple
                            </button>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-gray-500 font-medium">
                        Don't have an account?{' '}
                        <Link to="/signup" className="text-indigo-600 font-black hover:underline">Create one</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
