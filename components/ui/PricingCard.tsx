'use client'

interface PricingPackage {
  name: string
  price: number
  features: string[]
}

interface PricingCardProps {
  package: PricingPackage
}

export default function PricingCard({ package: pkg }: PricingCardProps) {
  return (
    <div className="glow-card p-8 rounded-2xl text-center group hover:scale-105 transition-transform duration-300">
      <h3 className="text-2xl font-bold mb-4">{pkg.name}</h3>
      <div className="mb-6">
        <span className="text-4xl font-bold">${pkg.price}</span>
        <span className="text-gray-400">/project</span>
      </div>
      
      <ul className="mb-8 space-y-3">
        {pkg.features.map((feature, index) => (
          <li key={index} className="text-gray-300">✓ {feature}</li>
        ))}
      </ul>
      
      <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 font-semibold hover:opacity-90 transition-opacity">
        Select Package
      </button>
    </div>
  )
}