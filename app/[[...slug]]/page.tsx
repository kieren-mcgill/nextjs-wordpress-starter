import React from 'react';
import {fetchAll} from "@/app/api-functions/fetch-all";
import {WordPressPost} from "@/types/wordpress-post.interface";
import {Params} from "@/types/params.interface"
import {fetchSingle} from "@/app/api-functions/fetch-single";

const  Page: React.FC<Params> = async ({ params  }) => {

    const slugArray: string[] | undefined = params.slug;

    const pageSlug : string = slugArray ? slugArray[slugArray.length - 1] : "home-page";

    const pageData : WordPressPost = await fetchSingle("pages", pageSlug)

    return (
        <div>
            <h1>{pageData.title.rendered}</h1>
        </div>
    );
}

export async function getStaticPaths() : Promise<Object> {
    const pages: WordPressPost[] = await fetchAll("pages")

    const paths : Object = pages.map(page  => {
        const slugs : string[] = [];
        let currentPage: WordPressPost | undefined = page;

        while (currentPage) {

            slugs.unshift(currentPage.slug);
            currentPage = pages.find(p => p.id === currentPage?.parent);
        }

        return {params: {slug: slugs}};
    });

    return {
        paths,
        fallback: true,
    };
}

export default Page;