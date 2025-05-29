// Define the Coupon type
type CouponType = "value" | "percentage";

export interface Coupon {
    id: number;
    code: string;
    type: CouponType;
    numberOfUsers: number;
    value: number;
    startDate: string; // ISO date format
    endDate: string;   // ISO date format
    minCostToActivate: number;
    description: string;
    active: boolean;
}

// Sample data
export const coupons: Coupon[] = [
    {
        id: 1,
        code: "SAVE10",
        type: "value",
        numberOfUsers: 100,
        value: 10,
        startDate: "2025-06-01",
        endDate: "2025-06-30",
        minCostToActivate: 50,
        description: "Get $10 off on orders above $50",
        active: true,
    },
    {
        id: 2,
        code: "PERCENT20",
        type: "percentage",
        numberOfUsers: 50,
        value: 20,
        startDate: "2025-06-05",
        endDate: "2025-07-05",
        minCostToActivate: 100,
        description: "Get 20% off on orders above $100",
        active: false
    },
    {
        id: 3,
        code: "WELCOME50",
        type: "value",
        numberOfUsers: 200,
        value: 50,
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        minCostToActivate: 300,
        description: "Welcome offer: Get $50 off on your first order",
        active: true
    },
    {
        id: 4,
        code: "FLASH25",
        type: "percentage",
        numberOfUsers: 25,
        value: 25,
        startDate: "2025-06-10",
        endDate: "2025-06-11",
        minCostToActivate: 150,
        description: "Flash Sale: 25% off for 2 days only!",
        active: false
    },
    {
        id: 5,
        code: "FREESHIP",
        type: "value",
        numberOfUsers: 500,
        value: 5,
        startDate: "2025-05-01",
        endDate: "2025-12-31",
        minCostToActivate: 30,
        description: "Free shipping discount ($5 off)",
        active: true
    },
    {
        id: 6,
        code: "SUMMER30",
        type: "percentage",
        numberOfUsers: 75,
        value: 30,
        startDate: "2025-06-01",
        endDate: "2025-07-31",
        minCostToActivate: 120,
        description: "Summer Special: 30% off orders above $120",
        active: false
    },
    {
        id: 7,
        code: "BIGSAVE100",
        type: "value",
        numberOfUsers: 20,
        value: 100,
        startDate: "2025-07-01",
        endDate: "2025-07-15",
        minCostToActivate: 500,
        description: "Limited offer: Save $100 on big orders",
        active: true
    },
    {
        id: 8,
        code: "FESTIVE15",
        type: "percentage",
        numberOfUsers: 150,
        value: 15,
        startDate: "2025-12-01",
        endDate: "2025-12-31",
        minCostToActivate: 80,
        description: "Festive Season: 15% off on all products",
        active: false
    },
    {
        id: 9,
        code: "NIGHTOWL",
        type: "value",
        numberOfUsers: 60,
        value: 8,
        startDate: "2025-06-15T20:00:00Z",
        endDate: "2025-06-16T06:00:00Z",
        minCostToActivate: 40,
        description: "Night-only offer: Save $8",
        active: true
    },
    {
        id: 10,
        code: "NEWUSER25",
        type: "percentage",
        numberOfUsers: 300,
        value: 25,
        startDate: "2025-01-01",
        endDate: "2025-12-31",
        minCostToActivate: 0,
        description: "New users get 25% off on their first purchase",
        active: false
    },
    {
        id: 11,
        code: "BULKBUY20",
        type: "value",
        numberOfUsers: 40,
        value: 20,
        startDate: "2025-06-01",
        endDate: "2025-06-30",
        minCostToActivate: 200,
        description: "Save $20 when you spend $200 or more",
        active: true
    },
    {
        id: 12,
        code: "EXTRA5",
        type: "percentage",
        numberOfUsers: 1000,
        value: 5,
        startDate: "2025-05-01",
        endDate: "2025-11-30",
        minCostToActivate: 20,
        description: "Extra 5% off for all users",
        active: false
    }
];
