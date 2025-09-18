import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { Home } from 'lucide-react';

const LoginPage: React.FC = () => {
    const [email, setEmail] = useState('customer@example.com');
    const [password, setPassword] = useState('password123');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            await auth.signInWithEmailAndPassword(email, password);
            navigate('/');
        } catch (err) {
            setError('Failed to sign in. Please check your credentials.');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-primary text-text-primary px-4">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center bg-secondary p-4 rounded-full mb-4">
                       <Home className="text-accent" size={40}/>
                    </div>
                    <h1 className="text-3xl font-bold">Welcome to SmartHome</h1>
                    <p className="text-text-secondary mt-2">Sign in to manage your devices.</p>
                </div>
                
                <div className="bg-secondary p-8 rounded-2xl shadow-2xl">
                    <form onSubmit={handleLogin}>
                        <div className="mb-4">
                            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="email">
                                Email Address
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full bg-highlight text-text-primary rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-highlight text-text-primary rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                                required
                            />
                        </div>

                        {error && <p className="bg-danger/20 text-danger text-sm text-center py-2 px-3 rounded-md mb-4">{error}</p>}
                        
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-accent hover:bg-sky-500 text-primary font-bold py-3 px-4 rounded-lg transition-colors disabled:bg-accent/50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? 'Signing In...' : 'Sign In'}
                        </button>
                    </form>
                    <p className="text-center text-text-secondary text-xs mt-6">
                        (Use customer@example.com / password123)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;