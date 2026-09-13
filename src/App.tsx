import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Programs from './pages/Programs'
import GetInvolved from './pages/GetInvolved'
import Donations from './pages/Donations'
import Contact from './pages/Contact'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/donate" element={<Donations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Home />} />
      </Route>
    </Routes>
  )
}