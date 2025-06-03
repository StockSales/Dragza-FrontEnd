import {BillSummaryProps, OrderItem} from "@/types/orders";

const BillSummary: React.FC<BillSummaryProps> = ({ items, deletedItems, defaultItems }) => {
  const activeItems: OrderItem[] = items.filter((item: OrderItem) => !deletedItems.includes(parseInt(item.id)));
  const subtotal: number = activeItems.reduce((sum: number, item: OrderItem) => sum + item.total, 0);
  const couponDiscount: number = 20.50;
  const invoiceTotal: number = subtotal - couponDiscount;

  return (
      <div className="border border-solid border-default-400 rounded-md overflow-hidden">
        <table className="w-full">
          <thead>
          <tr>
            <th
                colSpan={3}
                className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left"
            >
              <span className="block px-6 py-5 font-semibold">ITEM</span>
            </th>
            <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left">
              <span className="block px-6 py-5 font-semibold">QUANTITY</span>
            </th>
            <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left">
              <span className="block px-6 py-5 font-semibold">UNIT PRICE</span>
            </th>
            <th className="bg-default-50 text-xs font-medium leading-4 uppercase text-default-600 text-left last:text-right">
              <span className="block px-6 py-5 font-semibold">TOTAL</span>
            </th>
          </tr>
          </thead>
          <tbody>
          {defaultItems.map((data: OrderItem) => {
            const isDeleted: boolean = deletedItems.includes(parseInt(data.id));
            return (
                <tr
                    key={data.id}
                    className={`border-b border-default-100 border-solid border-0 transition-all duration-300 ${
                        isDeleted ? 'opacity-50' : ''
                    }`}
                >
                  <td
                      colSpan={3}
                      className={`text-default-900 text-sm font-normal text-left px-6 py-4 relative ${
                          isDeleted ? 'line-through' : ''
                      }`}
                  >
                    {data.item}
                    {isDeleted && (
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full h-0.5 bg-red-500 animate-pulse"></div>
                        </div>
                    )}
                  </td>
                  <td className={`text-default-900 text-sm font-normal text-left px-6 py-4 ${
                      isDeleted ? 'line-through' : ''
                  }`}>
                    {data.qty}
                  </td>
                  <td className={`text-default-900 text-sm font-normal text-left px-6 py-4 ${
                      isDeleted ? 'line-through' : ''
                  }`}>
                    ${parseInt(String(data.price)).toFixed(2)}
                  </td>
                  <td className={`text-default-900 text-sm font-normal text-left last:text-right px-6 py-4 ${
                      isDeleted ? 'line-through' : ''
                  }`}>
                    ${data.total.toFixed(2)}
                  </td>
                </tr>
            );
          })}
          </tbody>
        </table>
        <div className="md:flex px-6 py-6 items-center">
          <div className="flex-1 min-w-[270px] space-y-3">
            <div className="flex justify-between">
            <span className="font-medium text-default-600 text-xs uppercase">
              Subtotal:
            </span>
              <span className="text-default-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
            <span className="font-medium text-default-600 text-xs uppercase">
              Coupon Discount:
            </span>
              <span className="text-default-900">${couponDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between border-solid border-t border-default-200 pt-3">
            <span className="font-medium text-default-600 text-xs uppercase">
              Invoice total:
            </span>
              <span className="text-default-900 font-bold">${invoiceTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
  );
};

export default BillSummary;