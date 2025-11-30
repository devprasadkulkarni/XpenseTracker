export default function Transactions({ items = [], onDelete, onEdit }) {
    return (
        <ul className="space-y-2">
            {items.map((it, idx) => (
                <li
                    key={`${it.title}-${idx}`}
                    className="flex justify-between p-3 bg-white rounded shadow items-center"
                >
                    <div>
                        <div className="font-semibold">{it.title}</div>
                        <div className="text-sm text-gray-500">
                            {it.category} • {it.date}
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="font-bold">₹ {it.price}</div>

                        <button
                            onClick={() => onEdit(idx)}
                            className="px-2 py-1 bg-blue-500 text-white rounded"
                        >
                            Edit
                        </button>

                        <button
                            onClick={() => onDelete(idx)}
                            className="px-2 py-1 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </div>
                </li>
            ))}
        </ul>
    );
}
