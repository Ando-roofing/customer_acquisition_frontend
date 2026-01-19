import { Outlet } from 'react-router-dom'
import Header from '@shared/components/Header'
import Subheader from '@shared/components/Subheader'


const Layout: React.FC = () => {
  return (
      <div className="page">
        <Header />
        <Subheader UserRole="admin" />
        <Outlet />
      </div>
  )
}

export { Layout }
