import { Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/Layout.tsx'
import Components from './pages/Components.tsx'
import Contact from './pages/Contact.tsx'
import Foundations from './pages/Foundations.tsx'
import Buy from './pages/Buy.tsx'
import Guides from './pages/Guides.tsx'
import Home from './pages/Home.tsx'
import Sell from './pages/Sell.tsx'
import Services from './pages/Services.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/system" element={<Foundations />} />
      <Route path="/components" element={<Components />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="buy" element={<Buy />} />
        <Route path="contact" element={<Contact />} />
        <Route path="guides" element={<Guides />} />
        <Route path="sell" element={<Sell />} />
        <Route path="services" element={<Services />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
