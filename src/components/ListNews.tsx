import { useEffect, useState } from "react"
import { getNewsFromFirebase } from "../services/news.service";
import { NewModel } from "../models/new.mode";
import { NewCard } from "./NewCard";
import { TitleListNews } from "./TitleListNews";

export const ListNews = () => {

    const [news, setNews] = useState<NewModel[]>([])

    useEffect(() => {
        handleGetNews();
    }, [])

    const handleGetNews = async () => {
        const result = await getNewsFromFirebase();
        console.log(result);
        if (result) {
            setNews(result);
        }
    }

    return (
        <div className="bg-gray-100 py-32 px-16">
            <div className="flex justify-between mb-5">

                <TitleListNews />
            </div>
            <hr className="mb-10" />
            {
                news.length === 0 && <p>No hay noticias</p>
            }
            <div className="flex gap-4 flex-wrap">
                {
                    news.map((item: NewModel) => {
                        return (
                            <NewCard key={item.id} item={item} />
                        )
                    })
                }
            </div>
        </div>
    )
}
