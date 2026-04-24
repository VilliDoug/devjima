import { useRouter } from 'next/router';

interface EditActionButtonsProps {
    onDelete?: () => void;
    editPath?: string;
    showEdit?: boolean;
    showDelete?: boolean;
}

export default function EditActionButtons({ onDelete, editPath, showEdit = true, showDelete = true }: EditActionButtonsProps) {
    const router = useRouter();

    return (
        <div className="flex gap-2">
            {showEdit && editPath && (
                <button
                    onClick={() => router.push(editPath)}
                    className="border border-gray-600 text-gray-400 px-3 py-1 rounded text-sm hover:border-gray-400 transition-colors bg-transparent cursor-pointer"
                >
                    Edit
                </button>
            )}
            {showDelete && onDelete && (
                <button
                    onClick={onDelete}
                    className="border border-red-800 text-red-400 px-3 py-1 rounded text-sm hover:border-red-500 transition-colors bg-transparent cursor-pointer"
                >
                    Delete
                </button>
            )}
        </div>
    );
}