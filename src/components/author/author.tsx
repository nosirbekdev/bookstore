'use client';

import { Cta } from '@/components';
import { IBooks } from '@/interfaces/app.interface';
import { PersonOutlineOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const AccountAuthor = (): JSX.Element => {
	const user_id = Cookies.get('user_id');
	const [products, setProducts] = useState<IBooks[]>([]);
	const router = useRouter();

	useEffect(() => {
		if (typeof window !== 'undefined') {
			const storedProducts = JSON.parse(localStorage.getItem('cart') || '[]');
			setProducts(storedProducts); // Update products state
		}
	}, []);

	useEffect(() => {
		if (!user_id) {
			router.push('/auth');
		}
	}, [user_id, router]);

	return (
		<>
			<header>
				<div className='flex items-center space-x-1 md:space-x-10'>
					<Link href={'/'}>
						<Image src={'/logo.svg'} alt='logo' width={56} height={56} />
					</Link>
					<Link href={'/cart'}>Shopping cart</Link>
				</div>

				<div className='flex item-center space-x-4 text-[16px] font-light'>
					<Link href={'/account'}>
						<PersonOutlineOutlined className='h-6 w-6 cursor-pointer' />
					</Link>
				</div>
			</header>

			<main className='mx-auto max-w-6xl px-5 md:pt-24 pb-12 transition-all md:px-10'>
				{products.length ? (
					<div>
						<Cta data={products} title='Pending...' button='Buy book' />
					</div>
				) : (
					<div>
						<div className='flex flex-col items-center justify-center h-screen'>
							<h1 className='text-2xl font-bold'>No items in cart</h1>
							<Link href={'/'} className='px-4 py-2 mt-4 text-white bg-black rounded-md'>
								Back to home
							</Link>
						</div>
					</div>
				)}
			</main>
		</>
	);
};

export default AccountAuthor;
