import { Cta } from '@/components';
import Hero from '@/components/hero/hero';
import { IBooks } from '@/interfaces/app.interface';
import Layout from '@/layout/layout';
import axios from 'axios';

const Category = async () => {
	const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/getBooks`, {
		headers: {
			'X-RapidAPI-Key': `${process.env.NEXT_PUBLIC_API_KEY}`,
			'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com',
		},
	});
	const data: IBooks[] = res.data;

	return (
		<Layout>
			<div className=''>
				{data.length && <Hero data={data.slice(50, 55)} />}

				{data.length && <Cta data={data} title='All Books' />}
			</div>
		</Layout>
	);
};

export default Category;
