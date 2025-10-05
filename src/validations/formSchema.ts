import * as yup from "yup";

export const formSchema = yup.object().shape({
  currentDate: yup.string().required("Current date is required"),

  invoiceNumber: yup
    .number()
    .typeError("Please Enter Number")
    .min(0, "Invalid Number")
    .required("Tax is required"),

  dueDate: yup
  .date()
  .typeError("Invalid date")
  .required("Due date is required")
  .min(new Date(), "Due date cannot be in the past"),

  // Bill From section
  billFromName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Sender name is required"),

  billFromEmail: yup
    .string()
    .email("Invalid email")
    .required("Sender email is required"),

  billFromAddress: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .required("Sender address is required"),

  // Bill To section
  billToName: yup
    .string()
    .min(2, "Name must be at least 2 characters")
    .required("Recipient name is required"),

  billToEmail: yup
    .string()
    .email("Invalid email")
    .required("Recipient email is required"),

  billToAddress: yup
    .string()
    .min(5, "Address must be at least 5 characters")
    .required("Recipient address is required"),

  // Sidebar fields
  currency: yup.string().required("Currency selection is required"),

  discount: yup
    .number()
    .typeError("Enter a valid number for Discount")
    .min(0, "Discount cannot be negative")
    .required("Tax is required"),

  tax: yup
    .number()
    .typeError("Enter a valid number for tax")
    .min(0, "Tax cannot be negative")
    .required("Tax is required"),

  // note: yup.string().max(300, "Notes cannot exceed 300 characters").notRequired(),

  logo: yup.mixed<File>().nullable().required(),

});

export const itemSchema = yup.object().shape({
  itemName: yup
    .string()
    .required("Item name is required")
    .min(3, "Item Name must be at least 3 characters"),

  description: yup
    .string()
    .required("Description is required")
    .min(5, "Description length must be at least 5 characters"),

  quantity: yup
    .number()
    .required("Quantity is required")
    .typeError("Enter a valid number for Quantity")
    .min(1, "Quantity can't be less then 1"),

  price: yup
    .number()
    .required("Price is required")
    .typeError("Enter a valid Price")
    .min(0, "Price cannot be negative"),
})
