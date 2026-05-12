import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-3 gap-10 mb-12">
          <div>
            <Image src="/logo.png" alt="YumiGo" width={120} height={48} className="object-contain mb-4 brightness-200" />
            <p className="font-body text-cream/60 text-sm leading-relaxed">
              Crafting joy one cake at a time. Premium custom bakery in the heart of Shimla.
            </p>
          </div>
          <div>
            <h4 className="font-display text-lg text-gold mb-4">Quick Links</h4>
            <ul className="space-y-2 font-body text-sm text-cream/60">
              {['Home', 'Our Cakes', 'Order Now', 'Visit Us'].map(l => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(' ', '-')}`} className="hover:text-gold transition-colors">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-display text-lg text-gold mb-4">Contact Us</h4>
            <ul className="space-y-2 font-body text-sm text-cream/60">
              <li>📞 +91 8278854238</li>
              <li>📧 hello@yumigo.in</li>
              <li>📍Dhonlu Devta Building, Rohru-Theog Highway, near New Apple Mandi, Mehendli, Himachal Pradesh 171207</li>
            </ul>
            <a
              href="https://wa.me/918278854238"
              className="mt-4 inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white text-sm font-bold px-5 py-2.5 rounded-full transition-colors"
            >
              💬 WhatsApp Us
            </a>
          </div>
        </div>

        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="font-body text-cream/40 text-xs">
            © {new Date().getFullYear()} YumiGo Bakery. All rights reserved.
          </p>
          <p className="font-body text-cream/40 text-xs">
            Made with 🧡 by Hitansh Sharma
          </p>
        </div>
      </div>
    </footer>
  )
}