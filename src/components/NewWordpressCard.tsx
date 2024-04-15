import { useState } from "react";
import { NewModel } from "../models/new.mode"
import { createNewInFirebase } from "../services/news.service";

export const NewWordpressCard = ({ item, exist }: { item: NewModel, exist: boolean }) => {

    const [added, setAdded] = useState(false)

    const handleAddToFirebase = async () => {
        console.log("Agregado a la aplicación");

        const result = await createNewInFirebase(item);
        setAdded(result);

    }

    return (
        <div className="min-w-72 max-w-80 flex-1 flex flex-col justify-between">
            <div>

                <div className="flex-1">
                    <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                </div>
                <div>
                    <p>{item.date}</p>
                    <h3 className="font-bold text-base">{item.title}</h3>
                </div>
            </div>
            <div>
                <button onClick={handleAddToFirebase} disabled={exist || added} className="bg-stone-900 text-white w-full py-3 my-3 rounded font-bold disabled:bg-stone-400 ">
                    {
                        (exist || added) ? "Ya está en la aplicación" : "Agregar a la aplicación"
                    }
                </button>
            </div>


        </div>
    )
}
