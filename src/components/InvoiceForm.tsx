"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue} from "./ui/select";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { formSchema } from "@/validations/formSchema";
import { InvoiceFormInputs, Items } from "@/types";
import { Edit, Eye, LucideCloudUpload, Plus, Trash2, X } from "lucide-react";
import { ItemDialog } from "./ItemDialog";
import InvoicePreview from "./InvoicePreview";

export const InvoiceForm = () => {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [items, setItems] = useState<Items[]>([]);

  const [dialogMode, setDialogMode] = useState<"add" | "edit">("add");
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [selectedItem, setSelectedItem] = useState<any>(null)
  const [preview, setPreview] = useState<boolean>(false);

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
    setPreview(true)
    console.log(data);

  };

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

  const handleDialog = (mode: "add" | "edit", item?:unknown) => {
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
        className="w-[80%] p-6 flex flex-col gap-5 bg-white dark:bg-gray-800 rounded-lg shadow-sm"
      >
        {/* Current Date + Invoice Number */}
        <div className="flex flex-col gap-2">
          <div className="w-full flex justify-between">
            <div className="flex flex-col gap-1">
              <label className="font-semibold">Current Date</label>
              <div className="w-40">
                <Input
                type="text"
                disabled
                {...register("currentDate")}
                defaultValue={new Date().toLocaleDateString()}
              />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-semibold">Invoice No.</label>
              <div className="w-20">
                <Input
                {...register("invoiceNumber")}
                type="text"
                placeholder="123456"
              />
              </div>
              {errors.invoiceNumber && (
                <p className="text-red-500 text-xs">
                  {errors.invoiceNumber.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex w-48 flex-col gap-1">
            <label className="font-semibold">Due Date</label>
            <div className="w-40">
              <Input {...register("dueDate")} type="date" />
            </div>
            {errors.dueDate && (
              <p className="text-red-500 text-xs">{errors.dueDate.message}</p>
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
              <p className="text-red-500 text-xs">
                {errors.billFromName.message}
              </p>
            )}

            <Input
              {...register("billFromEmail")}
              type="email"
              placeholder="Email"
            />
            {errors.billFromEmail && (
              <p className="text-red-500 text-xs">
                {errors.billFromEmail.message}
              </p>
            )}

            <Input
              {...register("billFromAddress")}
              type="text"
              placeholder="Address"
            />
            {errors.billFromAddress && (
              <p className="text-red-500 text-xs">
                {errors.billFromAddress.message}
              </p>
            )}
          </div>

          {/* Bill To */}
          <div className="flex w-1/2 flex-col gap-2">
            <p className="font-semibold">Bill To:</p>
            <Input {...register("billToName")} type="text" placeholder="Name" />
            {errors.billToName && (
              <p className="text-red-500 text-xs">
                {errors.billToName.message}
              </p>
            )}

            <Input
              {...register("billToEmail")}
              type="email"
              placeholder="Email"
            />
            {errors.billToEmail && (
              <p className="text-red-500 text-xs">
                {errors.billToEmail.message}
              </p>
            )}

            <Input
              {...register("billToAddress")}
              type="text"
              placeholder="Address"
            />
            {errors.billToAddress && (
              <p className="text-red-500 text-xs">
                {errors.billToAddress.message}
              </p>
            )}
          </div>
        </div>

        <hr />

        <div><Button type="button" onClick={() => handleDialog('add')}><Plus/>Add Item</Button></div>

        {/* Items Table */}

        <table className="w-full text-left border-t border-b border-[#d1d5dc] mb-6">
          <thead className="bg-[#f3f4f6]">
            <tr>
              <th className="p-2 font-semibold w-[70%]">Item</th>
              <th className="p-2 font-semibold w-[10%]">Qty</th>
              <th className="p-2 font-semibold w-[10%]">Price</th>
              <th className="p-2 font-semibold w-[10%]">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.length > 0 ? (
              items.map((item) => (
                <tr key={item.id} className="border-t border-[#e5e7eb]">
                  <td className="p-2">
                    <p className="text-sm font-medium">{item.itemName}</p>
                    <p className="text-[12px] text-gray-500">{item.description}</p>
                  </td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    {item.price.toFixed(2)}
                  </td>
                  <td className="p-2">
                    <div className="flex gap-1 items-center">
                      <div onClick={() => deleteHandler(item.id)} className="text-red-500"><Trash2 size={20}/></div>
                      <div onClick={() => handleDialog('edit', item)} className="text-emerald-500"><Edit size={20}/></div>
                    </div>
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

        {/* Totals */}
        <div className="flex justify-end">
          <div className="w-1/2 text-sm">
            <div className="flex justify-between py-1">
              <span>Subtotal</span>
              <span>
                {formFields.currency} {summary.subTotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Discount ({formFields.discount}%)</span>
              <span>
                - {formFields.currency} {summary.discount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span>Tax ({formFields.tax}%)</span>
              <span>
                + {formFields.currency} {summary.tax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>
                {formFields.currency} {summary.total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
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
                    <SelectItem value="₹">₹ (INR)</SelectItem>
                    <SelectItem value="$">$ (USD)</SelectItem>
                    <SelectItem value="€">€ (EUR)</SelectItem>
                    <SelectItem value="£">£ (GBP)</SelectItem>
                    <SelectItem value="¥">¥ (JPY)</SelectItem>
                    <SelectItem value="₿">₿ (BTC)</SelectItem>
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

      {preview && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-60 flex justify-center items-center p-6 overflow-auto">
          <InvoicePreview
            logo={logoPreview}
            formData={formFields}
            items={items}
            summary={summary}
            setPreview={setPreview}
          />
        </div>
      )}

    </div>
  );
};
