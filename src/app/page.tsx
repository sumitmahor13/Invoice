import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-900">
      <h1 className="text-4xl font-bold mb-4">Invoice Generator</h1>
      <p className="mb-6 text-gray-700 dark:text-gray-300">
        Create professional invoices instantly.
      </p>
      <Link
        href="/invoice"
        className="px-6 py-3 bg-blue-600 text-white rounded-lg"
      >
        Create Invoice
      </Link>
    </div>
  );
}
