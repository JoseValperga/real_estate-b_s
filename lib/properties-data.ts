export const properties = [
  {
    id: 1,
    title: "Luxury Apartment in Downtown",
    location: "New York City, NY",
    price: 250000,
    roi: 8.5,
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80"
  },
  {
    id: 2,
    title: "Beachfront Villa",
    location: "Miami, FL",
    price: 500000,
    roi: 7.2,
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "Modern Office Building",
    location: "San Francisco, CA",
    price: 750000,
    roi: 9.1,
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
  },
]

export type Property = {
  id: number
  title: string
  location: string
  price: number
  roi: number
  image: string
} 