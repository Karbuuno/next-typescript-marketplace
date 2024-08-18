import SideBar from "@/components/ui/sideBar";
import AdminDashboard from "./_components/AdminSideBar";
import AdminSidebar from "./_components/AdminSideBar";
import MobileSidebar from "@/components/ui/mobileSideBar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
     <SideBar />
      <div className=' flex flex-col'>
        <MobileSidebar />
        {children}
      </div>
    </main>
  );
};
export default AdminLayout;
