import AdminSidebar from '@/components/admin/AdminSidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#F9FAFB] md:flex-row">
      <AdminSidebar />
      <main className="flex flex-1 flex-col">{children}</main>
    </div>
  )
}
