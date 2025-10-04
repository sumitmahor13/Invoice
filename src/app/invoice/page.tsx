
import { useState } from "react";
import { InvoiceForm } from "@/components/InvoiceForm";
// import InvoicePreview from "@/components/InvoicePreview";
// import { Invoice } from "@/types";

export default function InvoicePage() {
  // const [invoice, setInvoice] = useState<Invoice | null>(null);

  return (
    <div className="min-h-screen p-6 bg-gray-50 dark:bg-gray-900">
      <h1 className="text-3xl font-bold mb-6">Create Invoice</h1>
      <InvoiceForm  />
      {/* {invoice && <InvoicePreview invoice={invoice} />} */}
    </div>
  );
}