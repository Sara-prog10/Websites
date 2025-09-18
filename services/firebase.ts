import type { User } from '../types';

// This is a MOCK Firebase service. It simulates Firebase Authentication.
// In a real application, you would use the actual Firebase SDK.

const MOCK_USER: User = {
    uid: '12345-abcde',
    email: 'customer@example.com',
    displayName: 'Alex Doe',
};

// --- Internal state management for the mock service ---
let listeners: ((user: User | null) => void)[] = [];

const notifyListeners = (user: User | null) => {
    listeners.forEach(callback => callback(user));
};
// ---

// Simulate a delay for network requests
const networkDelay = (ms: number) => new Promise(res => setTimeout(res, ms));

export const auth = {
    signInWithEmailAndPassword: async (email: string, password: string): Promise<{ user: User }> => {
        await networkDelay(1000);
        console.log(`Attempting login with email: ${email}`);
        if (email === 'customer@example.com' && password === 'password123') {
            localStorage.setItem('authUser', JSON.stringify(MOCK_USER));
            notifyListeners(MOCK_USER);
            return { user: MOCK_USER };
        }
        throw new Error('Invalid credentials');
    },

    createUserWithEmailAndPassword: async (email: string, password: string): Promise<{ user: User }> => {
        await networkDelay(1500);
        console.log(`Attempting registration with email: ${email}`);
        if (email.includes('@')) {
             const newUser = { ...MOCK_USER, email: email, displayName: 'New User' };
            localStorage.setItem('authUser', JSON.stringify(newUser));
            notifyListeners(newUser);
            return { user: newUser };
        }
        throw new Error('Invalid email for registration');
    },

    signOut: async (): Promise<void> => {
        await networkDelay(500);
        localStorage.removeItem('authUser');
        notifyListeners(null);
    },

    onAuthStateChanged: (callback: (user: User | null) => void): (() => void) => {
        // Add the callback to our list of listeners
        listeners.push(callback);
        
        // Immediately call the callback with the current state from localStorage
        try {
            const user = localStorage.getItem('authUser');
            callback(user ? JSON.parse(user) : null);
        } catch (e) {
            console.error("Failed to parse auth user from localStorage", e);
            callback(null);
        }
        
        // Return an unsubscribe function
        return () => {
            listeners = listeners.filter(listener => listener !== callback);
        };
    }
};
