import { Outlet } from 'react-router-dom'

const AuthLayout: React.FC = () => {
  return (
    <div className="auth-layout min-vh-100 d-flex align-items-center justify-content-center">
      <div className="auth-container w-100" style={{ maxWidth: 420 }}>
        <Outlet />
      </div>
    </div>
  )
}

export default AuthLayout
