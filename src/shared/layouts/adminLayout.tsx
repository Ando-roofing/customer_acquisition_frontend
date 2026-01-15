import { Outlet } from 'react-router-dom'
import ProtectedRoute from '@core/auth/ProtectedRoute'
// import AdminSidebar from './AdminSidebar'
// import AdminNavbar from './AdminNavbar'

const AdminLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="admin-layout d-flex">
        {/* <AdminSidebar /> */}

        <div className="flex-grow-1">
          {/* <AdminNavbar /> */}
          <main className="p-4">
            <Outlet />
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AdminLayout
