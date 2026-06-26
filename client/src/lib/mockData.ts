
export interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  deposit?: number;
  location: {
    township: string;
    city: string;
    province: string;
    lat: number;
    lng: number;
  };
  type: 'Backyard Room' | 'Backyard Flat' | 'Flat / Apartment' | 'House Share' | 'Student Accommodation' | 'Entire Home' | 'Cottage';
  studentSubtype?: 'Single Room' | 'Sharing Room' | 'Bachelor Unit';
  features: {
    bathrooms: number;
    furnished: boolean;
    secure: boolean;
    parking: boolean;
    wifi: boolean;
    electricityIncluded: boolean;
  };
  images: string[];
  landlord: {
    name: string;
    verified: boolean;
    joinedDate: string;
    responseRate: string;
  };
  availabilityDate: string;
  isBoosted?: boolean;
  createdAt: string;
  safetyScore: number;
}

export const MOCK_TOWNSHIPS = [
  'Khayelitsha', 'Soweto', 'Umlazi', 'Tembisa', 'Langa', 'Gugulethu', 'Alexandra', 'KwaMashu', 'Mamelodi', 'Diepsloot', 'Delft'
];

export const MOCK_CATEGORIES = [
  'Backyard Room',
  'Backyard Flat',
  'Flat / Apartment',
  'House Share',
  'Student Accommodation',
  'Entire Home',
  'Cottage'
];

export const MOCK_LISTINGS: Listing[] = [
  {
    id: '1',
    title: 'Modern Backyard Flat in Khayelitsha',
    description: 'Newly renovated bachelor flat with own bathroom and kitchenette. Secure yard with parking. Close to transport and mall.',
    price: 2500,
    deposit: 2500,
    location: {
      township: 'Khayelitsha',
      city: 'Cape Town',
      province: 'Western Cape',
      lat: -34.03,
      lng: 18.67
    },
    type: 'Backyard Flat',
    features: {
      bathrooms: 1,
      furnished: false,
      secure: true,
      parking: true,
      wifi: true,
      electricityIncluded: false
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1502672260266-1c1c2b441552?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: {
      name: 'Thabo M.',
      verified: true,
      joinedDate: '2024-01-15',
      responseRate: '98%'
    },
    availabilityDate: '2024-03-01',
    isBoosted: true,
    createdAt: '2025-12-20',
    safetyScore: 95
  },
  {
    id: '2',
    title: 'Student Room Sharing - Near UJ Soweto',
    description: 'Affordable shared room for students. NSFAS accredited. Free WiFi and weekly cleaning included. Walking distance to campus.',
    price: 1800,
    location: {
      township: 'Soweto',
      city: 'Johannesburg',
      province: 'Gauteng',
      lat: -26.24,
      lng: 27.85
    },
    type: 'Student Accommodation',
    studentSubtype: 'Sharing Room',
    features: {
      bathrooms: 2,
      furnished: true,
      secure: true,
      parking: false,
      wifi: true,
      electricityIncluded: true
    },
    images: [
      'https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522771731478-4463fe5666f9?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: {
      name: 'Mama Zodwa',
      verified: true,
      joinedDate: '2023-11-20',
      responseRate: '100%'
    },
    availabilityDate: 'Immediate',
    createdAt: '2025-12-28',
    safetyScore: 98
  },
  {
    id: '3',
    title: 'Spacious Family Cottage',
    description: '2 Bedroom cottage in quiet street of Umlazi V section. Tiled floors, ceiling finishes, and secure gate.',
    price: 4500,
    deposit: 4500,
    location: {
      township: 'Umlazi',
      city: 'Durban',
      province: 'KZN',
      lat: -29.97,
      lng: 30.88
    },
    type: 'Cottage',
    features: {
      bathrooms: 1,
      furnished: false,
      secure: true,
      parking: true,
      wifi: false,
      electricityIncluded: false
    },
    images: [
      'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: {
      name: 'Sipho K.',
      verified: false,
      joinedDate: '2024-02-10',
      responseRate: '85%'
    },
    availabilityDate: '2024-04-01',
    createdAt: '2025-11-15',
    safetyScore: 65
  },
  {
    id: '6',
    title: 'Full 3-Bedroom Family House - Orlando West',
    description: 'Renovated family home in a safe area of Orlando West. Large yard, fully fenced with lockable gate. Near Vilakazi Street.',
    price: 7500,
    deposit: 7500,
    location: {
      township: 'Soweto',
      city: 'Johannesburg',
      province: 'Gauteng',
      lat: -26.23,
      lng: 27.91
    },
    type: 'Entire Home',
    features: {
      bathrooms: 2,
      furnished: false,
      secure: true,
      parking: true,
      wifi: false,
      electricityIncluded: false
    },
    images: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?auto=format&fit=crop&w=800&q=80'
    ],
    landlord: {
      name: 'Bheki Z.',
      verified: true,
      joinedDate: '2023-08-15',
      responseRate: '95%'
    },
    availabilityDate: '2024-04-01',
    isBoosted: true,
    createdAt: '2026-01-01',
    safetyScore: 92
  }
];

export interface POI {
  name: string;
  type: 'taxi_rank' | 'school' | 'train_station' | 'clinic' | 'mall' | 'gym';
  lat: number;
  lng: number;
}

export const MOCK_POIS: POI[] = [
  { name: 'Khayelitsha Taxi Rank', type: 'taxi_rank', lat: -34.032, lng: 18.675 },
  { name: 'Soweto Mall', type: 'mall', lat: -26.245, lng: 27.855 },
  { name: 'Umlazi Train Station', type: 'train_station', lat: -29.975, lng: 30.885 }
];

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  text: string;
  timestamp: string;
  read: boolean;
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  landlordId: string;
  landlordName: string;
  landlordAvatar?: string;
  renterId: string;
  renterName: string;
  renterAvatar?: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    listingId: '1',
    listingTitle: 'Modern Backyard Flat in Khayelitsha',
    landlordId: 'l1',
    landlordName: 'Thabo M.',
    renterId: 'user1',
    renterName: 'You',
    lastMessage: 'Yes, the deposit is required before moving in.',
    lastMessageTime: '10:30 AM',
    unreadCount: 1,
  },
  {
    id: 'c2',
    listingId: '2',
    listingTitle: 'Student Room Sharing - Near UJ Soweto',
    landlordId: 'l2',
    landlordName: 'Mama Zodwa',
    renterId: 'user1',
    renterName: 'You',
    lastMessage: 'Is the room still available?',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  }
];

export const MOCK_MESSAGES: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', conversationId: 'c1', senderId: 'user1', text: 'Hi Thabo, I am interested in the flat. Is the deposit negotiable?', timestamp: '09:15 AM', read: true },
    { id: 'm2', conversationId: 'c1', senderId: 'l1', text: 'Hello! Thank you for the interest.', timestamp: '10:28 AM', read: true },
    { id: 'm3', conversationId: 'c1', senderId: 'l1', text: 'Yes, the deposit is required before moving in.', timestamp: '10:30 AM', read: false },
  ],
  'c2': [
    { id: 'm4', conversationId: 'c2', senderId: 'user1', text: 'Hi Mama Zodwa', timestamp: 'Yesterday', read: true },
    { id: 'm5', conversationId: 'c2', senderId: 'user1', text: 'Is the room still available?', timestamp: 'Yesterday', read: true },
  ]
};

