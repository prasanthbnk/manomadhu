export const BUSINESS = {
  name: 'Mano Madhu Tours and Travels',
  tagline: 'Across town or across South India, on your schedule.',
  address: 'NSR Road, Saibaba Colony, Coimbatore – 641025',
  phone: '9894665251',
  phoneDisplay: '98946 65251',
  whatsapp: '919566653414',
  whatsappDisplay: '95666 53414',
  googleMapsEmbed: 'https://www.google.com/maps?q=Saibaba+Colony+NSR+Road+Coimbatore&output=embed',
  googleMapsLink: 'https://www.google.com/maps?q=Saibaba+Colony+NSR+Road+Coimbatore',
  // Opens straight to the reviews tab of the Google Business listing (used by "See all reviews").
  googleReviewsLink: 'https://www.google.com/maps/place/Mano+Madhu+Tours+and+Travels/@11.0254367,76.9322223,20z/data=!4m8!3m7!1s0x3ba859fadb8b4073:0xbd4ce7136a032bcc!8m2!3d11.0229649!4d76.9378829!9m1!1b1!16s%2Fg%2F11w9j5ntsr!5m1!1e4?entry=ttu&g_ep=EgoyMDI2MDkyMC4wIKXMDSoASAFQAw%3D%3D',
  // Fill these two in to make the homepage Reviews section pull LIVE ratings/reviews
  // straight from Google instead of the curated fallback list below.
  // See reviews.component.ts for the full setup steps.
  //   1. googlePlaceId  — https://developers.google.com/maps/documentation/places/web-service/place-id
  //   2. googleMapsApiKey — a Maps JavaScript API key from console.cloud.google.com,
  //      with "Maps JavaScript API" + "Places API" enabled and HTTP-referrer restricted
  //      to this site's domain.
  googlePlaceId: '',
  googleMapsApiKey: '',
  reviewCount: '28',
  experience: '4+',
  customers: '200+',
  rating: '5.0',
  discount: '5%'
};

// Real reviews from the business's Google Maps listing (manually pulled — Google's
// review widget blocks automated scraping beyond a handful of entries). Shown until
// BUSINESS.googlePlaceId + a Maps API key are configured for the live widget.
// Source: https://www.google.com/maps/place/Mano+Madhu+Tours+and+Travels — 5.0★, 28 reviews.
export const REVIEWS = [
  {
    name: 'Dr.Latha Natarajan',
    initial: 'D',
    rating: 5,
    time: '5 months ago',
    text: 'The persons who took us around during the trip were kind and obliging. We were very happy with their services.'
  },
  {
    name: 'THAVACEKA G',
    initial: 'T',
    rating: 5,
    time: '9 months ago',
    text: 'Excellent service and smooth travel experience.'
  },
  {
    name: 'Madhura Sangeeth Gopal',
    initial: 'M',
    rating: 5,
    time: '11 months ago',
    text: 'It was wonderful and safe journey with Madhu anna. And also the fare is budget friendly and sensible. No extra charges.'
  },
  {
    name: 'Rana Brij',
    initial: 'R',
    rating: 5,
    time: '2 months ago',
    text: 'Awesome trip with Madhu Travels. Will like to meet and have experience again.'
  },
  {
    name: 'mohandoss krishnan',
    initial: 'M',
    rating: 5,
    time: '1 year ago',
    text: 'Very polite and guiding to see new sight seeing.'
  }
];

export const VEHICLES = [
  {
    seats: 4,
    label: 'Sedan & Hatchback',
    models: 'Swift · Celerio',
    desc: 'Ideal for airport drops, city rides and small family trips.',
    icon: 'sedan'
  },
  {
    seats: 7,
    label: 'SUV & MPV',
    models: 'Ertiga · Innova · Crysta',
    desc: 'Roomy comfort for families and long outstation drives.',
    icon: 'suv'
  },
  {
    seats: 14,
    label: 'Tempo Traveller',
    models: 'Tempo Traveller · Urbania',
    desc: 'Group tours, pilgrimages and team outings in comfort.',
    icon: 'tempo'
  },
  {
    seats: '26 to 56',
    label: 'Mini Bus',
    models: 'Standard Bus',
    desc: 'Weddings, college tours and large group events.',
    icon: 'bus'
  }
];

export const TARIFF = [
  {
    vehicle: 'Sedan / 4-Seater',
    models: 'Swift, Celerio',
    local: '₹27/km',
    hourly: '₹309/hr (10 km/hr)',
    outstation: '₹15/km + ₹500'
  },
  {
    vehicle: 'Ertiga',
    models: '7-Seater',
    local: '₹36/km + parking',
    hourly: '₹450/hr',
    outstation: '₹19/km + toll + ₹500',
    outstationNote: ''
  },
  {
    vehicle: 'Innova / Crysta',
    models: '7-Seater',
    local: '₹38/km + parking',
    hourly: '₹550/hr',
    outstation: '₹21/km + toll + ₹500',
    outstationNote: ''
  },
  {
    vehicle: 'Tempo Traveller',
    models: '14-Seater',
    local: 'On request',
    hourly: 'On request',
    outstation: 'On request',
    outstationNote: ''
  },
  {
    vehicle: 'Mini Bus',
    models: '26 to 56-Seater',
    local: 'On request',
    hourly: 'On request',
    outstation: 'On request',
    outstationNote: ''
  }
];

// Point-to-point rates mirrored directly from TARIFF above, used to auto-estimate a fare
// from a computed distance. A trip of LONG_TRIP_THRESHOLD_KM or less is billed at the local
// (one-way) rate; anything beyond that is billed as outstation — "up & down" (return leg
// included), matching the Sedan row's outstationNote — plus a flat long-distance surcharge.
// A *PerKm of null means that rate is on-request and no numeric estimate is shown.
export const LONG_TRIP_SURCHARGE = 500;
export const LONG_TRIP_THRESHOLD_KM = 40;

export const FARE_RATES = [
  { vehicle: '4-Seater (Sedan)', localPerKm: 27, localExtra: '', outstationPerKm: 15, outstationExtra: '' },
  { vehicle: '7-Seater (Ertiga)', localPerKm: 36, localExtra: 'Parking extra', outstationPerKm: 19, outstationExtra: 'Toll extra' },
  { vehicle: '7-Seater (Innova / Crysta)', localPerKm: 38, localExtra: 'Parking extra', outstationPerKm: 21, outstationExtra: 'Toll extra' },
  { vehicle: '14-Seater (Tempo Traveller)', localPerKm: null, localExtra: '', outstationPerKm: null, outstationExtra: '' },
  { vehicle: '26 to 56-Seater (Mini Bus)', localPerKm: null, localExtra: '', outstationPerKm: null, outstationExtra: '' }
];

export const PACKAGES = [
  {
    id: 1,
    category: 'Coimbatore Darshan',
    title: 'Isha, Marudhamalai & Perur',
    price: 2699,
    route: ['Isha Adiyogi', 'Marudhamalai', 'Perur Patteeswarar'],
    desc: 'A scenic spiritual circuit covering the most iconic temples and shrines of Coimbatore.',
    highlight: 'Popular'
  },
  {
    id: 2,
    category: 'Pollachi & Aliyar',
    title: 'Waterfalls & Temples Circuit',
    price: 3299,
    route: ['Eachanari', 'Masani Amman', 'Aliyar Dam', 'Monkey Falls'],
    desc: 'Head south on the Pollachi road — temples, a serene dam and a ghat waterfall.',
    highlight: ''
  },
  {
    id: 3,
    category: 'Pilgrimage',
    title: 'Palani Murugan Temple',
    price: 4199,
    route: ['Coimbatore', 'Palani'],
    desc: 'Day trip to the hilltop shrine of Lord Murugan at Palani. Toll, parking extra.',
    highlight: 'Budget pick'
  },
  {
    id: 4,
    category: 'Kerala Day Trip',
    title: 'Thrissur Zoo & Snehatheeram Beach',
    price: 3299,
    route: ['Thrissur Zoo', 'Snehatheeram Beach'],
    desc: 'Cross into Kerala for a zoo visit followed by a relaxed evening at the beach.',
    highlight: ''
  },
  {
    id: 5,
    category: 'Temple Tour',
    title: 'Madurai Meenakshi',
    price: 6299,
    route: ['Coimbatore', 'Meenakshi Amman Temple'],
    desc: 'A full-day drive to the magnificent Meenakshi Amman Temple in Madurai.',
    highlight: ''
  },
  {
    id: 6,
    category: 'Temple Tour',
    title: 'Srirangam & Samayapuram',
    price: 6699,
    route: ['Srirangam', 'Samayapuram Mariamman'],
    desc: 'Visit the world\'s largest functioning Hindu temple and Samayapuram Mariamman near Trichy.',
    highlight: ''
  }
];

export const DESTINATIONS = [
  { name: 'Ooty', type: 'hill', km: '~90 km' },
  { name: 'Kodaikanal', type: 'hill', km: '~175 km' },
  { name: 'Munnar', type: 'hill', km: '~150 km' },
  { name: 'Valparai', type: 'hill', km: '~100 km' },
  { name: 'Siruvani Waterfalls', type: 'nature', km: '~35 km' },
  { name: 'Pollachi', type: 'local', km: '~40 km' },
  { name: 'Tiruppur', type: 'local', km: '~55 km' },
  { name: 'Mettupalayam', type: 'local', km: '~45 km' },
  { name: 'Anaikatti', type: 'local', km: '~25 km' },
  { name: 'Palakkad', type: 'interstate', km: '~100 km' },
  { name: 'Palani', type: 'temple', km: '~110 km' },
  { name: 'Madurai', type: 'temple', km: '~215 km' },
  { name: 'Thrissur', type: 'interstate', km: '~155 km' },
  { name: 'Srirangam', type: 'temple', km: '~205 km' }
];

export const SERVICES = [
  {
    icon: 'plane',
    title: 'Airport Pickup & Drop',
    desc: 'On-time transfers to and from Coimbatore Airport, any hour of the day or night.'
  },
  {
    icon: 'graduation',
    title: 'College IV & Tours',
    desc: 'Industrial visits and educational tours with spacious vehicles and safe, experienced drivers.'
  },
  {
    icon: 'heart',
    title: 'Marriage & Events',
    desc: 'Fleet arrangements for weddings, receptions and family functions of any size.'
  },
  {
    icon: 'briefcase',
    title: 'Business Trips',
    desc: 'Reliable corporate travel and staff transport billed cleanly with transparent rates.'
  },
  {
    icon: 'calendar',
    title: 'Monthly Packages',
    desc: 'Fixed monthly plans for daily commutes and regular school or office runs.'
  },
  {
    icon: 'clock',
    title: 'Local Hourly Hire',
    desc: 'Book by the hour for shopping, hospital visits, errands and city sightseeing.'
  },
  {
    icon: 'map-pin',
    title: 'Local Pickup & Drop',
    desc: 'Quick point-to-point city rides at clear per-km rates, no surge pricing.'
  },
  {
    icon: 'users',
    title: 'Group Tours',
    desc: 'Customised itineraries for large groups — pilgrimages, family reunions, office outings.'
  }
];
