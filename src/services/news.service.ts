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
                uuid: key,
                ...data[key],
            });
        });

        const listOrdened = listOfNews.sort((a, b) => {
            return b.id - a.id;
        });

        return listOrdened;
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

export const deleteNewInFirebase = async (id: string) => {
    const response = await fetch(`${baseURLFirebase}/news/${id}.json`, {
        method: "DELETE",
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
                date: item.date.split("T")[0].replace(/-/g, "/"),
                description: item.excerpt.rendered,
                content: item.content.rendered,
                url: item.link,
                image: extractImageFeatured(item),
            });
        });

        return listOfNews;
    }

    return null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const extractImageFeatured = (item: any) => {
    if (
        item._embedded["wp:featuredmedia"] &&
        item._embedded["wp:featuredmedia"][0].source_url
    ) {
        return item._embedded["wp:featuredmedia"][0].source_url;
    }

    return "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png";
};
