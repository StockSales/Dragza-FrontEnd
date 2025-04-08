import { Card } from "@/components/ui/card"
import TransactionsTable from "./transactions";

const CustomerList = () => {
  return (
    <div>
      <Card>
        <TransactionsTable />
      </Card>
    </div>
  );
}

export default CustomerList