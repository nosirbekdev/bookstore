import { auth } from '@/firebase/config';
import {
	User,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from 'firebase/auth';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const useAuth = () => {
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [user, setUser] = useState<User | null>(null);
	const [error, setError] = useState<string | null>('');

	const router = useRouter();

	const signUp = async (email: string, password: string) => {
		setIsLoading(true);

		await createUserWithEmailAndPassword(auth, email, password)
			.then(res => {
				setUser(res.user);
				router.push('/');
				fetch('/api/customer', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ email: res.user.email, user_id: res.user.uid }),
				});
				Cookies.set('user_id', res.user.uid);
				Cookies.set('email', res.user.email as string);
				setIsLoading(true);
			})
			.catch(error => setError(error.message))
			.finally(() => setIsLoading(false));
	};

	const signIn = async (email: string, password: string) => {
		setIsLoading(true);

		await signInWithEmailAndPassword(auth, email, password)
			.then(res => {
				setUser(res.user);
				router.push('/');
				Cookies.set('user_id', res.user.uid);
				Cookies.set('email', res.user.email as string);
				setIsLoading(true);
			})
			.catch(error => setError(error.message))
			.finally(() => setIsLoading(false));
	};

	const logout = async () => {
		setIsLoading(true);

		await signOut(auth)
			.then(() => {
				Cookies.remove('user_id');
				Cookies.remove('email');
				setUser(null);
				router.push('/auth');
			})
			.catch(error => setError(error.message))
			.finally(() => setIsLoading(false));
	};

	return { isLoading, user, error, signUp, signIn, logout, setUser, setIsLoading };
};
