export type UserType = {
    id: string ;
    userName: string;
    email: string;
    phoneNumber: string;
    businessName: string;
    minOrder: number;
    isActive: boolean;
    roleId: string;
    isPharmacy: boolean;
    region: string;
    action: React.ReactNode;
};