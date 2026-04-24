import { useRouter } from 'next/router';

interface SaveCancelButtonsProps {
    saveLabel?: string;
    onCancel?: () => void;
}

export default function SaveCancelButtons({ saveLabel = 'Save changes', onCancel }: SaveCancelButtonsProps) {
    const router = useRouter();

    return (
        <div className="flex gap-4">
            <button
                type="submit"
                className="bg-devjima-teal text-white px-6 py-2 rounded hover:bg-devjima-teal-hover transition-colors"
            >
                {saveLabel}
            </button>
            <button
                type="button"
                onClick={onCancel ?? (() => router.back())}
                className="border border-gray-600 text-gray-400 px-6 py-2 rounded hover:border-gray-400 transition-colors"
            >
                Cancel
            </button>
        </div>
    );
}