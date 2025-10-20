import { InvoiceForm } from "@/components/InvoiceForm";

export default function InvoicePage() {

  return (
    <div className="hero min-h-screen p-6 bg-[#FAFAFA] dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>
      <InvoiceForm  />
      {/* {invoice && <InvoicePreview invoice={invoice} />} */}
    </div>
  );
}