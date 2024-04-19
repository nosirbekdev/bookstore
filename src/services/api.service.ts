const base_url = process.env.NEXT_PUBLIC_API!;
const api_key = process.env.NEXT_PUBLIC_API_KEY!;
const public_domain = process.env.NEXT_PUBLIC_DOMAIN!;

export const API_REQUEST = {
	author: (bookAuthor: string) => `${base_url}/author/${bookAuthor}`,
	allBooks: `${base_url}/getBooks`,
	headers: {
		'X-RapidAPI-Key': `${api_key}`,
		'X-RapidAPI-Host': 'all-books-api.p.rapidapi.com',
	},
};
