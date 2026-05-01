import BackButton from "@/components/ui/BackButton";
import LanguageToggle from "@/components/ui/LanguageToggle";
import SaveCancelButtons from "@/components/ui/SaveCancelButtons";
import { getUserProfile, updateUserProfile } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { User } from "@/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { getData } from 'country-list';

export default function UpdateUserProfile() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();
  const id = Number(router.query.id);
  const [loading, setLoading] = useState(true);
  const countries = getData();

  const [user, setUser] = useState<User | null>(null);

  const [displayName, setDisplayName] = useState("");
  const [bio, setBio] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [preferredLang, setPreferredLang] = useState("en");
  const [country, setCountry] = useState("");
  const [error, setError] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    setMounted(true);
  });

  useEffect(() => {
    if (!id) return;
    getUserProfile(id)
      .then((data) => {
        setUser(data);
        setDisplayName(data.displayName ?? "");
        setBio(data.bio ?? "");
        setAvatarUrl(data.avatarUrl ?? "");
        setPreferredLang(data.preferredLang ?? "en");
        setCountry(data.country ?? "");
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (!mounted) return null;

  if (!isLoggedIn) {
    router.push("/login");
    return null;
  }

  if (loading) return <p className="p-6 text-devjima">Loading...</p>;

  const validate = (): boolean => {
  if (!displayName.trim()) {
    setError("表示名は必須です");
    return false;
  }
  if (displayName.length > 50) {
    setError("表示名は50文字以内で入力してください");
    return false;
  }
  if (bio.length > 255) {
    setError("自己紹介文は255文字以内で入力してください");
    return false;
  }  
  return true;
};

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await updateUserProfile(id, {
        displayName,
        bio,
        avatarUrl,
        preferredLang,
      });
      router.push(`/profile/${id}`);
    } catch {
      setError("Failed to update profile");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <BackButton />
      <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Display Name</label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="border border-gray-600 bg-transparent rounded px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={4}
            className="border border-gray-600 bg-transparent rounded px-4 py-2 resize-none"
          />
        </div>
        <select
  value={country}
  onChange={(e) => setCountry(e.target.value)}
  className="border border-gray-600 bg-[#0a0a0a] text-gray-300 rounded px-4 py-2 w-full"
>
  <option value="">Select a country</option>
  {countries.map((c) => (
    <option key={c.code} value={c.name}>
      {c.name}
    </option>
  ))}
</select>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Avatar URL</label>
          <input
            type="text"
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            className="border border-gray-600 bg-transparent rounded px-4 py-2"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-400">Preferred Language</label>
          <LanguageToggle language={preferredLang} onChange={setPreferredLang} />
        </div>
        <SaveCancelButtons />
      </form>
    </div>
  );
}
