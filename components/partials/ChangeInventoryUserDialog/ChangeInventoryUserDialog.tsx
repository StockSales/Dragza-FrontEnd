"use client";

import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import useGetUsersByRoleId from "@/services/users/GetUsersByRoleId";
import {Edit2, Trash2} from "lucide-react";
import {useEffect, useState} from "react";
import {toast} from "sonner";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {UserType} from "@/types/users";
import UseResignOrderInventoryUser from "@/services/Orders/ResignOrderInventoryUser";

interface Props {
    orderId: string;
    inventoryUserId: string | undefined;
    onSuccess: () => void;
}

const ChangeInventoryUserDialog = ({
                                       orderId,
                                       inventoryUserId,
                                       onSuccess,
                                   }: Props) => {
    // resigning Order to another inventory manager
    const {loading, resignOrder, error} = UseResignOrderInventoryUser()

    const [open, setOpen] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState(inventoryUserId);

    const {
        users: inventoryManagers,
        getUsersByRoleId,
    } = useGetUsersByRoleId();

    // fetch on dialog open
    const handleOpenChange = (isOpen: boolean) => {
        setOpen(isOpen);
        if (isOpen) getUsersByRoleId("1A5A84FB-23C3-4F9B-A122-4C5BC6C5CB2D");
    };

    const handleSubmit = async () => {
        try {
            await resignOrder(orderId, selectedUserId as string);
            toast.success("Inventory user updated successfully");
            setOpen(false);
            onSuccess(); // refetch the table
        } catch (err) {
            toast.error("Failed to update inventory user");
        }
    };

    useEffect(() => {
        console.log("selectedUserId", selectedUserId);
        console.log("inventoryUserId", inventoryUserId);
    }, [inventoryUserId]);

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="flex items-center p-2 border-b text-warning hover:text-white bg-blue-100 hover:bg-blue-300 duration-200 transition-all rounded-full cursor-pointer w-[32px] h-[32px]"
                >
                    <Edit2 className="w-4 h-4 text-blue-400 hover:text-white"/>
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Change Inventory Manager</DialogTitle>
                </DialogHeader>
                <div className="my-4">
                    <Select
                        value={selectedUserId}
                        onValueChange={(value) => setSelectedUserId(value)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a manager"/>
                        </SelectTrigger>
                        <SelectContent>
                            {inventoryManagers.map((user: UserType) => (
                                <SelectItem key={user.id} value={user.id.toString()}>
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

export default ChangeInventoryUserDialog;
