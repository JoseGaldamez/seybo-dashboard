import { useEffect, useState } from "react"
import { getNewsFromFirebase } from "../services/news.service";
import { NewModel } from "../models/new.mode";
import { NewCard } from "./NewCard";
import { TitleListNews } from "./TitleListNews";
import { useStore } from "../global/store";

export const ListNews = () => {

    const { needUpdate, setNeedUpdateOFF } = useStore();

    const [news, setNews] = useState<NewModel[]>([])

    useEffect(() => {
        if (needUpdate || news.length === 0) {
            handleGetNews();
            setNeedUpdateOFF();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [needUpdate])

    const handleGetNews = async () => {
        const result = await getNewsFromFirebase();
        console.log(result);
        if (result) {
            setNews(result);
        }
    }

    return (
        <div className="bg-gray-100 py-32 px-16 ">
            <div className="mx-auto max-w-7xl">
                <div className="flex justify-between mb-5">
                    <TitleListNews firebaseNews={news} />
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
        </div>
    )
}
