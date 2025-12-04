import { ColumnDef } from "@tanstack/react-table";
import { formatDateToDMY } from "@/utils";

export const basecolumns = ({ t }: { t: (key: string) => string }): ColumnDef<any>[] => [
  {
    accessorKey: "pharmacyName",
    header: t("pharmacyName"),
    cell: ({ row }) => {
      const name = row.original.pharmacyName;
      return (
        <div className="font-medium text-card-foreground/80">
          <span className="text-sm text-default-600 whitespace-nowrap">
            {name ?? t("unknown")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "inventoryName",
    header: t("inventoryName"),
    cell: ({ row }) => {
      // استخدم inventoryUser الرئيسي إذا موجود
      const mainInventory = row.original.inventoryUser?.bussinesName;

      // استخرج أسماء inventory من items في حالة وجود أكثر من واحد
      const items = row.original.items || [];
      const itemNames = Array.from(
        new Set(
          items
            .map((item: any) => item.inventoryUser?.bussinesName)
            .filter(Boolean)
        )
      );

      // دمج الاسم الرئيسي مع أسماء العناصر مع إزالة التكرار
      const names = mainInventory ? Array.from(new Set([mainInventory, ...itemNames])) : itemNames;

      if (names.length === 0) {
        return <span>{t("unknown")}</span>;
      }

      // عرض أول اسمين + عدد الباقي إذا زاد
      const firstTwo = names.slice(0, 2);
      const remaining = names.slice(2);

      return (
        <div className="flex flex-col gap-1">
          {firstTwo.map((name: string, idx: number) => (
            <span key={idx}>{name}</span>
          ))}
          {remaining.length > 0 && (
            <span className="text-blue-600 cursor-pointer" title={remaining.join(", ")}>
              +{remaining.length} more
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "requestDate",
    header: t("returnDate"),
    cell: ({ row }) => {
      return <span>{formatDateToDMY(row.original.requestDate)}</span>;
    },
  },
  // إذا أردت يمكنك إعادة عمود totalReturnValue
  // {
  //   accessorKey: "totalReturnValue",
  //   header: t("returnCost"),
  //   cell: ({ row }) => <span>{row.original.totalReturnValue}</span>,
  // },
];
