import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Add Category',
  description: 'Add Category Page'
}
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
    </>
  );
};

export default Layout;