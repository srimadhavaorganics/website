
// Initial data source - This acts as the default database for the downloaded website.
// Reordered: G1, G2, G3, then F1, F2, F3, S2.

export const initialProperties = [
  {
    id: 'G1',
    title: 'Ground Floor Unit G1',
    bhk: '1BHK',
    floor: 'Ground Floor',
    floorNumber: 0,
    rent: 19000,
    deposit: 190000,
    maintenance: 2000,
    area: 646.91,
    carpetArea: 481.44,
    bathrooms: 1,
    status: 'Available',
    availableFrom: '2025-12-15',
    displayOrder: 1,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/5ea36751a97286d1c9a3f36ce66bad7b.jpg',
    virtualTour: {
      rooms: [
        {
          id: 'bathroom',
          name: 'Bathroom',
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/70587a1866814cc7533fc2d7ae8dadd0.jpg',
          description: 'Clean bathroom with modern sanitary fittings, geyser provision, and anti-skid tiles.'
        },
        {
          id: 'utility',
          name: 'Utility Room',
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/ffd895d0af0490af2936581acc6200c8.jpg',
          description: 'Spacious utility area with separate washing stone and washing machine point.'
        },
        {
          id: 'kitchen',
          name: 'Kitchen',
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/e5d8a85eb060fab5a618ee5f787652ac.jpg',
          description: 'L-shaped modular kitchen with granite platform, stainless steel sink, and ample storage cabinets.'
        },
        {
          id: 'living-1',
          name: 'Living Room',
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/5ea36751a97286d1c9a3f36ce66bad7b.jpg',
          description: 'Bright and airy living hall featuring large windows for natural light and cross ventilation.'
        },
        {
          id: 'living-2',
          name: 'Living Room View 2',
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/a4463ae04d0f8282d890f0b22f493d4a.jpg',
          description: 'Spacious layout allowing for flexible furniture arrangements and dining space.'
        },
        {
          id: 'bedroom',
          name: 'Bedroom',
          image: 'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/1e1c9a931207f35a94cca1031e4575cd.jpg',
          description: 'Cozy master bedroom with built-in wardrobe space and large window.'
        }
      ]
    },
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Bike Parking', 'Utility Area'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'East',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Bike',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/5ea36751a97286d1c9a3f36ce66bad7b.jpg',
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/e5d8a85eb060fab5a618ee5f787652ac.jpg',
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/1e1c9a931207f35a94cca1031e4575cd.jpg',
      'https://horizons-cdn.hostinger.com/c7893375-0cf3-4f10-8d29-acc57933d7b2/70587a1866814cc7533fc2d7ae8dadd0.jpg'
    ],
    roomAreas: [
      { room: 'Hall', area: 234.61 },
      { room: 'Kitchen', area: 34.50 },
      { room: 'Kitchen Cabinet', area: 26.83 },
      { room: 'Utility', area: 36.00 },
      { room: 'Bedroom 1', area: 114.26 },
      { room: 'Bathroom 1', area: 35.23 }
    ]
  },
  {
    id: 'F1',
    title: 'First Floor Unit F1',
    bhk: '2BHK',
    floor: 'First Floor',
    floorNumber: 0,
    rent: 20000,
    deposit: 20000,
    maintenance: 3000,
    area: 1012.07,
    carpetArea: 813.40,
    bathrooms: 2,
    status: 'Occupied',
    availableFrom: '2026-03-01',
    displayOrder: 2,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Car Parking', 'Balcony'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'North',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Car',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
      'https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&q=80',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 321.56 },
      { room: 'Balcony', area: 43.75 },
      { room: 'Kitchen', area: 55.64 },
      { room: 'Kitchen Cabinet', area: 23.67 },
      { room: 'Utility', area: 35.00 },
      { room: 'Master Bedroom', area: 142.50 },
      { room: 'Master Bathroom', area: 40.00 },
      { room: 'Bedroom 2', area: 97.50 },
      { room: 'Bedroom 2 Wardrobe', area: 7.50 },
      { room: 'Bathroom 2', area: 36.94 },
      { room: 'Bathroom 2 Extension', area: 9.33 }
    ]
  },
  {
    id: 'S1',
    title: 'Second Floor Unit S1',
    bhk: '2BHK',
    floor: 'Second Floor',
    floorNumber: 2,
    rent: 20000,
    deposit: 20000,
    maintenance: 3000,
    area: 1067.86,
    carpetArea: 864.12,
    bathrooms: 2,
    status: 'Maintenance',
    availableFrom: '2025-12-18',
    displayOrder: 7,
    furnishingNote: "Owner can make fully furnished based on tenant requirement.",
    virtualTourImage: 'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
    virtualTour: null,
    amenities: ['Semi-Furnished', 'Non-veg allowed', 'Pets not allowed', 'No power backup in building', 'Bike Parking', 'Terrace Access'],
    features: {
      furnishing: 'Semi-Furnished',
      facing: 'East',
      waterSupply: 'Kaveri water + bore well + corporation water',
      parking: 'Bike',
      petAllowed: 'No',
      nonVegAllowed: 'Yes',
      security: 'No',
      floorCount: 3
    },
    images: [
      'https://images.unsplash.com/photo-1515263487990-61b07816b324?w=800&q=80',
      'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=800&q=80',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80'
    ],
    roomAreas: [
      { room: 'Hall', area: 321.56 },
      { room: 'Balcony', area: 43.75 },
      { room: 'Kitchen', area: 55.64 },
      { room: 'Kitchen Cabinet', area: 23.67 },
      { room: 'Utility', area: 35.00 },
      { room: 'Master Bedroom', area: 142.50 },
      { room: 'Master Bathroom', area: 40.00 },
      { room: 'Bedroom 2', area: 128.33 },
      { room: 'Bedroom 2 Wardrobe', area: 10.00 },
      { room: 'Bathroom 2', area: 42.29 },
      { room: 'Bathroom 2 Extension', area: 21.38 }
    ]
  }
];

export const getProperties = () => {
  const stored = localStorage.getItem('properties');
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    } catch (e) {
      console.error("Error parsing stored properties", e);
    }
  }
  return initialProperties;
};

export const saveProperties = (properties) => {
  localStorage.setItem('properties', JSON.stringify(properties));
  window.dispatchEvent(new Event('storage'));
};
