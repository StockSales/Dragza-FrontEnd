export type User = {
  id?: any;
  name: string;
  email: string;
  password: string;
  image: string;
  role: "Admin" | "inventory" | "sales";
};

export const users : User[] = [
  {
    name: "Dr/ Mina Emad",
    email: "minaemad@gmail.com",
    password: "password",
    image: '/images/users/user-1.jpg',
    role: "Admin",
  },
  {
    name: "Inventory Manager",
    email: "inventory@gmail.com",
    password: "inventory123",
    image: '/images/users/user-2.jpg',
    role: "inventory",
  },
  {
    name: "Sales Person",
    email: "sales@gmail.com",
    password: "sales123",
    image: '/images/users/user-3.jpg',
    role: "sales",
  },
];


export const getUserByEmail = (email: string) => {
  return users.find((user) => user.email === email);
};
