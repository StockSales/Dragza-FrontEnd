import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sellers',
  description: 'Sellers Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;