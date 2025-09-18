
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { auth } from '../services/firebase';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';

const SettingsPage: React.FC = () => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [displayName, setDisplayName] = useState(user?.displayName || '');
    const [email, setEmail] = useState(user?.email || '');
    const [isSaving, setIsSaving] = useState(false);

    const handleProfileSave = (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        // In a real app, you would call an update profile function here.
        console.log("Saving profile:", { displayName, email });
        setTimeout(() => {
            setIsSaving(false);
            alert("Profile saved successfully! (Mocked)");
        }, 1000);
    };

    const handleLogout = async () => {
        await auth.signOut();
        navigate('/login');
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-8">Settings</h1>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                    {/* Profile Settings */}
                    <div className="bg-secondary p-8 rounded-xl shadow-lg">
                        <h2 className="text-xl font-bold mb-6">Manage Profile</h2>
                        <form onSubmit={handleProfileSave}>
                            <div className="mb-4">
                                <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="displayName">Full Name</label>
                                <input
                                    id="displayName"
                                    type="text"
                                    value={displayName}
                                    onChange={(e) => setDisplayName(e.target.value)}
                                    className="w-full bg-highlight text-text-primary rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <div className="mb-6">
                                <label className="block text-text-secondary text-sm font-bold mb-2" htmlFor="email">Email Address</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-highlight text-text-primary rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-accent"
                                />
                            </div>
                            <button type="submit" disabled={isSaving} className="bg-accent hover:bg-sky-500 text-primary font-bold py-2 px-6 rounded-lg transition-colors">
                                {isSaving ? 'Saving...' : 'Save Changes'}
                            </button>
                        </form>
                    </div>

                    {/* Device Management - Optional for Prototype */}
                    <div className="bg-secondary p-8 rounded-xl shadow-lg mt-8">
                        <h2 className="text-xl font-bold mb-6">Manage Devices</h2>
                        <div className="flex gap-4">
                            <button className="bg-success/80 hover:bg-success text-text-primary font-bold py-2 px-6 rounded-lg transition-colors">
                                Add New Device
                            </button>
                            <button className="bg-danger/80 hover:bg-danger text-text-primary font-bold py-2 px-6 rounded-lg transition-colors">
                                Remove a Device
                            </button>
                        </div>
                    </div>
                </div>

                {/* Logout section */}
                <div className="bg-secondary p-8 rounded-xl shadow-lg flex flex-col items-center justify-center text-center">
                    <h2 className="text-xl font-bold mb-4">Log Out</h2>
                    <p className="text-text-secondary mb-6">Are you sure you want to end your current session?</p>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 bg-highlight hover:bg-danger text-text-primary font-bold py-3 px-4 rounded-lg transition-colors duration-200"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
