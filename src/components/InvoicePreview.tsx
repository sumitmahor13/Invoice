"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Items, InvoiceFormInputs } from "@/types";
import { Button } from "./ui/button";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useReactToPrint } from "react-to-print";

interface InvoicePreviewProps {
  logo?: string | null;
  formData: InvoiceFormInputs;
  items: Items[];
  summary: {
    subTotal: number;
    discount: number;
    tax: number;
    total: number;
  };
  setPreview: React.Dispatch<React.SetStateAction<boolean>>;
}

const InvoicePreview: React.FC<InvoicePreviewProps> = ({ logo, formData, items, summary, setPreview}) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const handlePrint = useReactToPrint({ contentRef });

  return (
    <div className="w-10/12 flex flex-col gap-5">
      <div ref={contentRef} id="invoice" className="bg-[#fff] p-10 rounded-lg w-full max-w-4xl mx-auto text-[#1e2939] font-sans">
        {/* Header */}
        <div className="flex justify-between items-start border-b pb-6 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-4xl font-bold">Invoice</h1>
            <p className="text-sm text-[#6a7282]">
              Date: {formData.currentDate} | Invoice #: {formData.invoiceNumber}
            </p>
            <p className="text-sm text-[#6a7282]">Due: {formData.dueDate}</p>
          </div>

          <div className="text-right">
            {logo && (
              <div className="mb-3 flex justify-end">
                <Image
                  src={logo}
                  alt="Company Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
              </div>
            )}
            <p className="font-semibold">{formData.billFromName}</p>
            <p>{formData.billFromEmail}</p>
            <p>{formData.billFromAddress}</p>
          </div>
        </div>

        {/* Bill To Section */}
        <div className="flex justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold mb-1">Bill To:</h2>
            <p className="font-medium">{formData.billToName}</p>
            <p>{formData.billToEmail}</p>
            <p>{formData.billToAddress}</p>
          </div>
        </div>

        {/* Items Table */}
        <table className="w-full text-left border-t border-b border-[#d1d5dc] mb-6">
          <thead className="bg-[#f3f4f6]">
            <tr>
              <th className="p-2 font-semibold">Item</th>
              <th className="p-2 font-semibold">Qty</th>
              <th className="p-2 font-semibold">Price</th>
              <th className="p-2 font-semibold text-right">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="border-t border-[#e5e7eb]">
                  <td className="p-2">{item.itemName}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    {formData.currency} {item.price.toFixed(2)}
                  </td>
                  <td className="p-2 text-right">
                    {formData.currency} {(item.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-[#99a1af]">
                  No items added yet
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Summary */}
        <div className="flex justify-end">
          <div className="w-1/2 text-sm">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>
                {formData.currency} {summary.subTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Discount ({formData.discount}%)</span>
              <span>
                - {formData.currency} {summary.discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax ({formData.tax}%)</span>
              <span>
                + {formData.currency} {summary.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {formData.currency} {summary.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
       
      </div>

      <div className="fixed bottom-5 right-10 flex justify-center">
        <Button onClick={() => setPreview(false)}>Cancel</Button>
        <Button onClick={handlePrint} className="bg-[#0080ff]">Download PDF</Button>
      </div>
    </div>
  );
};

export default InvoicePreview;
