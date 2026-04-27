export default function ProfileSkeleton() {
    return (
        <div className="max-w-2xl mx-auto px-6 py-10 animate-pulse">
            {/* Back button skeleton */}
            <div className="h-4 w-16 bg-gray-800 rounded mb-8" />

            {/* Profile header skeleton */}
            <div className="flex items-start gap-6 mb-10">
                {/* Avatar */}
                <div className="w-16 h-16 rounded-full bg-gray-800 shrink-0" />
                <div className="flex-1">
                    {/* Display name */}
                    <div className="h-7 w-48 bg-gray-800 rounded mb-2" />
                    {/* Username */}
                    <div className="h-4 w-32 bg-gray-900 rounded mb-3" />
                    {/* Bio */}
                    <div className="h-4 w-full bg-gray-900 rounded mb-1" />
                    <div className="h-4 w-4/5 bg-gray-900 rounded mb-3" />
                    {/* Badges */}
                    <div className="flex gap-3">
                        <div className="h-5 w-10 bg-gray-800 rounded-full" />
                        <div className="h-5 w-16 bg-gray-800 rounded-full" />
                    </div>
                </div>
            </div>

            {/* Member since */}
            <div className="h-4 w-40 bg-gray-900 rounded mb-6" />

            {/* Edit button */}
            <div className="h-9 w-28 bg-gray-800 rounded" />
        </div>
    );
}