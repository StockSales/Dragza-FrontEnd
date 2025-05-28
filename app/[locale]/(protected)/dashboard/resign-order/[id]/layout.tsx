import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Resign Order',
  description: 'Resign Order Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;