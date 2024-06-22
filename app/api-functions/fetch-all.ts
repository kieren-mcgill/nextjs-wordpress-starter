import {WordPressPost} from "@/types/wordpress-post.interface";

const wpAPIBaseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_BASE_URL;


export const fetchAll = async (postType: string): Promise<WordPressPost[]> => {

    const endpoint = `${wpAPIBaseUrl}/${postType}?pages=100&_embed`;

    try {
        const response = await fetch(endpoint);

        if (!response.ok) {
            throw new Error(`Error fetching posts: ${response.statusText}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fetch error:', error);
        throw new Error('Failed to fetch posts');
    }
};

