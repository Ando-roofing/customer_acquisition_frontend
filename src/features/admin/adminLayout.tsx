import { Outlet } from 'react-router-dom'
import ProtectedRoute from '@core/auth/ProtectedRoute'
import Header from '@shared/components/Header'
import Subheader from '@shared/components/Subheader'


const AdminLayout: React.FC = () => {
  return (
      <div className="page">
        <Header />
        <Subheader />
        <Outlet />
      </div>
  )
}

export default AdminLayout
