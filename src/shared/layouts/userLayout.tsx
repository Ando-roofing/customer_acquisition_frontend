import { Outlet } from 'react-router-dom'
import ProtectedRoute from '@core/auth/ProtectedRoute'
// import UserNavbar from './UserNavbar'

const UserLayout: React.FC = () => {
  return (
    <ProtectedRoute>
      <div className="user-layout">
        {/* <UserNavbar /> */}
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  )
}

export default UserLayout
