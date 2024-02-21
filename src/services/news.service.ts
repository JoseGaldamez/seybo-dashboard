import { NewModel } from "../models/new.mode";

const baseURLFirebase = import.meta.env.VITE_BACKEND_URL;
const baseURLWordPress = import.meta.env.VITE_WORDPRESS_URL;

export const getNewsFromFirebase = async () => {
    const listOfNews: NewModel[] = [];
    const response = await fetch(`${baseURLFirebase}/news.json`);
    if (response.ok) {
        const data = await response.json();

        const newsKeys = Object.keys(data);
        newsKeys.map((key) => {
            listOfNews.push({
                id: key,
                ...data[key],
            });
        });

        return listOfNews;
    }

    return null;
};

export const createNewInFirebase = async (newItem: NewModel) => {
    const response = await fetch(`${baseURLFirebase}/news.json`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
    });

    if (response.ok) {
        return true;
    }

    return false;
};

export const getNewsFromWordPress = async () => {
    const listOfNews: NewModel[] = [];

    const response = await fetch(`${baseURLWordPress}`);
    if (response.ok) {
        const data = await response.json();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        data.map((item: any) => {
            listOfNews.push({
                id: item.id,
                title: item.title.rendered,
                description: item.excerpt.rendered,
                url: item.link,
            });
        });

        return listOfNews;
    }

    return null;
};
