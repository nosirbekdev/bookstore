import Layout from '@/layout/layout';
import Image from 'next/image';

const About = () => {
	return (
		<Layout>
			<div className='mt-24 flex justify-between ml-20 items-center'>
				<div className=''>
					Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatibus similique minus
					ducimus harum modi? Deleniti nemo, deserunt laborum voluptate beatae quaerat blanditiis.
					Natus obcaecati velit possimus iste debitis fuga cupiditate deleniti ipsa similique,
					numquam tempora praesentium recusandae dolorum reprehenderit quos consequuntur magni neque
					ut. Veritatis nemo et eaque earum illo.
				</div>
				<div className='relative'>
					<Image
						src={'https://media.graphassets.com/LXXYfg3SRv2apNgaMNGT'}
						alt='content'
						width={500}
						height={500}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default About;
