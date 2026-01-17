import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from '@core/auth/ProtectedRoute'

// Auth
import Register from '../features/auth/pages/Register'
import Login from '../features/auth/pages/Login'
import UpdateProfile from '../features/auth/pages/UpdateProfile'
import Dashboard from '../features/auth/pages/Dashboard'
import Profile from '../features/auth/pages/UserProfile'

// Admin
import AdminChangePassword from '../features/admin/configuration/user/AdminChangePassword'
import AddUser from '../features/admin/configuration/user/AddUser'



// User

import CustomerList from '../features/agents/customer/CustomerList'
import AddCustomers from '../features/agents/customer/AddCustomers'
import CustomerDetails from '../features/agents/customer/CustomersDetails'

import AddVisits from '../features/agents/visit/AddVisits'
import VisitList from '../features/agents/visit/VisitLisit'
import VisitDetail from '../features/agents/visit/VisitDetails'
import UpdateVisits from '../features/agents/visit/UpdateVisits'
import CreateSales from '../features/agents/sale/CreateSales'
import SalesLists from '../features/agents/sale/SalesList'
import SalesDetail from '../features/agents/sale/SalesDetails'
import Payments from '../features/agents/payment/PaymentsList'
import PaymentDetail from '../features/agents/payment/PaymentDetails'
import SubmitVerifications from '../features/agents/visit/SubmitVerification'
import VisitVerificationLisit from '../features/agents/visit/VisitVerificationList'
import VerificationDetail from '../features/agents/visit/VerificationDetails'


import RootPage from '@features/auth/pages/RootPage'

import SettingLayout from '@features/settings/settingLayout'
import AuthLayout from '@features/auth/authLayout'
import AdminLayout from '@features/admin/adminLayout'
import AdminConfigurationLayout from '@features/admin/configuration/adminConfigurationLayout'
import AgentLayout from '@features/agents/agentLayout'

const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route path="/" element={<RootPage />} />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="/settings" element={<ProtectedRoute><SettingLayout /></ProtectedRoute>}>
        <Route path="/change-password" element={<AdminChangePassword />} />
      </Route>

      <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/configuration" element={<AdminConfigurationLayout />}>
          <Route path="users" element={<ProductList />}>
            <Route path="/" element={<UserList />} />

            <Route path="/register" element={<Register />} />
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/update" element={<UpdateProfile />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/:id/update" element={<UserUpdation />} />
            <Route path="/:id" element={<AdminUserDetail />} />
          </Route>
          <Route path="/companies" element={<ProductList />}>
          </Route>
          <Route path="/branches" element={<ProductList />}>
            <Route path="/" element={<BranchList />} />
          </Route>
          <Route path="products" element={<ProductList />}>
            <Route path="/" element={<ProductList />} />
          </Route>
        </Route>

        <Route path="/visits" >
          <Route path="/" element={<VisitLisit />} />
          <Route path="/:id" element={<Visitdetails />} />
          <Route path="/verifications" element={<MyVerifications />} />
          <Route path="/verification-details/:id" element={<VerificationsDetail />} />
          <Route path="/verification-approve/:id" element={<VerificationsUpdate />} />
          <Route path="/verification-message/:id" element={<Messages />} />
        </Route>

        <Route path="/sales" >
          <Route path="/" element={<AdminSalesList />} />
          <Route path="/:id" element={<AdminSalesDetails />} />
        </Route>

        <Route path="/payment" >
          <Route path="/" element={<AdminPaymentList />} />
        </Route>
      </Route>

      <Route path="/agent" element={<ProtectedRoute><AgentLayout /></ProtectedRoute>}>

        <Route path="/customers"  >
          <Route path="/" element={<CustomerList />} />
          <Route path="/new" element={<AddCustomers />} />
          <Route path="/:id" element={<CustomerDetails />} />
          <Route path="/:id/update" element={<UpdateCustomers />} />
        </Route>

        <Route path="/visit" >
          <Route path="/new" element={<AddVisits />} />
          <Route path="/" element={<VisitList />} />
          <Route path="/:id" element={<VisitDetail />} />
          <Route path="/:id/update" element={<UpdateVisits />} />
          <Route path="/verification">
            <Route path="/" element={<VisitVerificationLisit />} />
            <Route path="/submit" element={<SubmitVerifications />} />
            <Route path="/:id" element={<VerificationDetail />} />
            <Route path="/message/:id" element={<UserVerificationMessage />} />
          </Route>
        </Route>

        <Route path="/sales">
          <Route path="/new" element={<CreateSales />} />
          <Route path="/" element={<SalesLists />} />
          <Route path="/:id" element={<SalesDetail />} />
        </Route>

        <Route path="/payments">
          <Route path="/" element={<Payments />} />
          <Route path="/customer/:customer_id" element={<PaymentDetail />} />
        </Route>


      </Route>

    </Routes>
  )
}

export default AppRoutes
