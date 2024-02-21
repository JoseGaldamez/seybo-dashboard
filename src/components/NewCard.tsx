import { NewModel } from "../models/new.mode"

export const NewCard = ({ item }: { item: NewModel }) => {
    return (
        <div key={item.id} className="bg-white rounded-lg">
            <h2 className="text-2xl font-bold">{item.title}</h2>
            <p className="text-gray-600">{item.description}</p>
        </div>
    )
}
