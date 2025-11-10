'use client'

import { useState } from 'react'

interface WorkItem {
  id: number
  title: string
  image: string
  category: string
}

interface WorkGalleryProps {
  items: WorkItem[]
}

export default function WorkGallery({ items }: WorkGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState('All')

  const categories = ['All', ...new Set(items.map(item => item.category))]

  const filteredItems = selectedCategory === 'All' 
    ? items 
    : items.filter(item => item.category === selectedCategory)

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 justify-center mb-8">
        {categories.map(category => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-6 py-2 rounded-full border transition-all ${
              selectedCategory === category
                ? 'bg-purple-500 border-purple-500 text-white'
                : 'border-white/20 text-gray-300 hover:border-purple-400'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Work Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map(item => (
          <div
            key={item.id}
            className="glow-card p-6 rounded-2xl group cursor-pointer transform hover:scale-105 transition-all duration-300"
          >
            <div className="aspect-video bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg mb-4 flex items-center justify-center">
              <span className="text-gray-400">Image</span>
            </div>
            <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm">{item.category}</p>
          </div>
        ))}
      </div>
    </div>
  )
}