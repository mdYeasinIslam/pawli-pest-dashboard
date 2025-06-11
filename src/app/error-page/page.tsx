import Link from "next/link";

export default function Unauthorized() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
            <h1 className="text-7xl font-extrabold text-red-600 mb-4">401</h1>
            <h2 className="text-2xl font-semibold text-gray-700 mb-2">Unauthorized Access</h2>
            <p className="text-gray-500 mb-6 text-center">
                You do not have permission to view the admin dashboard. Please log in with an authorized account.
            </p>
            <Link
                href="/login"
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
                Go to Login
            </Link>
        </div>
    );
}