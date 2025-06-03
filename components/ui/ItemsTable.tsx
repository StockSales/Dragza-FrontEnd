import {ItemsTableProps, OrderItem} from "@/types/orders";
import {Button} from "@/components/ui/button";
import {Trash2} from "lucide-react";

const ItemsTable: React.FC<ItemsTableProps> = ({ items, deletedItems, onDeleteItem }) => {
    return (
        <table className="w-full">
            <thead>
            <tr>
                <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left">
                    <span className="block px-6 py-5 font-semibold">ITEM</span>
                </th>
                <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left">
                    <span className="block px-6 py-5 font-semibold">QUANTITY</span>
                </th>
                <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left">
                    <span className="block px-6 py-5 font-semibold">UNIT PRICE</span>
                </th>
                <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left">
                    <span className="block px-6 py-5 font-semibold">TOTAL</span>
                </th>
                <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-center">
                    <span className="block px-6 py-5 font-semibold">ACTION</span>
                </th>
            </tr>
            </thead>
            <tbody>
            {items.map((data: OrderItem) => (
                <tr
                    key={data.id}
                    className="border-b border-default-100 border-solid border-0"
                >
                    <td className="text-default-900 text-sm font-normal text-left px-6 py-4">
                        {data.item}
                    </td>
                    <td className="text-default-900 text-sm font-normal text-left px-6 py-4">
                        {data.qty}
                    </td>
                    <td className="text-default-900 text-sm font-normal text-left px-6 py-4">
                        ${parseFloat(String(data.price)).toFixed(2)}
                    </td>
                    <td className="text-default-900 text-sm font-normal text-left px-6 py-4">
                        ${data.total.toFixed(2)}
                    </td>
                    <td className="text-center px-6 py-4">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onDeleteItem(data.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </td>
                </tr>
            ))}
            {items.length === 0 && (
                <tr>
                    <td colSpan={6} className="text-center py-8 text-default-500">
                        No items in the order
                    </td>
                </tr>
            )}
            </tbody>
        </table>
    );
};

export default ItemsTable;