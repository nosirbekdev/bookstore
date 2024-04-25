import AccountAuthor from '@/components/author/author';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Account',
};

const Account = () => {
	return (
		<>
			<AccountAuthor />
		</>
	);
};

export default Account;
