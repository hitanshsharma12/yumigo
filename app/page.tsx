import Header        from './components/Header'
import Hero          from './components/Hero'
import FeaturedCakes from './components/FeaturedCakes'
import OrderBuilder  from './components/OrderBuilder'
import Testimonials  from './components/Testimonials'
import VisitUs       from './components/VisitUs'
import Footer        from './components/Footer'
import Cart          from './components/Cart'

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Header />
      <Hero />
      <FeaturedCakes />
      <OrderBuilder />
      <Testimonials />
      <VisitUs />
      <Footer />
      <Cart />
    </main>
  )
}