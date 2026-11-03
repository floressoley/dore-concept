import { Navigate, Route, Routes } from 'react-router'
import { Layout } from './components/Layout.tsx'
import Components from './pages/Components.tsx'
import Foundations from './pages/Foundations.tsx'
import Home from './pages/Home.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/system" element={<Foundations />} />
      <Route path="/components" element={<Components />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
