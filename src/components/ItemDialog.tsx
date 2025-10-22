"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "./ui/textarea";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { itemSchema } from "@/validations/formSchema";

interface ItemDialogProps {
  open: boolean;
  mode: "add" | "edit" | "view";
  onClose: () => void;
  onItemSubmit: (data: any) => void;
  selected:any
}

export const ItemDialog = ({
  open,
  mode,
  onClose,
  onItemSubmit,
  selected,
}: ItemDialogProps) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(itemSchema),
    mode: "onTouched",
  });

  useEffect(() => {
    if ((mode === "edit" || mode === "view") && selected) {
      reset(selected);
    } else if (mode === "add") {
      reset({
        itemName: "",
        description: "",
        quantity: undefined,
        price: undefined,
      });
    }
  }, [selected, mode, reset]);

  const onSubmit = (data: any) => {
    const payload = {
        id: Date.now(),
        ...data
    }
    onItemSubmit(payload)
    reset()
    onClose()
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>
              {mode === "add" && "Add Item"}
              {mode === "edit" && "Edit Item"}
              {mode === "view" && "View Item"}
            </DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 mb-3">
            <div className="grid gap-3">
              <Label htmlFor="itemName">Item Name</Label>
              <Input
                id="itemName"
                {...register("itemName")}
                name="itemName"
                disabled={mode == "view"}
              />
              {errors.itemName && (
                <p className="text-red-500 text-sm">
                  {errors.itemName.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                {...register("description")}
                name="description"
                disabled={mode == "view"}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">
                  {errors.description.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                type="number"
                id="quantity"
                {...register("quantity")}
                name="quantity"
                disabled={mode == "view"}
              />
              {errors.quantity && (
                <p className="text-red-500 text-sm">
                  {errors.quantity.message}
                </p>
              )}
            </div>
            <div className="grid gap-3">
              <Label htmlFor="price">Price</Label>
              <Input
                type="number"
                id="price"
                {...register("price")}
                name="price"
                disabled={mode == "view"}
              />
              {errors.price && (
                <p className="text-red-500 text-sm">{errors.price.message}</p>
              )}
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            {mode !== "view" && (
              <Button type="submit" disabled={isSubmitting}>
                {mode == "add" ? "Add" : "Update"}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
