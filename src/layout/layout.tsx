import { Footer, Navbar } from '@/components';

import { Box } from '@mui/material';
import { LayoutProps } from './layout.props';

const Layout = ({ children }: LayoutProps): JSX.Element => {
	return (
		<>
			<Navbar />
			<Box>{children}</Box>
			<Footer />
		</>
	);
};
export default Layout;
