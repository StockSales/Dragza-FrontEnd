"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UserType } from "@/types/users";
import { toast } from "sonner";
import useGetUsersByRoleId from "@/services/users/GetUsersByRoleId";
import UseResignOrderInventoryUser from "@/services/Orders/ResignOrderInventoryUser";

interface Props {
    orderId: string;
    itemIds: string[];
    onSuccess: () => void;
}

const ChangeInventoryUserDialogBulk = ({ orderId, itemIds, onSuccess }: Props) => {
    const { loading, resignOrder } = UseResignOrderInventoryUser();
    const { users: inventoryManagers, getUsersByRoleId } = useGetUsersByRoleId();

    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string | undefined>();

    useEffect(() => {
        if (open) getUsersByRoleId("1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D"); // Inventory Manager Role
    }, [open]);

    const handleSubmit = async () => {
        if (!selectedUserId) return toast.error("Select a manager first");
        try {

            const { success, error } = await resignOrder(orderId, selectedUserId, itemIds);

            if (!success) {
                toast.error(error);
                return;
            }

            toast.success("Inventory manager reassigned successfully");
            setOpen(false);
            onSuccess();
        } catch {
            toast.error("Failed to reassign manager");
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button disabled={itemIds.length === 0}>Reassign Inventory Manager</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Reassign Inventory Manager</DialogTitle>
                </DialogHeader>
                <div className="my-4">
                    <Select onValueChange={(val) => setSelectedUserId(val)}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select manager" />
                        </SelectTrigger>
                        <SelectContent>
                            {inventoryManagers.map((user: UserType) => (
                                <SelectItem key={user.id} value={user.id}>
                                    {user.userName}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <DialogFooter>
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? "Updating..." : "Update"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default ChangeInventoryUserDialogBulk;