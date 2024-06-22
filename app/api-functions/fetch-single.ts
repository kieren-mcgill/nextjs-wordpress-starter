import {WordPressPost} from "@/types/wordpress-post.interface";

const wpAPIBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL;

export const fetchSingle = async (postType: string, slug : string) : Promise<WordPressPost> => {

    const endpoint = `${wpAPIBaseUrl}/${postType}?slug=${slug}&pages=100&_embed`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Error fetching post: ${response.statusText}`);
        }

        const data: Array<WordPressPost> = await response.json();

        if(data.length === 0) {
            throw new Error(`post of type: ${postType} with slug: ${slug} not found`)
        }

        return data[0];
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch post');
    }
}