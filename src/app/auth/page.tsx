'use client';

import { TextField } from '@/components';
import { useAuth } from '@/hooks/useAuth';
import { Form, Formik } from 'formik';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

const Auth = () => {
	const [auth, setAuth] = useState<'signup' | 'signin'>('signin');
	const { error, isLoading, signUp, signIn } = useAuth();
	const router = useRouter();

	const user_id = Cookies.get('user_id');

	if (user_id) return router.push('/');

	const toggleAuth = (state: 'signup' | 'signin') => {
		setAuth(state);
	};

	const onSubmit = async (formData: { email: string; password: string }) => {
		if (auth === 'signup') {
			signUp(formData.email, formData.password);
			toast('Sign up success');
		} else {
			signIn(formData.email, formData.password);
			toast('Sign in success');
		}
	};

	const validation = Yup.object({
		email: Yup.string().email('Invalid email address').required('Email is required'),
		password: Yup.string().min(6, '6 minimum character').required('Password is required'),
	});

	return (
		<div className='relative flex h-screen w-screen flex-col md:items-center md:justify-center bg-black md:bg-transparent'>
			<Head>
				<title>Auth</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/logo.svg' />
			</Head>

			<Image
				src={'https://shorturl.at/jAGW7'}
				alt='bg'
				fill
				className='object-cover -z-10 !hidden sm:!inline opacity-30'
			/>

			<Image
				src={'/logo.svg'}
				alt='Image logo'
				width={70}
				height={70}
				priority
				className='absolute left-4 top-4 cursor-pointer object-contain'
				onClick={() => router.push('/')}
			/>

			<Formik
				initialValues={{ email: '', password: '' }}
				onSubmit={onSubmit}
				validationSchema={validation}
			>
				<Form className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-10'>
					<h1 className='text-4xl font-semibold'>{auth === 'signup' ? 'Sign up' : 'Sign In'}</h1>
					{error && <p className='text-red-500 font-semibold text-center'>{error}</p>}
					<div className='space-y-4'>
						<TextField name='email' placeholder='Email' type={'text'} />
						<TextField name='password' placeholder='Password' type={'password'} />
					</div>

					<button
						type='submit'
						disabled={isLoading}
						className='w-full bg-[#E10856] py-3 mt-4 font-semibold'
					>
						{isLoading ? 'Loading...' : auth === 'signin' ? 'Sign In' : 'Sign Up'}
					</button>

					{auth === 'signin' ? (
						<div className='text-[gray]'>
							Not yet account?{' '}
							<button
								type='button'
								className='text-white hover:underline'
								onClick={() => toggleAuth('signup')}
							>
								Sign Up Now
							</button>
						</div>
					) : (
						<div className='text-[gray]'>
							Already have account?{' '}
							<button
								type='button'
								className='text-white hover:underline'
								onClick={() => toggleAuth('signin')}
							>
								Sign In
							</button>
						</div>
					)}
				</Form>
			</Formik>
		</div>
	);
};

export default Auth;
