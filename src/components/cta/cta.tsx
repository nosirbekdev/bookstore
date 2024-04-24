'use client';

import { IBooks } from '@/interfaces/app.interface';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import CustomImage from '../image/image';
import { CtaProps } from './cta.props';

const Cta = ({ data, title, button }: CtaProps) => {
	const router = useRouter();

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
		<div>
			<section className='text-gray-600 body-font mt-5'>
				<div className='container px-5 py-24 mx-auto'>
					<h1 className='text-4xl mb-5 text-gray-400'>{title}</h1>
					<div className='flex flex-wrap -m-4 '>
						{data.map((item, index) => (
							<div className='lg:w-1/4 md:w-1/2 p-4 w-full shadow-md' key={index}>
								<a className='block relative h-48 rounded overflow-hidden docs-creator'>
									<CustomImage product={item} />
								</a>
								<div
									className='mt-4 cursor-pointer'
									onClick={() => router.push(`/book/${item.bookIsbn}`)}
								>
									<h3 className='text-gray-400 text-xs tracking-widest title-font mb-1'>
										{item.bookPublisher}
									</h3>
									<h2
										className='text-gray-200 title-font text-lg font-medium line-clamp-1'
										onClick={() => router.push(`/book/${item.bookIsbn}`)}
									>
										{item.bookTitle}
									</h2>
									<div className='flex justify-between items-center'>
										<p className='mt-1 line-clamp-1'>{item.bookAuthor}</p>
										<span className='text-gray-500 ml-3'>
											16
											<span className='text-gray-500 ml-1'>000 so&apos;m</span>
										</span>
									</div>
								</div>
								<div className='mt-1'>
									<button
										className='bg-slate-800 hover:bg-slate-500 text-white p-2 text-lg rounded-md transition duration-150'
										onClick={() => addToCart(item)}
									>
										Add to cart
									</button>
								</div>
							</div>
						))}
					</div>
					<div className='flex items-center mt-10 justify-center'>
						<Link
							href={'/category'}
							className='shadow-md bg-slate-800 text-white px-2 text-lg rounded-md'
						>
							{button}
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Cta;
