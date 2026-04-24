import BackButton from "@/components/BackButton";
import { getUserProfile, updateUserProfile } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function UpdateUserProfile() {
    const { isLoggedIn } = useAuth();
    const router = useRouter();
    const id = Number(router.query.id);
    const [loading, setLoading] = useState(true);

    const [user, setUser] = useState<User | null>(null);

    const [displayName, setDisplayName] = useState('');
    const [bio, setBio] = useState('');
    const [avatarUrl, setAvatarUrl] = useState('');
    const [preferredLang, setPreferredLang] = useState('en');
    const [error, setError] = useState('');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        setMounted(true);
    })

    useEffect(() => {
        if (!id) return;
        getUserProfile(id)
        .then((data) => {
            setUser(data);
            setDisplayName(data.displayName ?? '')
            setBio(data.bio ?? '')
            setAvatarUrl(data.avatarUrl ?? '')
            setPreferredLang(data.preferredLang ?? 'en');
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, [id]);

    if (!mounted) return null;
    
    if (!isLoggedIn) {
        router.push('/login');
        return null;
    } 

    if (loading) return <p className="p-6 text-devjima">Loading...</p>;

    

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        try {
            await updateUserProfile(id , {displayName, bio, avatarUrl, preferredLang});
            router.push(`/profile/${id}`);
        } catch {
            setError('Failed to update profile');
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-6 py-10">
            <BackButton />
            <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>
            {error && <p className="text-red-500 mb-4">{error}</p> }
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400">Display Name</label>
                    <input
                     type="text"
                     value={displayName}
                     onChange={e => setDisplayName(e.target.value)}
                     className="border border-gray-600 bg-transparent rounded px-4 py-2"
                      />                      
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400">Bio</label>
                    <textarea 
                    value={bio}
                    onChange={e => setBio(e.target.value)}
                    rows={4}
                    className="border border-gray-600 bg-transparent rounded px-4 py-2 resize-none" />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400">Avatar URL</label>
                    <input
                     type="text"
                     value={avatarUrl}
                     onChange={e => setAvatarUrl(e.target.value)}
                     className="border border-gray-600 bg-transparent rounded px-4 py-2"
                      />
                </div>
                <div className="flex flex-col gap-1">
                    <label className="text-sm text-gray-400">Preferred Language</label>
                    <div className="flex gap-3">
                        <button 
                        type="button"
                        onClick={() => setPreferredLang('en')}
                        className={`px-4 py-1 rounded-full text-sm border transition-colors ${
                            preferredLang === 'en'
                            ? 'bg-devjima-teal text-white border-devjima-teal'
                            : 'border-gray-600 text-gray-400'
                        }`}>
                            EN
                        </button>
                        <button
              type="button"
              onClick={() => setPreferredLang('ja')}
              className={`px-4 py-1 rounded-full text-sm border transition-colors ${
                preferredLang === 'ja'
                  ? 'bg-devjima-teal text-white border-devjima-teal'
                  : 'border-gray-600 text-gray-400'
              }`}
            >
              JP
            </button>
                    </div>
                </div>
                <div className="flex gap-4 mt-2">
                    <button type="submit"
                    className="bg-devjima-teal text-white px-6 py-2 rounded hover:bg-devjima-teal-hover transition-colors">
                        Save changes
                    </button>
                    <button type="button"
                    onClick={() => router.back()}
                     className="border border-gray-600 text-gray-400 px-6 py-2 rounded hover:border-gray-400 transition-colors"
                     >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}