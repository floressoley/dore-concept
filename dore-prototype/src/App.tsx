import { Route, Routes } from 'react-router'
import { Layout } from './components/Layout.tsx'
import Components from './pages/Components.tsx'
import Contact from './pages/Contact.tsx'
import Foundations from './pages/Foundations.tsx'
import About from './pages/About.tsx'
import Article from './pages/Article.tsx'
import Buy from './pages/Buy.tsx'
import Guides from './pages/Guides.tsx'
import Home from './pages/Home.tsx'
import { Privacy, Terms } from './pages/Legal.tsx'
import Listing from './pages/Listing.tsx'
import NotFound from './pages/NotFound.tsx'
import Sell from './pages/Sell.tsx'
import Services from './pages/Services.tsx'

export default function App() {
  return (
    <Routes>
      <Route path="/system" element={<Foundations />} />
      <Route path="/components" element={<Components />} />
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="buy" element={<Buy />} />
        <Route path="buy/:slug" element={<Listing />} />
        <Route path="contact" element={<Contact />} />
        <Route path="guides" element={<Guides />} />
        <Route path="guides/:slug" element={<Article />} />
        <Route path="journal/:slug" element={<Article />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="sell" element={<Sell />} />
        <Route path="services" element={<Services />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
