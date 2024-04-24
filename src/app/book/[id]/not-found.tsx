'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

const NotFound = () => {
	const router = useRouter();

	const reloadWindow = () => {
		router.refresh();
	};

	return (
		<>
			<div className='h-[70vh] flex justify-center items-center flex-col'>
				<h1 className='text-4xl'>Not Found Book detail</h1>
				<div className='mt-20 space-x-5'>
					<Link
						href={'/'}
						className='mt-24 border p-2 bg-slate-950 rounded-xl text-lg hover:bg-slate-500'
					>
						Home back
					</Link>
				</div>
			</div>
		</>
	);
};

export default NotFound;
