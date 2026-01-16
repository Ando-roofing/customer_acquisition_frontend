import { Outlet } from 'react-router-dom'
import Header from '@shared/components/Header'
import Subheader from '@shared/components/Subheader'


const UserLayout: React.FC = () => {
  return (
    <div className="page">
        <Header />
        <Subheader />
        <Outlet />
    </div>
  )
}

export default UserLayout
