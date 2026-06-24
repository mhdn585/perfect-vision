import { ThemeProvider } from './context/ThemeContext'
import Header from './components/layout/Header'
import ProgressBar from './components/layout/ProgressBar'
import BackToTop from './components/layout/BackToTop'
import Footer from './components/layout/Footer'
import ToastContainer from './components/ui/ToastContainer'
import Hero from './components/sections/Hero'
import Servicios from './components/sections/Servicios'
import Acerca from './components/sections/Acerca'
import Testimonios from './components/sections/Testimonios'
import Contacto from './components/sections/contacto'
import './App.css'

function App() {
  return (
    <ThemeProvider>
      <ProgressBar />
      <Header />
      <main>
        <Hero />
        <Servicios />
        <Acerca />
        <Testimonios />
        <Contacto />
      </main>
      <BackToTop />
      <Footer />
      <ToastContainer />
    </ThemeProvider>
  )
}

export default App