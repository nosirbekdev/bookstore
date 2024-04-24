import { Button, Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import { MouseEvent, useState } from 'react';

const NavMenu = () => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);

	const handlerClick = (evt: MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(evt.currentTarget);
	};

	const handlerClose = () => {
		setAnchorEl(null);
	};

	return (
		<div className='md:!hidden'>
			<Button
				id='basic-button'
				aria-controls={open ? 'basic-menu' : undefined}
				aria-haspopup='true'
				aria-expanded={open ? 'true' : undefined}
				onClick={handlerClick}
				className={'!text-white'}
			>
				Browse
			</Button>
			<Menu
				id='basic-menu'
				anchorEl={anchorEl}
				open={open}
				onClose={handlerClose}
				MenuListProps={{ 'aria-labelledby': 'basic-button' }}
				className='menu'
			>
				<Link href={'/'}>
					<MenuItem>Home</MenuItem>
				</Link>
				<Link href={'/category'}>
					<MenuItem>Books</MenuItem>
				</Link>
				<Link href={'/cart'}>
					<MenuItem>Shopping cart</MenuItem>
				</Link>
				{/* <Link href={'/about'}>
					<MenuItem>About</MenuItem>
				</Link> */}
			</Menu>
		</div>
	);
};

export default NavMenu;
