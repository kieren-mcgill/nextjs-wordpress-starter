export interface WordPressPost {
    id: number;
    title: { rendered: string };
    slug: string,
    link: string,
    acf: object,
    parent: number
}