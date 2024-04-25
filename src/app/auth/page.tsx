import Sign from '@/components/sign/sign';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Auth',
};

const Auth = () => {
	return <Sign />;
};

export default Auth;
