export type UserType = {
    id: string | number;
    userName: string;
    email: string;
    phoneNumber: string;
    businessName: string;
    isPharmacy: boolean;
    region: string;
    action: React.ReactNode;
};