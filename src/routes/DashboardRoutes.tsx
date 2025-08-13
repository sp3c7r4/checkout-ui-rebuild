import { Routes, Route } from 'react-router-dom'
import { DashboardOverview } from '@/pages/DashboardOverview'
import ProductsComponent from '@/components/product'
import OrdersComponent from '@/components/order'
import PaymentsComponent from '@/components/payment'
import CartsComponent from '@/components/cart'
import UsersComponent from '@/components/user'
import BusinessComponent from '@/components/business'
import QRComponent from '@/components/qr'
import SettingsPage from '@/components/settings'
import { useDashboard } from '@/contexts/AppContext'
import { useQuery } from '@tanstack/react-query'
import server from '@/server'

export function DashboardRoutes() {
  const { business } = useDashboard()
  // console.log(business, products, carts, orders, payments, users, isLoading, error )

  const {
    isPending: productIsPending,
    error: productError,
    data: products = [],
  } = useQuery({ queryKey: ["products"], queryFn: () => server.getProducts(business.id), enabled: !!business?.id });

  const {
    isPending: cartIsPending,
    error: cartError,
    data: carts = [],
  } = useQuery({ queryKey: ["carts"], queryFn: () => server.getUserCarts(business.id), enabled: !!business?.id });

  const {
    isPending: userIsPending,
    error: userError,
    data: users = [],
  } = useQuery({ queryKey: ["users"], queryFn: () => server.getUsers(business.id), enabled: !!business?.id });

  const {
    isPending: orderIsPending,
    error: orderError,
    data: orders = [],
  } = useQuery({ queryKey: ["orders"], queryFn: () => server.getOrders(business.id), enabled: !!business?.id });
  
  const {
    isPending: paymentIsPending,
    error: paymentError,
    data: payments = [],
  } = useQuery({ queryKey: ["payments"], queryFn: () => server.getPayments(business.id), enabled: !!business?.id }); 
  
  

  return (
    <Routes>
      <Route 
        index 
        element={
          <DashboardOverview 
            products={products} 
            carts={carts} 
            payments={payments} 
            orders={orders} 
            business={business} 
          />
        } 
      />
      <Route 
        path="products" 
        element={
          <ProductsComponent 
            business={business} 
            queryResult={{ 
              data: products,
              isPending: productIsPending,
              error: productError,
            }} 
          />
        } 
      />
      <Route 
        path="orders" 
        element={
          <OrdersComponent 
            business={business} 
            queryResult={{ 
              data: orders,
              isPending: orderIsPending,
              error: orderError,
             }} 
          />
        } 
      />
      <Route 
        path="payments" 
        element={
          <PaymentsComponent 
            business={business} 
            queryResult={{ 
              data: payments,
              isPending: paymentIsPending,
              error: paymentError,
             }} 
          />
        } 
      />
      <Route 
        path="carts" 
        element={
          <CartsComponent 
            business={business} 
            queryResult={{ 
              data: carts,
              isPending: cartIsPending,
              error: cartError,
             }} 
          />
        } 
      />
      <Route 
        path="users" 
        element={
          <UsersComponent 
            business={business} 
            queryResult={{ 
              data: users,
              isPending: userIsPending,
              error: userError 
            }} 
          />
        } 
      />
      <Route 
        path="business" 
        element={<BusinessComponent business={business} />} 
      />
      <Route 
        path="qr" 
        element={<QRComponent business={business} />} 
      />
      <Route 
        path="settings" 
        element={<SettingsPage business={business} />} 
      />
    </Routes>
  )
}
