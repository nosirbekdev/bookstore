'use client';

import { useAuth } from '@/hooks/useAuth';
import { LogoutOutlined, PersonOutlineOutlined, SearchOutlined } from '@mui/icons-material';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavMenu from './nav-menu';

const Header = () => {
	const [scrolled, setScrolled] = useState(false);
	const { logout } = useAuth();

	const user_id = Cookies.get('user_id');

	useEffect(() => {
		const handlerScroll = () => {
			if (window.scrollY > 0) {
				setScrolled(true);
			} else {
				setScrolled(false);
			}
		};
		window.addEventListener('scroll', handlerScroll);

		return () => window.removeEventListener('scroll', handlerScroll);
	}, []);

	return (
		<header className={`${scrolled && 'bg-[#1E0342] shadow-lg'}`}>
			<div className='flex items-center space-x-2 md:space-x-10'>
				<Image
					src={'/logo.svg'}
					alt='Image logo'
					width={56}
					height={56}
					priority
					className='cursor-pointer object-contain'
				/>

				<NavMenu />

				<ul className='md:flex hidden space-x-4'>
					<Link href={'/'}>
						<li className='navLink'>Home</li>
					</Link>
					<Link href={'/category'}>
						<li className='navLink'>Books</li>
					</Link>
					<Link href={'/cart'}>
						<li className='navLink'>Shopping cart</li>
					</Link>
					{/* <Link href={'/about'}>
						<li className='navLink'>About</li>
					</Link> */}
				</ul>
			</div>

			<div className='flex item-center space-x-4 text-[16px] font-light'>
				<SearchOutlined className='h-6 w-6 cursor-pointer' />
				{user_id ? (
					<Link href='/account'>
						<PersonOutlineOutlined className='h-6 w-6 cursor-pointer' />
					</Link>
				) : (
					<Link href='/auth'>
						<PersonOutlineOutlined className='h-6 w-6 cursor-pointer' />
					</Link>
				)}

				{user_id && <LogoutOutlined onClick={logout} className='h-6 w-6 cursor-pointer' />}
			</div>
		</header>
	);
};

export default Header;
