import { ColumnDef } from "@tanstack/react-table";
import {formatDateToDMY} from "@/utils";


export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "pharmacyName",
    header: "Pharmacy Name",
    cell: ({ row }) => {
      const name = row.original.pharmacyName;
      return (
          <div className="font-medium text-card-foreground/80">
          <span className="text-sm text-default-600 whitespace-nowrap">
            {name ?? "Unknown User"}
          </span>
          </div>
      );
    },
  },
  {
    accessorKey: "inventoryName",
    header: "Inventory Username",
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
        return <span>John Doe</span>;
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
    header: "Return Date",
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
