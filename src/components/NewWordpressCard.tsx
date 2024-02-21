import { NewModel } from "../models/new.mode"

export const NewWordpressCard = ({ item }: { item: NewModel }) => {
    return (
        <div>
            {
                item.title
            }
        </div>
    )
}
