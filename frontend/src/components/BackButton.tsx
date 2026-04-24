import { useRouter } from 'next/router';

export default function BackButton() {
    const router = useRouter();
    
    return (
        <button
            onClick={() => router.back()}
            style={{
                background: 'none', border: 'none', cursor: 'pointer',
                color: '#555', fontSize: '14px', marginBottom: '16px',
                display: 'flex', alignItems: 'center', gap: '6px', padding: '0'
            }}
            onMouseEnter={e => (e.currentTarget).style.color = '#2D7D6F'}
            onMouseLeave={e => (e.currentTarget).style.color = '#555'}
        >
            ← Back
        </button>
    );
}