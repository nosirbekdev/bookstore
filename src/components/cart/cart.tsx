'use client';

import { Navbar } from '@/components';
import CustomImage from '@/components/image/image';
import { IBooks } from '@/interfaces/app.interface';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Cart = (): JSX.Element => {
	const [total, setTotal] = useState<number>(0);
	const [products, setProducts] = useState<IBooks[]>(
		JSON.parse(localStorage.getItem('cart') || '[]')
	);

	const user_id = Cookies.get('user_id');
	const router = useRouter();
	if (!user_id) {
		router.push('/auth');
	}

	const removeItem = (id: number) => {
		const updatedCart = products.filter(product => product.bookRank !== id);
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		setProducts(updatedCart);
	};

	const handleIncrement = (id: number) => {
		const updatedCart = products.map(product => {
			if (product.bookRank === id) {
				return {
					...product,
					quantity: product.quantity + 1,
				};
			}
			return product;
		});
		localStorage.setItem('cart', JSON.stringify(updatedCart));
		setProducts(updatedCart);
	};

	const handleDecrement = (id: number) => {
		const existProduct = products.find(product => product.bookRank === id);

		if (existProduct?.quantity === 1) {
			removeItem(existProduct.bookRank);
		} else {
			const updatedCart = products.map(product => {
				if (product.bookRank === id) {
					return {
						...product,
						quantity: product.quantity - 1,
					};
				}
				return product;
			});
			localStorage.setItem('cart', JSON.stringify(updatedCart));
			setProducts(updatedCart);
		}
	};

	useEffect(() => {
		const total = products.reduce((acc, curr) => {
			return acc + 16000 * curr.quantity;
		}, 0);
		setTotal(total);
	}, [products]);

	return (
		<>
			<Navbar />
			{products.length ? (
				<div className='h-screen pt-20'>
					<h1 className='mb-10 text-center text-2xl font-bold'>Cart Items</h1>
					<div className='mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0'>
						<div className='rounded-lg md:w-2/3 text-black'>
							{products.map((product, index) => (
								<div
									key={index}
									className='justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start'
								>
									<div className='relative '>
										<CustomImage product={product} />
									</div>
									<div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
										<div className='mt-5 sm:mt-0'>
											<h2 className='text-lg font-bold text-gray-900'>{product.bookTitle}</h2>
											<p className='mt-2 text-base text-gray-700'>{product.bookDescription}</p>
											<p className='mt-3 mb-4 text-base font-semibold text-gray-700'>
												{product.bookAuthor}
											</p>
											<Link href={product.amazonBookUrl} className='mt-3 text-base text-blue-400'>
												{product.amazonBookUrl}
											</Link>
										</div>
										<div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6'>
											<div className='flex items-center border-gray-100'>
												<span
													className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
													onClick={() => handleDecrement(product.bookRank)}
												>
													{' '}
													-{' '}
												</span>
												<input
													className='h-8 w-8 border bg-white text-center text-xs outline-none'
													type='number'
													value={product.quantity}
													min='1'
												/>
												<span
													className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
													onClick={() => handleIncrement(product.bookRank)}
												>
													{' '}
													+{' '}
												</span>
											</div>
											<div className='flex items-center space-x-4'>
												<p className='text-sm'>
													{(16000 * product.quantity).toLocaleString('uz-UZ', {
														style: 'currency',
														currency: 'UZS',
													})}
												</p>
												<svg
													xmlns='http://www.w3.org/2000/svg'
													fill='none'
													viewBox='0 0 24 24'
													strokeWidth='1.5'
													stroke='currentColor'
													className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
													onClick={() => removeItem(product.bookRank)}
												>
													<path
														strokeLinecap='round'
														strokeLinejoin='round'
														d='M6 18L18 6M6 6l12 12'
													/>
												</svg>
											</div>
										</div>
									</div>
								</div>
							))}
						</div>

						<div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3'>
							<div className='mb-2 flex justify-between'>
								<p className='text-gray-700'>Subtotal</p>
								<p className='text-gray-700'>
									{total.toLocaleString('uz-UZ', { style: 'currency', currency: 'UZS' })}
								</p>
							</div>
							<div className='flex justify-between'>
								<p className='text-gray-700'>Shipping</p>
								<p className='text-gray-700'>
									{(10000).toLocaleString('uz-UZ', { style: 'currency', currency: 'UZS' })}
								</p>
							</div>
							<hr className='my-4' />
							<div className='flex justify-between text-black'>
								<p className='text-lg font-bold'>Total</p>
								<div className=''>
									<p className='mb-1 text-lg font-bold '>
										{(total + 10000).toLocaleString('uz-UZ', {
											style: 'currency',
											currency: 'UZS',
										})}
									</p>
									<p className='text-sm text-gray-700'>including VAT</p>
								</div>
							</div>
							<button
								className='mt-6 w-full rounded-md bg-blue-500 py-5 font-medium text-blue-50 hover:bg-blue-600'
								onClick={() => router.push('https://t.me/nosirbek01')}
							>
								Check out
							</button>
						</div>
					</div>
				</div>
			) : (
				<div className='flex h-[calc(100vh-80px)] items-center justify-center p-5 bg-black text-white w-full'>
					<div className='text-center'>
						<div className='inline-flex rounded-full bg-yellow-100 p-4'>
							<div className='rounded-full stroke-yellow-600 bg-yellow-200 p-4'>
								<svg
									className='w-16 h-16'
									viewBox='0 0 28 28'
									fill='none'
									xmlns='http://www.w3.org/2000/svg'
								>
									<path
										d='M14.0002 9.33337V14M14.0002 18.6667H14.0118M25.6668 14C25.6668 20.4434 20.4435 25.6667 14.0002 25.6667C7.55684 25.6667 2.3335 20.4434 2.3335 14C2.3335 7.55672 7.55684 2.33337 14.0002 2.33337C20.4435 2.33337 25.6668 7.55672 25.6668 14Z'
										stroke-width='2'
										stroke-linecap='round'
										stroke-linejoin='round'
									></path>
								</svg>
							</div>
						</div>
						<h1 className='mt-5 text-[36px] font-bold text-slate-200 lg:text-[50px]'>
							Shopping cart is empty
						</h1>
						<p className='text-slate-300 mt-5 lg:text-lg'>
							The page you are looking for doesn&apos;t exist or <br />
							has been removed.
						</p>
						<Link href={'/category'}>
							<button className='button bg-blue-600 mt-4 p-1 rounded-md text-white border-transparent hover:border-blue-600 hover:bg-transparent hover:text-white'>
								Books
							</button>
						</Link>
					</div>
				</div>
			)}
		</>
	);
};

export default Cart;
