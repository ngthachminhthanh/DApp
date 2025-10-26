import { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { type NFTMintFormData } from "@/types";
import { Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function MintDialog() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<NFTMintFormData>({
    defaultValues: {
      files: null,
      mintFee: 0.012,
    },
  });
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [isDragOver, setIsDragOver] = useState(false);

  const onSubmit = (data: NFTMintFormData) => {
    console.log("Form data:", data);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      const updated = [...selectedFiles, ...filesArray];
      setSelectedFiles(updated);

      setValue("files", updated, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(false);

    const filesArray = Array.from(e.dataTransfer.files);
    const updated = [...selectedFiles, ...filesArray];
    setSelectedFiles(updated);

    setValue("files", updated, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const removeFile = (index: number) => {
    const updated = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(updated);

    setValue("files", updated.length > 0 ? updated : null, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="!space-y-4 rounded-2xl p-6">
      <h2 className="text-center text-lg font-semibold">Goodman NFT</h2>
      <label
        htmlFor="file-upload"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={() => setIsDragOver(false)}
        className={cn(
          "flex flex-col items-center justify-center h-32 w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition",
          isDragOver && "bg-gray-50 border-primary"
        )}
      >
        <Upload className="h-6 w-6 text-gray-400 mb-2" />
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          multiple
          className="hidden"
          {...register("files", {
            validate: (files) =>
              (files && files.length > 0) || "File is required",
          })}
          onChange={handleFileChange}
        />
        <p className="text-sm text-gray-600">
          Drag and drop your files to upload
        </p>
        <p className="text-xs text-gray-400">.csv</p>
      </label>
      {errors.files && (
        <p className="text-xs text-red-500">{errors.files.message}</p>
      )}

      {selectedFiles.length > 0 && (
        <ul className="space-y-2">
          {selectedFiles.map((file, index) => (
            <li
              key={index}
              className="flex items-center justify-between p-2 border rounded-md text-sm bg-gray-50"
            >
              <span>
                {file.name}{" "}
                <span className="text-gray-400 text-xs">
                  ({(file.size / 1024).toFixed(1)} KB)
                </span>
              </span>
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="text-red-500 hover:text-red-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="flex flex-col space-y-1">
        <Label className="!mb-2">Mint Fee</Label>
        <div className="relative">
          <Input
            type="number"
            step="0.001"
            className="pr-12"
            {...register("mintFee", {
              required: "Mint fee is required",
              min: { value: 0, message: "Fee must be positive" },
            })}
          />
          <span className="absolute inset-y-0 right-3 flex items-center text-gray-500 text-sm">
            ZKN
          </span>
        </div>
        {errors.mintFee && (
          <p className="text-xs text-red-500">{errors.mintFee.message}</p>
        )}
      </div>

      <Button
        type="submit"
        className="w-full h-11"
      >
        Mint
      </Button>
    </form>
  );
}
