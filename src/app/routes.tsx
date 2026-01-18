import { Routes, Route, Navigate } from 'react-router-dom'
import ProtectedRoute from '@core/auth/ProtectedRoute'


// User
import AddVisits from '../features/agents/visit/new/new'
import VisitList from '../features/agents/visit/home/home'
import VisitDetail from '../features/agents/visit/single/single'
import UpdateVisits from '../features/agents/visit/update/update'
import CreateSales from '../features/agents/sale/new/new'
import SalesLists from '../features/agents/sale/home/home'
import SalesDetail from '../features/agents/sale/single/single'
import Payments from '../features/agents/payment/home/home'
import PaymentDetail from '../features/agents/payment/single/single'
import SubmitVerifications from '../features/agents/visit/SubmitVerification'
import VisitVerificationLisit from '../features/agents/visit/VisitVerificationList'
import VerificationDetail from '../features/agents/visit/VerificationDetails'

import Login from '../features/auth/pages/Login'

import RootPage from '@features/auth/pages/RootPage'

import Profile from '@features/profile/Profile'

import { Layout as SettingLayout } from '@features/settings/layout'
import ChangePassword from '@features/settings/ChangePassword'

import AuthLayout from '@features/auth/authLayout'
import { Layout as AdminLayout } from '@features/admin/layout'

import { Layout as AdminConfigurationLayout } from '@features/admin/configuration/layout'

import { Layout as AdminConfigurationUserLayout } from '@features/admin/configuration/user/layout'
import { Home as AdminConfigurationUserHome } from '@features/admin/configuration/user/home/home'
import { Update as AdminConfigurationUserUpdate } from '@features/admin/configuration/user/update/update'
import { Create as AdminConfigurationUserCreate } from '@features/admin/configuration/user/create/create'
import { Single as  AdminConfigurationUserSingle } from '@features/admin/configuration/user/single/single'
import { UpdatePassword as UpdateUserPassword} from '@features/admin/configuration/user/update/AdminChangePassword'

import { Branch as AdminConfigurationBranch } from '@features/admin/configuration/branch/Branch'
import { Company as AdminConfigurationCompany } from '@features/admin/configuration/company/company'
import { Zone as AdminConfigurationZone } from '@features/admin/configuration/zone/zone'
import { Product as AdminConfigurationProducts } from '@features/admin/configuration/product/Products'

import { Layout as AdminVisitsLayout } from '@features/admin/visits/layout'
import { Home as AdminVisitsHome } from  '@features/admin/visits/home/home'
import { Single as AdminVisitSingle } from '@features/admin/visits/single/single'
import { Single as AdminVisitVerificationSingle } from '@features/admin/visits/single/verification/single'
import { Home as AdminVisitVerificationHome } from '@features/admin/visits/single/verification/home'
import { Update as AdminVisitVerificationUpdate } from '@features/admin/visits/single/verification/update'
import { Message as AdminVisitVerificationMessage } from '@features/admin/visits/single/verification/message'

import { Layout as AdminSalesLayout } from '@features/admin/sales/layout'
import { Home as AdminSalesHome } from '@features/admin/sales/home/home'
import { Single as AdminSalesSingle } from '@features/admin/sales/single/single'

import { Layout as AdminCustomerLayout } from '@features/admin/customer/layout'
import { Single as AdminCustomerSingle } from '@features/admin/customer/single/single'
import { New as AdminCustomerNew } from '@features/admin/customer/new/new'
import { Update as AdminCustomerUpdate } from '@features/admin/customer/update/update'
import { Home as AdminCustomerHome } from '@features/admin/customer/home/home'

import { Layout as AdminPaymentLayout } from '@features/admin/payment/layout'
import { Home as AdminPaymentHome } from '@features/admin/payment/home/home'
import UserVerificationMessage from '@features/agents/visit/UserVerificationmessage'

import { Layout as AgentLayout } from '@features/agents/layout'

import Dashboard from '@features/admin/dashboard/dashboard'
import { Layout as AgentVisitLayout } from '@features/agents/visit/layout'
import { Home as AgentVisitHome } from '@features/agents/visit/home/home'
import { New as AgentVisitNew } from '@features/agents/visit/new/new'
import { Update as AgentVisitUpdate } from '@features/agents/visit/update/update'
import { Single as AgentVisitSingle } from '@features/agents/visit/single/single'

import { Layout as AgentSaleLayout } from '@features/agents/sale/layout'
import { Home as AgentSaleHome } from '@features/agents/sale/home/home'
import { Single as AgentSaleSingle } from '@features/agents/sale/single/single'
import { New as AgentSaleNew } from '@features/agents/sale/new/new'

import { Layout as AgentPaymentLayout } from '@features/agents/payment/layout'
import { Single as AgentPaymentSingle } from '../features/agents/payment/single/single'
import { Home as AgentPaymentHome } from '../features/agents/payment/home/home'



const AppRoutes: React.FC = () => {
  return (
    <Routes>

      <Route index element={<RootPage />} />

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
      </Route>

      <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

      <Route path="settings" element={<ProtectedRoute><SettingLayout /></ProtectedRoute>}>
        <Route path="password" element={<ChangePassword />} />
      </Route>

      <Route path="admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
        <Route index element={<Dashboard />} />

        <Route path="configuration" element={<AdminConfigurationLayout />}>
          <Route index element={<Navigate to="users" replace />} />
          <Route path="users" element={<AdminConfigurationUserLayout />}>
            <Route index element={<AdminConfigurationUserHome />} />
            <Route path="new" element={<AdminConfigurationUserCreate />} />
            <Route path=":id" element={<AdminConfigurationUserSingle />} />
            <Route path=":id/update" element={<AdminConfigurationUserUpdate />} />
            <Route path=":id/change-password" element={ <UpdateUserPassword />} />
          </Route>
          <Route path="company" element={<AdminConfigurationCompany />}/>
          <Route path="zone" element={<AdminConfigurationZone />}/>
          <Route path="branch" element={<AdminConfigurationBranch />}/>
          <Route path="products" element={<AdminConfigurationProducts />}/>
        </Route>

        <Route path="visits" element={<AdminVisitsLayout />}>
          <Route index element={<AdminVisitsHome />} />
          <Route path=":id" element={<AdminVisitSingle />} />
          <Route path=":visitId/verification" element={<AdminVisitVerificationHome />} />
          <Route path=":visitId/verification/:id" element={<AdminVisitVerificationSingle />} />
          <Route path=":visitId/verification/:id/update" element={<AdminVisitVerificationUpdate />} />
          <Route path=":visitId/verification/:id/message" element={<AdminVisitVerificationMessage />} />
        </Route>

        <Route path="sales" element={<AdminSalesLayout />}>
          <Route index element={<AdminSalesHome/>} />
          <Route path=":id" element={<AdminSalesSingle />} />
        </Route>

        <Route path="payment" element={<AdminPaymentLayout />}>
          <Route index element={<AdminPaymentHome />} />
        </Route>

        <Route path="customers" element={<AdminCustomerLayout />}>
          <Route index element={<AdminCustomerHome />} />
          <Route path="new" element={<AdminCustomerNew />} />
          <Route path=":id" element={<AdminCustomerSingle />} />
          <Route path=":id/update" element={<AdminCustomerUpdate />} />
        </Route>
        
      </Route>

      <Route path="agent" element={<ProtectedRoute><AgentLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="visit" replace />} />
        <Route path="visit" element={<AgentVisitLayout />}>
          <Route index element={<AgentVisitHome />} />
          <Route path="new" element={<AgentVisitNew />} />
          <Route path=":id" element={<AgentVisitSingle />} />
          <Route path=":id/update" element={<AgentVisitUpdate />} />
          <Route path=":id/verification">
            <Route index element={<VisitVerificationLisit />} />
            <Route path="submit" element={<SubmitVerifications />} />
            <Route path=":id" element={<VerificationDetail />} />
            <Route path="message/:id" element={<UserVerificationMessage />} />
          </Route>
        </Route>

        <Route path="sale" element={<AgentSaleLayout />}>
          <Route index element={<AgentSaleHome />} />
          <Route path="new" element={<AgentSaleNew />} />
          <Route path=":id" element={<AgentSaleSingle />} />
        </Route>

        <Route path="payment" element={<AgentPaymentLayout />}>
          <Route index element={<AgentPaymentHome />} />
          <Route path="customer/:customer_id" element={<AgentPaymentSingle />} />
        </Route>

      </Route>

    </Routes>
  )
}

export default AppRoutes
