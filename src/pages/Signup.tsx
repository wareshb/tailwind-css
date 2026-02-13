import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        acceptTerms: false
    });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Record<string, string> = {};

        if (!formData.fullName) newErrors.fullName = 'Full name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (!formData.acceptTerms) newErrors.acceptTerms = 'You must accept the terms';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        console.log('Signup details:', formData);
        // Mock successful signup
        alert('Account created successfully!');
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 py-12">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl shadow-indigo-100 border border-gray-100 overflow-hidden">
                <div className="p-8 md:p-12">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-600 rounded-2xl text-white font-black text-2xl mb-4 shadow-lg shadow-indigo-200">
                            S
                        </div>
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Create Account</h2>
                        <p className="text-gray-500 mt-2 font-medium">Join our community of premium shoppers.</p>
                    </div>

                    <form className="space-y-5" onSubmit={handleSubmit}>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Full Name</label>
                            <input
                                type="text"
                                placeholder="John Doe"
                                value={formData.fullName}
                                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 transition-all font-medium"
                            />
                            {errors.fullName && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.fullName}</p>}
                        </div>

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
                            <label className="block text-sm font-bold text-gray-700 mb-2 ml-1">Password</label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                className="w-full bg-gray-50 border-0 focus:ring-2 focus:ring-indigo-500 rounded-2xl py-4 px-6 text-gray-900 placeholder-gray-400 transition-all font-medium"
                            />
                            {errors.password && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.password}</p>}
                        </div>

                        <div className="flex items-start mb-6 px-1">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    checked={formData.acceptTerms}
                                    onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                                    className="w-5 h-5 bg-gray-50 border-gray-300 rounded focus:ring-indigo-500 accent-indigo-600 cursor-pointer"
                                />
                            </div>
                            <label htmlFor="terms" className="ml-3 text-sm text-gray-500 font-medium">
                                I agree to the <Link to="#" className="text-indigo-600 font-bold hover:underline">Terms of Service</Link> and <Link to="#" className="text-indigo-600 font-bold hover:underline">Privacy Policy</Link>.
                            </label>
                        </div>
                        {errors.acceptTerms && <p className="text-red-500 text-xs mt-1 ml-1 font-bold">{errors.acceptTerms}</p>}

                        <button type="submit" className="w-full bg-indigo-600 text-white py-4 px-6 rounded-2xl font-black text-lg hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 transform active:scale-[0.98]">
                            Create Account
                        </button>
                    </form>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-100 text-center">
                    <p className="text-gray-500 font-medium">
                        Already have an account?{' '}
                        <Link to="/login" className="text-indigo-600 font-black hover:underline">Sign in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Signup;
