import Hero from '@/components/hero/hero';
import { IBooks } from '@/interfaces/app.interface';
import Layout from '@/layout/layout';
import axios from 'axios';
import { cookies } from 'next/headers';

const Home = async () => {
	const user_id = cookies().get('user_id');

	const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/getBooks`, {
		headers: {
			'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
			'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com',
		},
	});
	const data: IBooks[] = res.data;

	return (
		<>
			<Layout>
				<div className='relative'>{data.length && <Hero data={data} />}</div>
			</Layout>
		</>
	);
};

export default Home;
