'use client';

import { Avatar, Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { IHero } from './hero.props';

const Hero = ({ data }: IHero) => {
	const router = useRouter();

	console.log(data);

	return (
		<Box width={'100%'} height={'70vh'} sx={{ backgroundColor: 'crimson' }}>
			<Carousel
				responsive={{
					mobile: {
						breakpoint: { max: 4000, min: 0 },
						items: 1,
					},
				}}
			>
				{data.slice(0, 5).map(book => (
					<Box
						key={book.bookRank}
						sx={{ cursor: 'pointer' }}
						onClick={() => router.push(`/blog/${book}`)}
					>
						<Box sx={{ position: 'relative', width: '100%', height: '70vh' }}>
							<Image
								src={book.bookImage}
								alt={book.bookTitle}
								fill
								style={{ objectFit: 'cover' }}
								priority
							/>
							<Box
								sx={{
									position: 'absolute',
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									backgroundColor: 'rgba(0, 0, 0, .6)',
								}}
							/>
							<Box
								width={{ xs: '100%', md: '70%' }}
								position={'relative'}
								color={'white'}
								sx={{
									top: '50%',
									transform: 'translateY(-50%)',
									paddingLeft: { xs: '10px', md: '50px' },
								}}
								zIndex={999}
							>
								<Typography sx={{ fontSize: { xs: '30px', md: '50px' } }}>
									{book.bookTitle}
								</Typography>
								<Typography sx={{ fontSize: { xs: '20px', md: '30px' }, color: 'gray' }}>
									{book.bookDescription}
								</Typography>
								<Box sx={{ display: 'flex', gap: '10px', mt: '20px', alignItems: 'center' }}>
									<Avatar alt={book.bookAuthor} src={book.bookPublisher} />
									<Box>
										<Typography>{book.bookAuthor}</Typography>
										{/* <Box>
												{format(new Date(book.createdAt), 'dd MMM, yyyy')} &#x2022;
												{calculateEstimatedTimeToRead(book.description.text)}min read
											</Box> */}
									</Box>
								</Box>
							</Box>
						</Box>
					</Box>
				))}
			</Carousel>
		</Box>
	);
};

export default Hero;
