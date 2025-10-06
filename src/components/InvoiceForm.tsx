"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "./ui/select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/validations/formSchema";
import { InvoiceFormInputs, Items } from "@/types";
import { Edit, Eye, LucideCloudUpload, Trash2, X } from "lucide-react";
import { ItemDialog } from "./ItemDialog";
import InvoicePreview from "./InvoicePreview";

export const InvoiceForm = () => {
  const [formData, setFormData] = useState<InvoiceFormInputs | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [items, setItems] = useState<Items[]>([]);

  const [dialogMode, setDialogMode] = useState<"add" | "edit" | "view">("add");
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)

  const [summary, setSummary] = useState({ subTotal: 0, discount: 0, tax: 0, total: 0});

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvoiceFormInputs>({
    resolver: yupResolver(formSchema),
    mode: "onTouched",
  });

  const onSubmit: SubmitHandler<InvoiceFormInputs> = (data) => {
    console.log(data);
    setFormData(data);
  };

  const options = [
    { id: 1, name: "Apple", quantity: 10, price: "$5" },
    { id: 2, name: "Orange", quantity: 6, price: "$3" },
    { id: 3, name: "Banana", quantity: 12, price: "$4" },
  ];

  const handleLogo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoPreview(URL.createObjectURL(file));
      setValue("logo", file);
    }
  };

  const removeLogo = () => {
    setLogoPreview(null);
    setValue("logo", null);
  }

  const handleDialog = (mode: "add" | "edit" | "view", item?:unknown) => {
    setDialogMode(mode)
    setOpenDialog(true);
    setSelectedItem(item)
  }

  const itemSubmit = (data:any) => {
    if(dialogMode == "add"){
      setItems([...items, data]);
    }else if(dialogMode == "edit"){
      let filteredItem = items.map((item) => item.id == selectedItem.id ? data : item)
      setItems(filteredItem)
    }
  }

  const deleteHandler = (id:string) => {
    const filteredItems = items.filter((item) => item.id !== id);
    setItems(filteredItems)
  }
  
  const calculation = (items:Items[], formFields:InvoiceFormInputs) => {
    let subTotal = items.reduce((prev, next) => prev + next.price*next.quantity,0);
    let discount = (formFields.discount/100)*subTotal || 0
    let tax = (formFields.tax/100)*subTotal || 0
    
    const total = subTotal+tax-discount
    return {subTotal, discount, tax, total};
  }
  
  const formFields = watch();
  useEffect(() => {
      const newSummary = calculation(items, formFields)
      setSummary(newSummary)

  }, [items, formFields.discount, formFields.tax])
  
  


  return (
    <div className="flex w-full gap-5">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-[80%] p-6 flex flex-col gap-5 bg-white dark:bg-gray-800 rounded-lg shadow-md"
      >
        {/* Current Date + Invoice Number */}
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Current Date</label>
              <Input
                type="text"
                disabled
                {...register("currentDate")}
                defaultValue={new Date().toLocaleDateString()}
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Invoice No.</label>
              <Input
                {...register("invoiceNumber")}
                type="text"
                placeholder="012234"
              />
              {errors.invoiceNumber && (
                <p className="text-red-500 text-sm">
                  {errors.invoiceNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-48 flex-col gap-1">
            <label className="font-semibold">Due Date</label>
            <div>
              <Input {...register("dueDate")} type="date" />
            </div>
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate.message}</p>
            )}
          </div>
        </div>

        <hr />

        {/* Bill From & Bill To */}
        <div className="flex w-full gap-5">
          {/* Bill From */}
          <div className="flex w-1/2 flex-col gap-2">
            <p className="font-semibold">Bill From:</p>
            <Input
              {...register("billFromName")}
              type="text"
              placeholder="Name"
            />
            {errors.billFromName && (
              <p className="text-red-500 text-sm">
                {errors.billFromName.message}
              </p>
            )}

            <Input
              {...register("billFromEmail")}
              type="email"
              placeholder="Email"
            />
            {errors.billFromEmail && (
              <p className="text-red-500 text-sm">
                {errors.billFromEmail.message}
              </p>
            )}

            <Input
              {...register("billFromAddress")}
              type="text"
              placeholder="Address"
            />
            {errors.billFromAddress && (
              <p className="text-red-500 text-sm">
                {errors.billFromAddress.message}
              </p>
            )}
          </div>

          {/* Bill To */}
          <div className="flex w-1/2 flex-col gap-2">
            <p className="font-semibold">Bill To:</p>
            <Input {...register("billToName")} type="text" placeholder="Name" />
            {errors.billToName && (
              <p className="text-red-500 text-sm">
                {errors.billToName.message}
              </p>
            )}

            <Input
              {...register("billToEmail")}
              type="email"
              placeholder="Email"
            />
            {errors.billToEmail && (
              <p className="text-red-500 text-sm">
                {errors.billToEmail.message}
              </p>
            )}

            <Input
              {...register("billToAddress")}
              type="text"
              placeholder="Address"
            />
            {errors.billToAddress && (
              <p className="text-red-500 text-sm">
                {errors.billToAddress.message}
              </p>
            )}
          </div>
        </div>

        <hr />

        <div><Button type="button" onClick={() => handleDialog('add')}>Add Item</Button></div>

        {/* Items Table */}
        <table className="table-auto w-full border-gray-300">
          <thead className="border-t border-b">
            <tr className="bg-gray-100">
              <th className="text-left border p-2 w-[80%]">ITEM</th>
              <th className="text-left border p-2 w-[5%]">QTY</th>
              <th className="text-left border p-2 w-[10%]">PRICE</th>
              <th className="text-left border p-2 w-[5%]">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-t">
                <td className="p-2 w-[60%]">{item.itemName}</td>
                <td className="p-2 w-[10%]">{item.quantity}</td>
                <td className="p-2 w-[15%]">{item.price}</td>
                <td className="p-2 w-[15%] flex gap-2">
                  <Button onClick={() => deleteHandler(item.id)} size="sm" type="button" className="bg-red-500">
                    <Trash2/>
                  </Button>
                  <Button onClick={() => handleDialog('edit', item)} size="sm" type="button" className="bg-emerald-500">
                    <Edit/>
                  </Button>
                  <Button onClick={() => handleDialog('view', item)} size="sm" type="button" className="bg-cyan-500">
                    <Eye/>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <hr />

        {/* Totals */}
        <div className="w-full flex justify-end">
          <div className="w-1/2 grid grid-cols-2 gap-x-5">
            <p>Sub Total:</p>
            <p>{summary.subTotal}</p>
            <p>Discount:</p>
            <p>({formFields.discount}%){summary.discount}</p>
            <p>Tax:</p>
            <p>({formFields.tax}%){summary.tax}</p>
            <p className="col-span-2">
              <hr />
            </p>
            <p>Total:</p>
            <p>{(summary.total).toLocaleString()}</p>
          </div>
        </div>

        <hr />

        {/* Notes */}
        {/* <div className="flex flex-col gap-1">
          <label className="font-semibold">Notes</label>
          <Textarea {...register("note")} placeholder="Add a note..." />
          {errors.note && (
            <p className="text-red-500 text-sm">{errors.note.message}</p>
          )}
        </div> */}

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Generate Invoice"}
        </Button>
      </form>

      {/* Sidebar */}
      <div className="w-[20%] p-6 flex flex-col gap-3 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        {/* Image */}
        <div className="flex flex-col gap-2">
          <label className="font-semibold">Company Logo</label>
          {logoPreview ? (
            <div className="relative overflow-hidden aspect-square flex justify-center items-center border-2 rounded-xl border-dashed">
              <img
                src={logoPreview}
                alt="Logo Preview"
                className="object-fit"
              />
              <button type="button" className="absolute top-2 right-2 text-xs rounded-full bg-red-500 text-white px-1 py-1" onClick={removeLogo}>
                <X size={14}/>
              </button>
            </div>
          ) : (
            <label className="aspect-square flex justify-center items-center border-2 rounded-xl border-dashed">
              <div className="flex gap-2 text-gray-400"><LucideCloudUpload/> Upload Logo</div>
              <input
              type="file"
              className="hidden"
              accept="image/*"
              {...register("logo")}
              onChange={handleLogo}
            />
            </label>
          )}
          {errors.logo && (
            <p className="text-red-500 text-sm">{errors.logo.message}</p>
          )}
        </div>

        <label>
          <p className="font-bold">Currency</p>
          <Controller
            name="currency"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Currency</SelectLabel>
                    <SelectItem value="INR">₹ (INR)</SelectItem>
                    <SelectItem value="USD">$ (USD)</SelectItem>
                    <SelectItem value="EUR">€ (EUR)</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors.currency && (
            <p className="text-red-500 text-sm">{errors.currency.message}</p>
          )}
        </label>

        <label className="flex flex-col gap-1">
          <p className="font-bold">Discount</p>
          <Input {...register("discount")} type="number" placeholder="10%" />
          {errors.discount && (
            <p className="text-red-500 text-sm">{errors.discount.message}</p>
          )}
        </label>

        <label className="flex flex-col gap-1">
          <p className="font-bold">Tax</p>
          <Input {...register("tax")} type="number" placeholder="15%" />
          {errors.tax && (
            <p className="text-red-500 text-sm">{errors.tax.message}</p>
          )}
        </label>

        <ItemDialog open={openDialog} mode={dialogMode} onClose={() => setOpenDialog(false)} onItemSubmit={itemSubmit} selected={selectedItem}/>
      </div>
    </div>
  );
};
