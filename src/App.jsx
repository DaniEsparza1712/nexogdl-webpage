import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import Projects from './pages/Projects'
import Calendar from './pages/Calendar'
import Project from './components/Project'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <BrowserRouter>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/proyectos' element={<Projects/>} />
          <Route path='/calendarios' element={<Calendar/>} />
          <Route path='/proyectos/:slug' element={<Project/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App
