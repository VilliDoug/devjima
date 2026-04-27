import Sidebar from "@/components/layout/Sidebar";

export default function PostDetailSkeleton() {
    return (
    <div className="flex min-h-screen">
        <Sidebar />
        <main className="flex-1 min-w-0 w-full max-w-4xl mx-auto px-10 py-8 overflow-y-auto h-full animate-pulse">
            {/* Back button skeleton */}
            <div className="h-4 w-16 bg-gray-800 rounded mb-8" />

            {/* Author row skeleton */}
            <div className="flex items-center gap-2 mb-6">
                <div className="h-3 w-24 bg-gray-800 rounded" />
                <div className="h-3 w-16 bg-gray-800 rounded" />
                <div className="h-5 w-8 bg-gray-800 rounded-full" />
                <div className="flex gap-2 ml-auto">
                    <div className="h-7 w-24 bg-gray-800 rounded-md" />
                    <div className="h-7 w-16 bg-gray-800 rounded-md" />
                </div>
            </div>

            {/* Tags skeleton */}
            <div className="flex gap-2 mb-8">
                <div className="h-6 w-16 bg-gray-800 rounded-full" />
                <div className="h-6 w-20 bg-gray-800 rounded-full" />
            </div>

            <div className="border-t border-gray-900 my-6" />

            {/* Title skeleton */}
            <div className="h-8 w-3/4 bg-gray-800 rounded mb-4" />
            <div className="h-8 w-1/2 bg-gray-800 rounded mb-8" />

            {/* Body skeleton */}
            <div className="flex flex-col gap-3">
                <div className="h-4 w-full bg-gray-900 rounded" />
                <div className="h-4 w-full bg-gray-900 rounded" />
                <div className="h-4 w-5/6 bg-gray-900 rounded" />
                <div className="h-4 w-full bg-gray-900 rounded" />
                <div className="h-4 w-4/5 bg-gray-900 rounded" />
                <div className="h-32 w-full bg-gray-900 rounded-lg mt-4" />
                <div className="h-4 w-full bg-gray-900 rounded mt-4" />
                <div className="h-4 w-3/4 bg-gray-900 rounded" />
            </div>
        </main>

        <aside className="w-72 shrink-0 px-5 py-8 h-full overflow-y-auto bg-[#0d0d0d] border-l border-gray-900">
            <div className="h-3 w-24 bg-gray-700 rounded animate-pulse mb-4" />
        </aside>
    </div>
);

}