export default function FeedSkeletonCard() {
    return (
        <div className="border border-gray-800 rounded-xl p-6 animate-pulse w-full">
            <div className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-full bg-gray-600 shrink-0" />
                <div className="h-3 w-24 bg-gray-700 rounded" />
                <div className="h-5 w-8 bg-gray-700 rounded-full ml-auto" />
            </div>
            <div className="h-5 w-3/4 bg-gray-700 rounded mb-3" />
            <div className="flex gap-2">
                <div className="h-5 w-16 bg-gray-700 rounded-full" />
                <div className="h-5 w-16 bg-gray-700 rounded-full" />
            </div>
        </div>
    );
}