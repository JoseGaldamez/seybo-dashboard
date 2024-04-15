import { useStore } from "../global/store";
import { NewModel } from "../models/new.mode"
import { deleteNewInFirebase } from "../services/news.service";

export const NewCard = ({ item }: { item: NewModel }) => {

    const { setNeedUpdateON } = useStore();

    const handleDeleteNewFromFirebase = async () => {
        const result = await deleteNewInFirebase(item.uuid!);
        if (result) {
            alert('Noticia eliminada');
            setNeedUpdateON();
        }
    }

    return (
        <div key={item.id} className="bg-white flex-1 rounded-lg min-w-72 max-w-96 relative overflow-hidden flex flex-col justify-between mb-5">
            <div>
                <img src={item.image} alt={item.title} className="w-full h-48 object-cover" />
                <span className="absolute top-0 p-1 text-xs bg-stone-800 text-white">{item.date}</span>
                <div className="p-3">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="text-gray-500" dangerouslySetInnerHTML={{ __html: item.description }}></p>
                </div>
            </div>
            <button onClick={handleDeleteNewFromFirebase} className="bg-red-500 text-white p-4 hover:bg-red-900">Eliminar de la App</button>
        </div>
    )
}
