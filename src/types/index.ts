export interface InvoiceFormInputs {
  currentDate: string;
  invoiceNumber: string;
  dueDate: string;
  billFromName: string;
  billFromEmail: string;
  billFromAddress: string;
  billToName: string;
  billToEmail: string;
  billToAddress: string;
  currency: string;
  discount: string;
  tax: string;
  notes: string;

  logo?: File | null;
}