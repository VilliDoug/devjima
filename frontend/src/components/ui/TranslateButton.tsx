interface TranslateButtonProps {
    onTranslate: () => void;
    translating: boolean;
    translated: boolean;
    sourceLang: string;
}

export default function TranslateButton({ onTranslate, translating, translated, sourceLang }: TranslateButtonProps) {
    return (
        <button
            onClick={onTranslate}
            className="bg-transparent border border-gray-700 rounded-md px-3 py-1 text-xs text-gray-500 hover:border-devjima-teal transition-colors cursor-pointer"
            style={{ color: translated ? '#2D7D6F' : undefined }}
        >
            {translating ? 'Translating...'
                : translated ? '← Original'
                : sourceLang === 'ja' ? '🌐 → English'
                : '🌐 → 日本語'}
        </button>
    );
}