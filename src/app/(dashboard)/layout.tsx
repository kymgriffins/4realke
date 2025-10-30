export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-semibold">4Realke Car Inspections</h1>
            <nav>
              {/* Add navigation links here */}
            </nav>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
