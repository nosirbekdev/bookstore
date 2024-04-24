'use client';

import CustomImage from '@/components/image/image';
import { IBooks } from '@/interfaces/app.interface';
import Layout from '@/layout/layout';
import { Rating } from '@mui/material';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Props {
	params: {
		id: number;
	};
}

const DetailBook = ({ params: { id } }: Props) => {
	const router = useRouter();
	const [product, setProduct] = useState<IBooks | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_API}/isbn/${id}`, {
					headers: {
						'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
						'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com',
					},
				});
				const data: IBooks = await res.json();
				setProduct(data);
			} catch (error) {
				notFound();
			}
		};

		fetchData();
	}, [id]);

	const addToCart = (item: IBooks) => {
		const user_id = Cookies.get('user_id');
		if (!user_id) {
			router.push('/auth');
			return;
		}
		const cartItems: IBooks[] = JSON.parse(localStorage.getItem('cart') || '[]');
		const isExistProduct = cartItems.find(product => product.bookIsbn === item.bookIsbn);

		if (isExistProduct) {
			const updatedCart = cartItems.map(product => {
				if (product.bookIsbn === item.bookIsbn) {
					return {
						...product,
						quantity: product.quantity + 1,
					};
				}
				return product;
			});
			localStorage.setItem('cart', JSON.stringify(updatedCart));
		} else {
			const updatedCart = [...cartItems, { ...item, quantity: 1 }];
			localStorage.setItem('cart', JSON.stringify(updatedCart));
		}
		toast('Product added to cart');
	};

	return (
		<Layout>
			{product && (
				<div className='max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8 px-4 mt-48 pb-10'>
					<CustomImage product={product} />

					<div className='divide-2 text-white'>
						<div className='space-y-2 pb-8'>
							<h1 className='text-2xl md:text-4xl font-bold'>{product.bookTitle}</h1>
							<h2 className='text-gray-500 font-bold text-xl md:text-3xl'>{product.bookAuthor}</h2>
							<span className='text-gray-500 mt-6'>
								16
								<span className='text-gray-500'>000 so&apos;m</span>
							</span>
						</div>
						<div>
							<Rating name='size-large' sx={{ stroke: 'white' }} defaultValue={2} size='large' />
							<p className='text-lg md:text-sm mt-7 mb-7'>{product.bookDescription}</p>
							<Link
								href={product.amazonBookUrl}
								className='text-lg md:text-sm text-blue-400 mmt-7 mb-7'
							>
								{product.amazonBookUrl}
							</Link>
							<p className='text-lg md:text-sm text-gray-400 mt-7 mb-7'>
								<span className='text-white'>Publisher:</span> {product.bookPublisher}
							</p>
						</div>

						<div className='mt-10 space-x-5'>
							<a
								className='bg-slate-800 hover:bg-slate-500 text-white p-2 text-lg rounded-md transition duration-150 cursor-pointer'
								onClick={() => addToCart(product)}
							>
								Add to cart
							</a>
							<Link
								href={'/'}
								className='bg-slate-800 hover:bg-slate-500 text-white p-2 text-lg rounded-md transition duration-150'
							>
								Home back
							</Link>
						</div>
					</div>
				</div>
			)}
		</Layout>
	);
};

export default DetailBook;
