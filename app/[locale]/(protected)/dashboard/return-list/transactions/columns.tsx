import { ColumnDef } from "@tanstack/react-table";
import {formatDateToDMY} from "@/utils";


export const basecolumns = ({t} : {
  t: (key: string) => string;
}) : ColumnDef<any>[] => [
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
      const items = row.original.items || [];

      // Get only unique inventory names
      const names = Array.from(
          new Set(
              items
                .map((item: any) => item.inventoryName)
                .filter(Boolean)
          )
      );

      if (names.length === 0) {
        return <span>{t("unknown")}</span>;
      }

      const firstTwo = names.slice(0, 2);
      const remaining = names.slice(2);

      return (
          <div className="flex flex-col gap-1">
            {firstTwo.map((name: any, idx: any) => (
                <span key={idx}>{name}</span>
            ))}
            {remaining.length > 0 && (
                <span
                    className="text-blue-600 cursor-pointer"
                    title={remaining.join(", ")}
                >
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
  // {
  //   accessorKey: "totalReturnValue",
  //   header: "Return Cost",
  //   cell: ({ row }) => {
  //     return <span>{row.getValue("totalReturnValue")}</span>;
  //   },
  // }
];
