export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
              KeamVisuals
            </h3>
            <p className="text-gray-400">
              2 years of design experience. Creating stunning visuals for content creators.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Twitch Packages</li>
              <li>YouTube Designs</li>
              <li>Custom Graphics</li>
              <li>Logo Design</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="/" className="hover:text-purple-400 transition-colors">Home</a></li>
              <li><a href="/work" className="hover:text-purple-400 transition-colors">Portfolio</a></li>
              <li><a href="/prices" className="hover:text-purple-400 transition-colors">Pricing</a></li>
              <li><a href="/dashboard" className="hover:text-purple-400 transition-colors">Dashboard</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li>California, USA</li>
              <li>support@keamvisuals.com</li>
              <li>Available 24/7</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 KeamVisuals. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}