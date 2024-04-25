'use client';

import { Cta } from '@/components';
import { IBooks } from '@/interfaces/app.interface';
import { PersonOutlineOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AccountAuthor = (): JSX.Element => {
	const user_id = Cookies.get('user_id');
	const router = useRouter();
	let products: IBooks[] = [];

	if (!user_id) {
		router.push('/auth');
	}

	if (typeof window !== 'undefined') {
		products = JSON.parse(localStorage.getItem('cart') || '[]');
	}

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
							<button
								className='px-4 py-2 mt-4 text-white bg-black rounded-md'
								onClick={() => router.push('/')}
							>
								Back to home
							</button>
						</div>
					</div>
				)}
			</main>
		</>
	);
};

export default AccountAuthor;
