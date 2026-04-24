interface LanguageToggleProps {
    language: string;
    onChange: (lang: string) => void;
    size?: 'sm' | 'xs';
}

export default function LanguageToggle({ language, onChange, size = 'sm' }: LanguageToggleProps) {
    return (
        <div className="flex gap-3">
            {['en', 'ja'].map(lang => (
                <button
                    key={lang}
                    type="button"
                    onClick={() => onChange(lang)}
                    className={`px-${size === 'xs' ? '3' : '4'} py-1 rounded-full text-${size} border transition-colors ${
                        language === lang
                            ? 'bg-devjima-teal text-white border-devjima-teal'
                            : 'border-gray-600 text-gray-400'
                    }`}
                >
                    {lang === 'en' ? 'EN' : 'JP'}
                </button>
            ))}
        </div>
    );
}