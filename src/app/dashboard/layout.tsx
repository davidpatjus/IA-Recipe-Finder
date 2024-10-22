import SideBar from "../components/SideBar";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
        <SideBar />
        {children}
    </div>
  )
}

export default DashboardLayout;