import { Tag } from '@/types';

interface TagPickerProps {
    tags: Tag[];
    selectedTags: number[];
    onToggle: (tagId: number) => void;
}

export default function TagPicker({ tags, selectedTags, onToggle }: TagPickerProps) {
    return (
        <div>
            <p className="text-xs text-gray-500 mb-2 uppercase tracking-wider">Tags</p>
            <div className="flex gap-2 flex-wrap">
                {tags.map(tag => (
                    <button
                        key={tag.id}
                        type="button"
                        onClick={() => onToggle(tag.id)}
                        className={`px-3 py-1 rounded-full text-xs border transition-colors ${
                            selectedTags.includes(tag.id)
                                ? 'bg-devjima-teal text-white border-devjima-teal'
                                : 'border-gray-600 text-gray-400 hover:border-gray-400'
                        }`}
                    >
                        {tag.name}
                    </button>
                ))}
            </div>
        </div>
    );
}