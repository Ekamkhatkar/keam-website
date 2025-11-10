// app/admin/layout.tsx
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div style={{ background: '#000000', color: 'white', minHeight: '100vh' }}>
      {children}
    </div>
  )
}