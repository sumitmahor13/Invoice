export interface InvoiceFormInputs {
  currentDate: string;
  invoiceNumber: number;
  dueDate: Date;
  billFromName: string;
  billFromEmail: string;
  billFromAddress: string;
  billToName: string;
  billToEmail: string;
  billToAddress: string;
  currency: string;
  discount: number;
  tax: number;
  // note?: string;

  logo: File;
}


export interface Items {
  id: string,
  itemName:string,
  description:string,
  quantity: number,
  price:number
}