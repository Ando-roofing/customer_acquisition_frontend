// src/App.jsx
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import ProtectedRoute from './components/ProtectedRoute';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import ChangePassword from "./pages/auth/ChangePassword";
import UpdateProfile from "./pages/auth/UpdateProfile";
import Dashboard from './pages/auth/Dashboard';
import ProductList from './pages/admin/ProductList';
import BranchList from './pages/admin/BranchesList';
import AdminChangePassword from './pages/admin/AdminChangePassword';
import Profile from './pages/auth/UserProfile';
import UserList from './pages/admin/UsersLists';
import AddUser from './pages/admin/AddUser';
import UserUpdation from './pages/admin/UserUpdate';
import AdminUserDetail from './pages/admin/UserDetail';
import AddVisit from './pages/users/AddVisit';
import CustomerList from './pages/users/CustomerList';
import AddCustomers from './pages/users/AddCustomers';
import CustomerDetails from './pages/users/CustomersDetails';
import UpdateCustomers from './pages/users/UpdateCustomer';
import AddVisits from './pages/users/AddVisits';
import VisitList from './pages/users/VisitLisit';
import VisitDetail from './pages/users/VisitDetails';
import UpdateVisits from './pages/users/UpdateVisits'; 
import CreateSales from './pages/users/CreateSales';
import SalesLists from './pages/users/SalesList';
import Payments from './pages/users/PaymentsList';
import PaymentDetail from './pages/users/PaymentDetails';
import SalesDetail from './pages/users/SalesDetails';
import VisitLisit from './pages/admin/AdminVisitList';
import Visitdetails from './pages/admin/AdminVisitDetails';
import AdminSalesList from './pages/admin/AdminSaleList';
import AdminSalesDetails from './pages/admin/AdminSales';
import AdminPaymentList from './pages/admin/AdminPaymentList';
import SubmitVerifications from './pages/users/SubmitVerification';
import VisitVerificationLisit from './pages/users/VisitVerificationList';
import VerificationDetail from './pages/users/VerificationDetails';
import MyVerifications from './pages/admin/Verifications';
import VerificationsDetail from './pages/admin/VerificationDetail';
import VerificationsUpdate from './pages/admin/VerificationsUpdate';
import Messages from './pages/admin/Message';
import UserVerificationMessage from './pages/users/UserMessage';







function App() {
  return (
    <BrowserRouter>
  <Routes>
    {/* Public route */}
    <Route path="/" element={<Login />} />

    {/* Protected routes */}
    <Route path="/register" element={
      <ProtectedRoute><Register /></ProtectedRoute>
    } />
    <Route path="/profile/change-password" element={
      <ProtectedRoute><ChangePassword /></ProtectedRoute>
    } />
    <Route path="/profile/update" element={
      <ProtectedRoute><UpdateProfile /></ProtectedRoute>
    } />
    <Route path="/dashboard" element={
      <ProtectedRoute><Dashboard /></ProtectedRoute>
    } />
    <Route path="/products" element={
      <ProtectedRoute><ProductList /></ProtectedRoute>
    } />
    <Route path="/branches" element={
      <ProtectedRoute><BranchList /></ProtectedRoute>
    } />
    <Route path="/admin-change-password" element={
      <ProtectedRoute><AdminChangePassword /></ProtectedRoute>
    } />
    <Route path="/profile" element={
      <ProtectedRoute><Profile /></ProtectedRoute>
    } />
    <Route path="/users" element={
      <ProtectedRoute><UserList /></ProtectedRoute>
    } />
    <Route path="/add-user" element={
      <ProtectedRoute><AddUser /></ProtectedRoute>
    } />
    <Route path="/users-update/:id/update" element={
      <ProtectedRoute><UserUpdation /></ProtectedRoute>
    } />
    <Route path="/users-details/:id" element={
      <ProtectedRoute><AdminUserDetail /></ProtectedRoute>
    } />

    <Route path="/add_visit" element={
      <ProtectedRoute><AddVisit /></ProtectedRoute>
    } />
    <Route path="/customers" element={
      <ProtectedRoute><CustomerList /></ProtectedRoute>
    } />

     <Route path="/add-customers" element={
      <ProtectedRoute><AddCustomers /></ProtectedRoute>
    } />
    <Route path="/customers-details/:id" element={
      <ProtectedRoute><CustomerDetails /></ProtectedRoute>
    } />
    <Route path="/customers-update/:id/update" element={
      <ProtectedRoute><UpdateCustomers /></ProtectedRoute>
    } />

    <Route path="/add-visits" element={
      <ProtectedRoute><AddVisits /></ProtectedRoute>
    } />
     <Route path="/visit-lists" element={
      <ProtectedRoute><VisitList /></ProtectedRoute>
    } />

    <Route path="/visit-details/:id" element={
      <ProtectedRoute><VisitDetail /></ProtectedRoute>
    } />

    <Route path="/verifications-details/:id" element={
      <ProtectedRoute><VerificationDetail /></ProtectedRoute>
    } />

    <Route path="/verification-details/:id" element={
      <ProtectedRoute><VerificationsDetail /></ProtectedRoute>
    } />


    <Route path="/verification-approve/:id" element={
      <ProtectedRoute><VerificationsUpdate /></ProtectedRoute>
    } />

    <Route path="/verification-message/:id" element={
      <ProtectedRoute><Messages /></ProtectedRoute>
    } />


    <Route path="/user-verification-message/:id" element={
      <ProtectedRoute><UserVerificationMessage/></ProtectedRoute>
    } />


    <Route path="/admin-visit-details/:id" element={
      <ProtectedRoute><Visitdetails  /></ProtectedRoute>
    } />
     <Route path="/visit-update/:id/update" element={
      <ProtectedRoute><UpdateVisits /></ProtectedRoute>
    } />
     <Route path="/sales/:id/" element={
      <ProtectedRoute><CreateSales /></ProtectedRoute>
    } />

    <Route path="/admin-sales-details/:id" element={
      <ProtectedRoute><AdminSalesDetails /></ProtectedRoute>
    } />

    <Route path="/sale-list" element={
      <ProtectedRoute><SalesLists /></ProtectedRoute>
    } />

    <Route path="/admin-sales-list" element={
      <ProtectedRoute><AdminSalesList /></ProtectedRoute>
    } />

    <Route path="/payments" element={
      <ProtectedRoute><Payments/></ProtectedRoute>
    } />
    <Route path="/verifications" element={
      <ProtectedRoute><MyVerifications/></ProtectedRoute>
    } />
    <Route
          path="/payments/customer/:customer_id"
          element={<PaymentDetail />}
        />
        <Route
          path="/admin-visit-list"
          element={<VisitLisit />}
        />
       
        <Route
          path="/admin-payment-list/"
          element={<AdminPaymentList />}
        />
        <Route path="/submit-verification" element={<SubmitVerifications />} />

        <Route path="/visit-verification-list" element={<VisitVerificationLisit />} />

        <Route path="/sales-details/:id" element={<SalesDetail />} />
      
  </Routes>
</BrowserRouter>

  );
}

export default App;
