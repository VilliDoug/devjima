import Sidebar from "@/components/layout/Sidebar";
import FeedSkeletonCard from "./FeedSkeletonCard";

export default function IndexFeedSkeleton () {
    return (
    <div className="flex overflow-hidden" style={{ height: 'calc(100vh - 52px)' }}>
        <Sidebar />
        <main className="flex-1 min-w-0 border-r border-gray-800 overflow-y-auto pt-8 pb-24"
              style={{ height: 'calc(100vh - 52px)' }}>
            {/* Search bar skeleton */}
            <div className="max-w-[600px] mx-auto mb-6 px-6">
                <div className="h-9 bg-gray-800 rounded-md animate-pulse" />
            </div>
            {/* Post skeletons */}
            <div className="max-w-[800px] mx-auto px-6 flex flex-col gap-6">
                {[...Array(5)].map((_, i) => <FeedSkeletonCard key={i} />)}
            </div>
        </main>
        <aside className="shrink-0 px-5 py-8 bg-[#0d0d0d] border-l border-gray-800"
               style={{ width: '260px', height: 'calc(100vh - 52px)' }}>
            <div className="h-3 w-24 bg-gray-700 rounded animate-pulse mb-4" />
            <div className="flex flex-col gap-3">
                {[...Array(3)].map((_, i) => (
                    <div key={i} className="h-12 bg-gray-800 rounded-lg animate-pulse" />
                ))}
            </div>
        </aside>
    </div>
);
}