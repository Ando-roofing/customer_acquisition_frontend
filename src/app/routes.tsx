import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '@core/auth/ProtectedRoute'

// Auth
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import ChangePassword from '../features/auth/pages/ChangePassword'
import UpdateProfile from '../features/auth/pages/UpdateProfile'
import Dashboard from '../features/auth/pages/Dashboard'
import Profile from '../features/auth/pages/UserProfile'

// Admin
import ProductList from '../features/admin/pages/ProductList'
import BranchList from '../features/admin/pages/BranchesList'
import AdminChangePassword from '../features/admin/pages/AdminChangePassword'
import UserList from '../features/admin/pages/UsersLists'
import AddUser from '../features/admin/pages/AddUser'
import UserUpdation from '../features/admin/pages/UserUpdate'
import AdminUserDetail from '../features/admin/pages/UserDetail'
import VisitLisit from '../features/admin/pages/AdminVisitList'
import Visitdetails from '../features/admin/pages/AdminVisitDetails'
import AdminSalesList from '../features/admin/pages/AdminSaleList'
import AdminSalesDetails from '../features/admin/pages/AdminSales'
import AdminPaymentList from '../features/admin/pages/AdminPaymentList'
import MyVerifications from '../features/admin/pages/Verifications'
import VerificationsDetail from '../features/admin/pages/VerificationDetail'
import VerificationsUpdate from '../features/admin/pages/VerificationsUpdate'
import Messages from '../features/admin/pages/Message'

// User
import AddVisit from '../features/users/AddVisit'
import CustomerList from '../features/users/CustomerList'
import AddCustomers from '../features/users/AddCustomers'
import CustomerDetails from '../features/users/CustomersDetails'
import UpdateCustomers from '../features/users/UpdateCustomer'
import AddVisits from '../features/users/AddVisits'
import VisitList from '../features/users/VisitLisit'
import VisitDetail from '../features/users/VisitDetails'
import UpdateVisits from '../features/users/UpdateVisits'
import CreateSales from '../features/users/CreateSales'
import SalesLists from '../features/users/SalesList'
import SalesDetail from '../features/users/SalesDetails'
import Payments from '../features/users/PaymentsList'
import PaymentDetail from '../features/users/PaymentDetails'
import SubmitVerifications from '../features/users/SubmitVerification'
import VisitVerificationLisit from '../features/users/VisitVerificationList'
import VerificationDetail from '../features/users/VerificationDetails'
import UserVerificationMessage from '../features/users/UserMessage'
import AuthLayout from '@shared/layouts/authLayout'
import AdminLayout from '@shared/layouts/adminLayout'
import UserLayout from '@shared/layouts/userLayout'

const AppRoutes: React.FC = () => {
  return (
    <Routes>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<Login />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path="/register" element={<ProtectedRoute><Register /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
        <Route path="/profile/change-password" element={<ProtectedRoute><ChangePassword /></ProtectedRoute>} />
        <Route path="/profile/update" element={<ProtectedRoute><UpdateProfile /></ProtectedRoute>} />

        <Route path="/products" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
        <Route path="/branches" element={<ProtectedRoute><BranchList /></ProtectedRoute>} />
        <Route path="/admin-change-password" element={<ProtectedRoute><AdminChangePassword /></ProtectedRoute>} />
        <Route path="/users" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
        <Route path="/add-user" element={<ProtectedRoute><AddUser /></ProtectedRoute>} />
        <Route path="/users-update/:id/update" element={<ProtectedRoute><UserUpdation /></ProtectedRoute>} />
        <Route path="/users-details/:id" element={<ProtectedRoute><AdminUserDetail /></ProtectedRoute>} />

        <Route path="/admin-visit-list" element={<ProtectedRoute><VisitLisit /></ProtectedRoute>} />
        <Route path="/admin-visit-details/:id" element={<ProtectedRoute><Visitdetails /></ProtectedRoute>} />
        <Route path="/admin-sales-list" element={<ProtectedRoute><AdminSalesList /></ProtectedRoute>} />
        <Route path="/admin-sales-details/:id" element={<ProtectedRoute><AdminSalesDetails /></ProtectedRoute>} />
        <Route path="/admin-payment-list" element={<ProtectedRoute><AdminPaymentList /></ProtectedRoute>} />

        <Route path="/verifications" element={<ProtectedRoute><MyVerifications /></ProtectedRoute>} />
        <Route path="/verification-details/:id" element={<ProtectedRoute><VerificationsDetail /></ProtectedRoute>} />
        <Route path="/verification-approve/:id" element={<ProtectedRoute><VerificationsUpdate /></ProtectedRoute>} />
        <Route path="/verification-message/:id" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
      </Route>

      <Route element={<UserLayout />}>
        <Route path="/add_visit" element={<ProtectedRoute><AddVisit /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><CustomerList /></ProtectedRoute>} />
        <Route path="/add-customers" element={<ProtectedRoute><AddCustomers /></ProtectedRoute>} />
        <Route path="/customers-details/:id" element={<ProtectedRoute><CustomerDetails /></ProtectedRoute>} />
        <Route path="/customers-update/:id/update" element={<ProtectedRoute><UpdateCustomers /></ProtectedRoute>} />

        <Route path="/add-visits" element={<ProtectedRoute><AddVisits /></ProtectedRoute>} />
        <Route path="/visit-lists" element={<ProtectedRoute><VisitList /></ProtectedRoute>} />
        <Route path="/visit-details/:id" element={<ProtectedRoute><VisitDetail /></ProtectedRoute>} />
        <Route path="/visit-update/:id/update" element={<ProtectedRoute><UpdateVisits /></ProtectedRoute>} />

        <Route path="/sales/:id" element={<ProtectedRoute><CreateSales /></ProtectedRoute>} />
        <Route path="/sale-list" element={<ProtectedRoute><SalesLists /></ProtectedRoute>} />
        <Route path="/sales-details/:id" element={<ProtectedRoute><SalesDetail /></ProtectedRoute>} />

        <Route path="/payments" element={<ProtectedRoute><Payments /></ProtectedRoute>} />
        <Route path="/payments/customer/:customer_id" element={<ProtectedRoute><PaymentDetail /></ProtectedRoute>} />

        <Route path="/submit-verification" element={<ProtectedRoute><SubmitVerifications /></ProtectedRoute>} />
        <Route path="/visit-verification-list" element={<ProtectedRoute><VisitVerificationLisit /></ProtectedRoute>} />
        <Route path="/verifications-details/:id" element={<ProtectedRoute><VerificationDetail /></ProtectedRoute>} />
        <Route path="/user-verification-message/:id" element={<ProtectedRoute><UserVerificationMessage /></ProtectedRoute>} />
      </Route>

    </Routes>
  )
}

export default AppRoutes
