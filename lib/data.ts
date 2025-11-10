// SHARED DATA - UPDATE ONCE, USED EVERYWHERE
export const workItems = [
  { 
    id: 1, 
    title: 'Discord Packages', 
    description: 'This Include Discord PFP, Discord Banner, Discord Invite Banner, Watermark.', 
    images: [
      'https://i.imgur.com/GzpLatj.jpeg',
      '/images/twitch2.jpg', 
      '/images/twitch3.jpg'
    ],
    size: '1920x1080'
  },
  { 
    id: 2, 
    title: 'FiveM Packages', 
    description: 'This Include FiveM Connecting Banner, FiveM Icon, And everthing in the Discord Package.', 
    images: [
      '/images/yt1.jpg',
      '/images/yt2.jpg',
      '/images/yt3.jpg'
    ],
    size: '2560x1440' 
  },
  { 
    id: 3, 
    title: 'Abstract Packages', 
    description: 'You get Everthing you get in a Discord Package.', 
    images: [
      '/images/discord1.jpg',
      '/images/discord2.jpg',
      '/images/discord3.jpg',
      '/images/discord4.jpg',
      '/images/discord5.jpg'
    ],
    size: '1920x1080'
  },
]

export const categories = ['ALL']

// Get featured items for homepage (first 3)
export const featuredWork = workItems.slice(0, 3)