import { Navbar } from '@/components';
import Cart from '@/components/cart/cart';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Shopping cart',
};

const ShoppingCart = () => {
	return (
		<>
			<Navbar />
			<Cart />
		</>
	);
};

export default ShoppingCart;
