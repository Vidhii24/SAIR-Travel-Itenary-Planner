// Curated Knowledge Base for Destinations across India
// Used for transparent, explainable recommendations and rule-based fallback

export const DESTINATIONS = [
  {
    id: 'udaipur',
    name: 'Udaipur',
    state: 'Rajasthan',
    region: 'North-West',
    tagline: 'The City of Lakes & Royal Palaces',
    description: 'Renowned for its lavish royal residences, serene lakes, marble palaces, and rich Mewar history.',
    image: '/images/udaipur.jpg',
    suitableInterests: ['Historical Monuments', 'Culture and Heritage', 'Local Food', 'Photography', 'Relaxation'],
    suitableStyles: ['Relaxed', 'Balanced'],
    typicalDurationDays: 3,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2400,
    highlights: ['City Palace', 'Lake Pichola Boat Ride', 'Saheliyon-ki-Bari', 'Bagore Ki Haveli Folk Dance', 'Jag Mandir'],
    attractions: [
      {
        id: 'udaipur-city-palace',
        name: 'City Palace Complex & Museum',
        category: 'Historical Monuments',
        typicalDuration: '3 Hours',
        avgCost: 350,
        description: 'Vast palace complex overlooking Lake Pichola displaying Mewar royal artifacts, intricate mirror work, and courtyards.',
        bestTimeOfDay: 'Morning',
        tags: ['Heritage', 'Architecture', 'Culture']
      },
      {
        id: 'udaipur-boat-ride',
        name: 'Lake Pichola Sunset Boat Cruise',
        category: 'Relaxation',
        typicalDuration: '1.5 Hours',
        avgCost: 500,
        description: 'Scenic cruise past Jag Mandir Island and the floating Lake Palace with sweeping Aravalli mountain views at twilight.',
        bestTimeOfDay: 'Evening',
        tags: ['Scenic', 'Lakes', 'Sunset']
      },
      {
        id: 'udaipur-bagore-haveli',
        name: 'Dharohar Folk Dance at Bagore Ki Haveli',
        category: 'Culture and Heritage',
        typicalDuration: '1.5 Hours',
        avgCost: 150,
        description: 'Captivating cultural performance featuring traditional Rajasthani Rajasthani Chari dance, puppet shows, and folk music.',
        bestTimeOfDay: 'Evening',
        tags: ['Folk Dance', 'Cultural Night', 'Live Show']
      },
      {
        id: 'udaipur-saheliyon-bari',
        name: 'Saheliyon-ki-Bari (Courtyard of the Maidens)',
        category: 'Nature and Mountains',
        typicalDuration: '1.5 Hours',
        avgCost: 50,
        description: 'Historic ornamental garden featuring marble elephant fountains, lotus pools, and lush bougainvillea lanes.',
        bestTimeOfDay: 'Morning',
        tags: ['Gardens', 'Relaxation', 'Heritage']
      },
      {
        id: 'udaipur-sajjangarh',
        name: 'Monsoon Palace (Sajjangarh Fort)',
        category: 'Photography',
        typicalDuration: '2 Hours',
        avgCost: 160,
        description: 'Hilltop fort palace offering 360-degree panoramic sunset vistas across lakes and Udaipur city skyline.',
        bestTimeOfDay: 'Evening',
        tags: ['Sunset', 'Viewpoint', 'Photography']
      },
      {
        id: 'udaipur-jagdish-temple',
        name: 'Jagdish Temple & Old City Heritage Walk',
        category: 'Spiritual Places',
        typicalDuration: '2 Hours',
        avgCost: 0,
        description: '17th-century Indo-Aryan carved stone temple followed by an atmospheric walking exploration through cobblestone spice markets.',
        bestTimeOfDay: 'Morning',
        tags: ['Temple', 'Heritage Walk', 'Markets']
      },
      {
        id: 'udaipur-karni-mata-ropeway',
        name: 'Mansapurna Karni Mata Ropeway',
        category: 'Adventure',
        typicalDuration: '1 Hour',
        avgCost: 120,
        description: 'Cable car ride ascending Machhla Magra hill with aerial views of Lake Pichola and Fateh Sagar.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Cable Car', 'Scenic Views']
      },
      {
        id: 'udaipur-hathi-pol',
        name: 'Hathi Pol Bazaar Shopping & Miniature Art',
        category: 'Shopping',
        typicalDuration: '2 Hours',
        avgCost: 0,
        description: 'Renowned vibrant market for traditional Pichwai paintings, Bandhani sarees, leather journals, and camel bone craft.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Art', 'Shopping', 'Bazaar']
      }
    ],
    foodHighlights: [
      { name: 'Dal Baati Churma Feast at Krishna Dal Baati', type: 'Traditional Lunch', estimatedCost: 300 },
      { name: 'Kachori & Masala Chai at Jagdish Chowk', type: 'Street Breakfast', estimatedCost: 80 },
      { name: 'Lakeside Rooftop Dining with Mewari Gatte ki Sabzi', type: 'Romantic / Group Dinner', estimatedCost: 550 },
      { name: 'Kulhad Rabri & Kulfi at Sukhadia Circle', type: 'Late Evening Dessert', estimatedCost: 100 }
    ],
    travelTips: [
      'Best visited between October and March for pleasant, cool weather.',
      'Auto-rickshaws and two-wheelers are ideal for navigating the narrow Old City alleys.',
      'Book City Palace audio guide early to avoid queues.',
      'Sunset boat rides fill up quickly; arrive at Rameshwar Ghat by 4:30 PM.'
    ]
  },
  {
    id: 'jaipur',
    name: 'Jaipur',
    state: 'Rajasthan',
    region: 'North-West',
    tagline: 'The Pink City of Royal Fortresses',
    description: 'Capital of Rajasthan featuring UNESCO World Heritage hill forts, astronomical observatories, and vibrant spice and gemstone bazaars.',
    image: '/images/jaipur.jpg',
    suitableInterests: ['Historical Monuments', 'Culture and Heritage', 'Local Food', 'Shopping', 'Photography'],
    suitableStyles: ['Balanced', 'Relaxed'],
    typicalDurationDays: 3,
    budgetTier: 'Budget-friendly',
    avgDailyCostPerPerson: 2100,
    highlights: ['Amber Palace', 'Hawa Mahal', 'City Palace', 'Jantar Mantar', 'Nahargarh Fort Sunset'],
    attractions: [
      {
        id: 'jaipur-amber-fort',
        name: 'Amber Fort & Sheesh Mahal',
        category: 'Historical Monuments',
        typicalDuration: '3 Hours',
        avgCost: 200,
        description: 'Grand hilltop fortress combining Rajput and Mughal architecture, containing the world-famous Sheesh Mahal mirror palace.',
        bestTimeOfDay: 'Morning',
        tags: ['Fort', 'UNESCO', 'Architecture']
      },
      {
        id: 'jaipur-hawa-mahal',
        name: 'Hawa Mahal & Wind View Cafe',
        category: 'Photography',
        typicalDuration: '1.5 Hours',
        avgCost: 100,
        description: 'Iconic five-story pink sandstone palace with 953 jharokhas (casements) designed for royal ladies to view city processions.',
        bestTimeOfDay: 'Morning',
        tags: ['Iconic Landmark', 'Photography', 'Heritage']
      },
      {
        id: 'jaipur-nahargarh',
        name: 'Nahargarh Fort Sunset Point',
        category: 'Adventure',
        typicalDuration: '2.5 Hours',
        avgCost: 150,
        description: 'Historic defense ramparts along the Aravalli hills with sweeping views of the entire Jaipur metropolis illuminated at dusk.',
        bestTimeOfDay: 'Evening',
        tags: ['Sunset', 'Viewpoint', 'Fortress']
      },
      {
        id: 'jaipur-jantar-mantar',
        name: 'Jantar Mantar Astronomical Observatory',
        category: 'Historical Monuments',
        typicalDuration: '1.5 Hours',
        avgCost: 200,
        description: 'UNESCO World Heritage collection of nineteen architectural astronomical instruments, including the world’s largest stone sundial.',
        bestTimeOfDay: 'Afternoon',
        tags: ['UNESCO', 'Science', 'Astronomy']
      },
      {
        id: 'jaipur-bapu-bazaar',
        name: 'Bapu Bazaar & Johari Bazaar Walk',
        category: 'Shopping',
        typicalDuration: '2.5 Hours',
        avgCost: 0,
        description: 'Traditional pink-walled markets famous for gemstone jewelry, Mojari leather shoes, and Jaipuri cotton quilts.',
        bestTimeOfDay: 'Evening',
        tags: ['Shopping', 'Textiles', 'Culture']
      },
      {
        id: 'jaipur-chokhi-dhani',
        name: 'Chokhi Dhani Ethnic Village Experience',
        category: 'Culture and Heritage',
        typicalDuration: '3 Hours',
        avgCost: 900,
        description: 'Living heritage village showcase featuring Rajasthani folk dances, fire shows, puppet plays, camel rides, and traditional thali banquet.',
        bestTimeOfDay: 'Evening',
        tags: ['Folk Culture', 'Dinner', 'Family Friendly']
      }
    ],
    foodHighlights: [
      { name: 'Pyaaz Kachori & Lassi at Rawat Mishthan Bhandar', type: 'Breakfast Classic', estimatedCost: 120 },
      { name: 'Traditional Thali at LMB (Laxmi Misthan Bhandar)', type: 'Heritage Lunch', estimatedCost: 450 },
      { name: 'Ghewar Tasting at Sambhar Fini', type: 'Sweet Tasting', estimatedCost: 150 },
      { name: 'Laal Maas or Ker Sangri at Handi Restaurant', type: 'Authentic Dinner', estimatedCost: 550 }
    ],
    travelTips: [
      'Get a Jaipur Composite Ticket covering Amber Fort, Albert Hall, and Jantar Mantar for big savings.',
      'Use Jaipur Metro for quick transit between railway station and Chandpole bazaar.',
      'Amber Fort is cooler in early morning (opens 8:00 AM).'
    ]
  },
  {
    id: 'goa',
    name: 'Goa',
    state: 'Goa',
    region: 'West-Coast',
    tagline: 'Sun, Sand, Seafood & Portuguese Heritage',
    description: 'India’s premier coastal paradise blending golden Arabian Sea beaches, colonial churches, water sports, and laid-back susegad lifestyle.',
    image: '/images/goa.jpg',
    suitableInterests: ['Beaches', 'Adventure', 'Nightlife', 'Relaxation', 'Local Food', 'Culture and Heritage'],
    suitableStyles: ['Relaxed', 'Balanced', 'Adventure-Focused'],
    typicalDurationDays: 4,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2800,
    highlights: ['Baga & Anjuna Beaches', 'Basilica of Bom Jesus', 'Dudhsagar Waterfalls', 'Fontainhas Latin Quarter', 'Aguada Fort'],
    attractions: [
      {
        id: 'goa-fontainhas',
        name: 'Fontainhas Latin Quarter Heritage Walk',
        category: 'Culture and Heritage',
        typicalDuration: '2 Hours',
        avgCost: 0,
        description: 'Stroll past charming Portuguese colonial-era houses painted in pastel yellows, blues, and terracotta with wrought-iron balconies.',
        bestTimeOfDay: 'Morning',
        tags: ['Portuguese Heritage', 'Architecture', 'Photography']
      },
      {
        id: 'goa-water-sports',
        name: 'Watersports & Jet Skiing at Calangute/Anjuna',
        category: 'Adventure',
        typicalDuration: '2.5 Hours',
        avgCost: 1200,
        description: 'Parasailing, jet skiing, banana boat rides, and bumper rides along the warm Arabian Sea waves.',
        bestTimeOfDay: 'Morning',
        tags: ['Watersports', 'Parasailing', 'Adventure']
      },
      {
        id: 'goa-fort-aguada',
        name: 'Fort Aguada & 17th Century Lighthouse',
        category: 'Historical Monuments',
        typicalDuration: '1.5 Hours',
        avgCost: 50,
        description: 'Well-preserved 17th-century Portuguese fortress commanding panoramic ocean views where the Mandovi River meets the sea.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Fort', 'Ocean View', 'History']
      },
      {
        id: 'goa-palolem-kayaking',
        name: 'Palolem Beach Sunset & Sea Kayaking',
        category: 'Beaches',
        typicalDuration: '3 Hours',
        avgCost: 400,
        description: 'Crescent-shaped white sand bay backed by coconut palms, peaceful sea kayaking, and beachfront hammock relaxation.',
        bestTimeOfDay: 'Evening',
        tags: ['Beaches', 'Kayaking', 'Relaxation']
      },
      {
        id: 'goa-bom-jesus',
        name: 'Basilica of Bom Jesus (Old Goa UNESCO Site)',
        category: 'Spiritual Places',
        typicalDuration: '1.5 Hours',
        avgCost: 0,
        description: 'Baroque Catholic basilica enshrining the mortal remains of St. Francis Xavier, landmark of Portuguese Christian history.',
        bestTimeOfDay: 'Morning',
        tags: ['UNESCO', 'Churches', 'History']
      },
      {
        id: 'goa-anjuna-curlies',
        name: 'Anjuna Beach Shack & Live Sunset Music',
        category: 'Nightlife',
        typicalDuration: '3 Hours',
        avgCost: 800,
        description: 'Beachfront acoustic music, ocean breeze, fresh seafood barbecue, and chilled sundowner vibes.',
        bestTimeOfDay: 'Evening',
        tags: ['Nightlife', 'Music', 'Beach Shack']
      }
    ],
    foodHighlights: [
      { name: 'Goan Fish Curry Thali with Kingfish Fry', type: 'Local Coastal Lunch', estimatedCost: 350 },
      { name: 'Poi Bread with Pork Vindaloo or Mushroom Xacuti', type: 'Portuguese-Goan Dinner', estimatedCost: 400 },
      { name: 'Fresh Tender Coconut & Feni Tasting', type: 'Local Drinks', estimatedCost: 150 },
      { name: 'Traditional Bebinca Layered Cake', type: 'Dessert', estimatedCost: 180 }
    ],
    travelTips: [
      'Renting an automatic scooter (₹350-500/day) is the most economical way to commute.',
      'North Goa is vibrant and social; South Goa is serene, quiet, and nature-centric.',
      'Respect local dress codes when visiting Old Goa churches and temples.'
    ]
  },
  {
    id: 'manali',
    name: 'Manali',
    state: 'Himachal Pradesh',
    region: 'North-Himalayas',
    tagline: 'Snow-Capped Peaks, Pine Valleys & High Passes',
    description: 'Picturesque Himalayan hill town nestled in the Beas River valley, serving as the adventure capital of Himachal Pradesh.',
    image: '/images/manali.jpg',
    suitableInterests: ['Nature and Mountains', 'Adventure', 'Relaxation', 'Photography', 'Local Food'],
    suitableStyles: ['Adventure-Focused', 'Balanced'],
    typicalDurationDays: 4,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2300,
    highlights: ['Solang Valley', 'Rohtang Pass', 'Hadimba Temple', 'Old Manali Cafes', 'Jogini Waterfalls Trek'],
    attractions: [
      {
        id: 'manali-solang-valley',
        name: 'Solang Valley Paragliding & Adventure',
        category: 'Adventure',
        typicalDuration: '3.5 Hours',
        avgCost: 1500,
        description: 'High-altitude adventure bowl offering tandem paragliding, zorbing, ATV rides, and winter ski slopes.',
        bestTimeOfDay: 'Morning',
        tags: ['Paragliding', 'Snow', 'Adventure']
      },
      {
        id: 'manali-hadimba-temple',
        name: 'Hadimba Devi Ancient Wooden Temple',
        category: 'Culture and Heritage',
        typicalDuration: '1.5 Hours',
        avgCost: 0,
        description: '16th-century pagoda-style timber sanctuary set amidst towering century-old cedar (Deodar) pine forests.',
        bestTimeOfDay: 'Morning',
        tags: ['Temple', 'Forest', 'Architecture']
      },
      {
        id: 'manali-jogini-trek',
        name: 'Jogini Waterfalls Nature Trek',
        category: 'Nature and Mountains',
        typicalDuration: '3 Hours',
        avgCost: 0,
        description: 'Scenic 3-kilometer hike through apple orchards and pine woodlands leading to cascading mountain waterfalls.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Trekking', 'Waterfalls', 'Nature']
      },
      {
        id: 'manali-old-manali-cafes',
        name: 'Old Manali Bohemian Cafe Culture & Live Music',
        category: 'Relaxation',
        typicalDuration: '2.5 Hours',
        avgCost: 450,
        description: 'Charming riverside cafes serving woodfired pizza, apple cider, trout, and live acoustic singer-songwriter gigs.',
        bestTimeOfDay: 'Evening',
        tags: ['Cafes', 'Music', 'Vibe']
      },
      {
        id: 'manali-atal-tunnel',
        name: 'Atal Tunnel & Sissu Lahaul Valley Excursion',
        category: 'Photography',
        typicalDuration: '4 Hours',
        avgCost: 800,
        description: 'Drive through the world’s longest highway tunnel above 10,000 feet into the dramatic barren Lahaul valley and Sissu waterfall.',
        bestTimeOfDay: 'Morning',
        tags: ['High Altitude', 'Mountains', 'Scenic Drive']
      }
    ],
    foodHighlights: [
      { name: 'Himachali Siddu with Ghee & Dal stuffing', type: 'Local Mountain Specialty', estimatedCost: 120 },
      { name: 'Pan-Fried Himalayan Trout with Garlic Herb Butter', type: 'Riverside Lunch', estimatedCost: 450 },
      { name: 'Steamed Tibetan Momos and Thukpa', type: 'Street Warmers', estimatedCost: 130 },
      { name: 'Fresh Apple Pie & Ginger Honey Lemon Tea', type: 'Old Manali Treat', estimatedCost: 200 }
    ],
    travelTips: [
      'Rohtang Pass permits must be booked in advance via the official HP tourism portal.',
      'Carry warm thermal layers even during summer months for mountain evenings.',
      'Stay hydrated to adjust comfortably to altitudes above 2,000 meters.'
    ]
  },
  {
    id: 'rishikesh',
    name: 'Rishikesh',
    state: 'Uttarakhand',
    region: 'North-Himalayas',
    tagline: 'Yoga Capital of the World & Ganga River Rafting',
    description: 'Spiritual haven at the foothills of the Himalayas where the emerald Ganges flows, famous for whitewater rafting, ashrams, and Ganga Aarti.',
    image: '/images/rishikesh.jpg',
    suitableInterests: ['Adventure', 'Spiritual Places', 'Nature and Mountains', 'Relaxation', 'Culture and Heritage'],
    suitableStyles: ['Balanced', 'Adventure-Focused', 'Relaxed'],
    typicalDurationDays: 3,
    budgetTier: 'Budget-friendly',
    avgDailyCostPerPerson: 1800,
    highlights: ['Ganges River Rafting', 'Triveni Ghat Evening Aarti', 'Beatles Ashram', 'Lakshman Jhula', 'Neer Garh Waterfall'],
    attractions: [
      {
        id: 'rishikesh-river-rafting',
        name: 'Shivpuri to Rishikesh Whitewater Rafting (16km)',
        category: 'Adventure',
        typicalDuration: '3 Hours',
        avgCost: 850,
        description: 'Exhilarating class III+ rapids such as Roller Coaster and Golf Course, cliff jumping, and bodysurfing in the glacial Ganges.',
        bestTimeOfDay: 'Morning',
        tags: ['Whitewater Rafting', 'Ganges', 'Adrenaline']
      },
      {
        id: 'rishikesh-triveni-aarti',
        name: 'Maha Ganga Aarti at Triveni Ghat',
        category: 'Spiritual Places',
        typicalDuration: '1.5 Hours',
        avgCost: 0,
        description: 'Spellbinding twilight ritual with Vedic chants, roaring brass oil lamps, bells, and floating floral diyas upon the sacred river.',
        bestTimeOfDay: 'Evening',
        tags: ['Spiritual', 'Ritual', 'Ganga Aarti']
      },
      {
        id: 'rishikesh-beatles-ashram',
        name: 'The Beatles Ashram (Chaurasi Kutia)',
        category: 'Culture and Heritage',
        typicalDuration: '2 Hours',
        avgCost: 150,
        description: 'Historic ashram inside Rajaji Tiger Reserve where the Beatles composed the White Album in 1968, filled with evocative murals.',
        bestTimeOfDay: 'Afternoon',
        tags: ['History', 'Music', 'Murals', 'Forest']
      },
      {
        id: 'rishikesh-neer-garh',
        name: 'Neer Garh Waterfall Hike',
        category: 'Nature and Mountains',
        typicalDuration: '2.5 Hours',
        avgCost: 30,
        description: 'Refreshing hike through terraced forests to two natural turquoise limestone plunge pools perfect for wading.',
        bestTimeOfDay: 'Morning',
        tags: ['Hiking', 'Waterfalls', 'Nature']
      },
      {
        id: 'rishikesh-ram-jhula-cafes',
        name: 'Ram Jhula Suspension Bridge & Organic Cafes',
        category: 'Relaxation',
        typicalDuration: '2 Hours',
        avgCost: 300,
        description: 'Cross the swinging bridge over the turquoise river to riverside rooftop cafes serving vegan smoothie bowls and herbal teas.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Suspension Bridge', 'Organic Food', 'River View']
      }
    ],
    foodHighlights: [
      { name: 'Chotiwala Traditional Garhwali Thali', type: 'Spiritual Classic Lunch', estimatedCost: 280 },
      { name: 'Ayurvedic Kitchari & Vegan Smoothie Bowl', type: 'Wellness Breakfast', estimatedCost: 220 },
      { name: 'Aloo Puri & Chai at Geeta Bhawan Ghat', type: 'Pilgrim Street Food', estimatedCost: 80 },
      { name: 'Wood-fired Pizza overlooking Ganga at Little Buddha Cafe', type: 'Sunset Dinner', estimatedCost: 400 }
    ],
    travelTips: [
      'Rishikesh is an alcohol-free and fully vegetarian holy city; embrace the Sattvic cuisine!',
      'Rafting is operational from September to June (closed during monsoon).',
      'Arrive 45 minutes prior to sunset at Triveni Ghat for front-row seating during Aarti.'
    ]
  },
  {
    id: 'kerala',
    name: 'Kerala',
    state: 'Kerala',
    region: 'South-Coast',
    tagline: 'God’s Own Country: Munnar Hills & Alleppey Backwaters',
    description: 'Emerald tropical paradise acclaimed for tranquil palm-fringed backwaters, rolling tea estates, Ayurvedic wellness, and spice-laden cuisine.',
    image: '/images/kerala.jpg',
    suitableInterests: ['Nature and Mountains', 'Relaxation', 'Local Food', 'Photography', 'Culture and Heritage'],
    suitableStyles: ['Relaxed', 'Balanced'],
    typicalDurationDays: 4,
    budgetTier: 'Moderate',
    avgDailyCostPerPerson: 2900,
    highlights: ['Alleppey Houseboat Cruise', 'Munnar Tea Plantations', 'Kathakali Dance Performance', 'Fort Kochi Heritage', 'Periyar Spice Walk'],
    attractions: [
      {
        id: 'kerala-alleppey-backwaters',
        name: 'Alleppey Traditional Kettuvallam Houseboat Cruise',
        category: 'Relaxation',
        typicalDuration: '4 Hours',
        avgCost: 1800,
        description: 'Glide through shimmering lagoons, paddy fields, and canal networks while observing authentic village life.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Backwaters', 'Houseboat', 'Scenic']
      },
      {
        id: 'kerala-munnar-tea',
        name: 'Munnar Kolukkumalai Tea Estate & Factory Tour',
        category: 'Nature and Mountains',
        typicalDuration: '3 Hours',
        avgCost: 250,
        description: 'Vibrant emerald green stepped hills, aromatic tea factory machinery, and fresh tea leaf tasting at 6,500 feet.',
        bestTimeOfDay: 'Morning',
        tags: ['Tea Gardens', 'Hills', 'Scenic Views']
      },
      {
        id: 'kerala-kathakali',
        name: 'Kathakali Theatre & Kalaripayattu Martial Arts',
        category: 'Culture and Heritage',
        typicalDuration: '2 Hours',
        avgCost: 350,
        description: 'Fascinating classical dance drama with elaborate natural face makeup and ancient Indian combat martial arts demonstration.',
        bestTimeOfDay: 'Evening',
        tags: ['Classical Dance', 'Martial Arts', 'Heritage']
      },
      {
        id: 'kerala-fort-kochi-nets',
        name: 'Fort Kochi Chinese Fishing Nets & Jew Town',
        category: 'Historical Monuments',
        typicalDuration: '2.5 Hours',
        avgCost: 0,
        description: 'Centuries-old cantilevered shore-operated fishing rigs followed by colonial spice warehouses and the Paradesi Synagogue.',
        bestTimeOfDay: 'Morning',
        tags: ['Historic Port', 'Colonial', 'Spice Market']
      },
      {
        id: 'kerala-ayurveda',
        name: 'Authentic Abhyanga Ayurvedic Rejuvenation Massage',
        category: 'Relaxation',
        typicalDuration: '1.5 Hours',
        avgCost: 1200,
        description: 'Traditional full-body warm herbal oil massage promoting relaxation, circulation, and holistic detox.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Wellness', 'Ayurveda', 'Spa']
      }
    ],
    foodHighlights: [
      { name: 'Kerala Sadhya served on Banana Leaf', type: 'Grand Traditional Feast', estimatedCost: 320 },
      { name: 'Appam with Vegetable Stew or Chicken Curry', type: 'Breakfast Classic', estimatedCost: 180 },
      { name: 'Karimeen Pollichathu (Pearl Spot Fish in Banana Leaf)', type: 'Backwater Specialty', estimatedCost: 450 },
      { name: 'Warm Pazham Pori (Banana Fritters) with Filter Coffee', type: 'Tea-time Snack', estimatedCost: 70 }
    ],
    travelTips: [
      'Split your stay: 2 days in the Munnar hills and 2 days in Alleppey backwaters.',
      'Book government Kerala Tourism Development Corporation (KTDC) boats for fair fixed rates.',
      'Carrying an umbrella is wise; lush Kerala experiences passing showers year-round.'
    ]
  },
  {
    id: 'varanasi',
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    region: 'North-East',
    tagline: 'The World’s Oldest Living Spiritual City',
    description: 'Sacred timeless civilization along the Holy Ganges with ancient river ghats, winding alleyways, silk weaving, and spiritual devotion.',
    image: '/images/varanasi.jpg',
    suitableInterests: ['Spiritual Places', 'Culture and Heritage', 'Local Food', 'Photography', 'Historical Monuments'],
    suitableStyles: ['Balanced', 'Relaxed'],
    typicalDurationDays: 3,
    budgetTier: 'Budget-friendly',
    avgDailyCostPerPerson: 1600,
    highlights: ['Dashashwamedh Ghat Ganga Aarti', 'Sunrise Boat Ride on Ganges', 'Kashi Vishwanath Temple Corridor', 'Sarnath Buddhist Site'],
    attractions: [
      {
        id: 'varanasi-sunrise-boat',
        name: 'Subah-e-Banaras Sunrise Boat Journey',
        category: 'Photography',
        typicalDuration: '2 Hours',
        avgCost: 400,
        description: 'Serene rowing boat along the historic ghats as morning sun illuminates ancient sandstone palaces and morning bathers.',
        bestTimeOfDay: 'Morning',
        tags: ['Ganges', 'Sunrise', 'Ghats']
      },
      {
        id: 'varanasi-ganga-aarti',
        name: 'Grand Ganga Aarti at Dashashwamedh Ghat',
        category: 'Spiritual Places',
        typicalDuration: '1.5 Hours',
        avgCost: 0,
        description: 'World-renowned choreographic ritual performed by young saffron-clad priests holding massive multi-tiered camphor lamps.',
        bestTimeOfDay: 'Evening',
        tags: ['Aarti', 'Ritual', 'Iconic']
      },
      {
        id: 'varanasi-sarnath',
        name: 'Sarnath Deer Park & Dhamek Stupa',
        category: 'Historical Monuments',
        typicalDuration: '3 Hours',
        avgCost: 100,
        description: 'Sacred Buddhist pilgrimage site where Lord Buddha delivered his first sermon after attaining enlightenment.',
        bestTimeOfDay: 'Afternoon',
        tags: ['Buddhism', 'UNESCO Stupa', 'History']
      },
      {
        id: 'varanasi-kashi-vishwanath',
        name: 'Shri Kashi Vishwanath Golden Temple Corridor',
        category: 'Spiritual Places',
        typicalDuration: '2 Hours',
        avgCost: 0,
        description: 'One of the twelve revered Jyotirlingas of Lord Shiva, newly renovated with a grand marble corridor leading to the river.',
        bestTimeOfDay: 'Morning',
        tags: ['Jyotirlinga', 'Temple', 'Sacred']
      }
    ],
    foodHighlights: [
      { name: 'Kachori Jalebi breakfast at Ram Bhandar', type: 'Historic Morning Feast', estimatedCost: 70 },
      { name: 'Blue Lassi or Pahalwan Lassi in Kulhad', type: 'Legendary Sweet Lassi', estimatedCost: 90 },
      { name: 'Tamatar Chaat & Palak Patta Chaat at Kashi Chaat Bhandar', type: 'Evening Street Chaat', estimatedCost: 120 },
      { name: 'Banarasi Meetha Paan', type: 'Royal Mouth Freshener', estimatedCost: 40 }
    ],
    travelTips: [
      'Walk the ghats on foot from Assi Ghat to Manikarnika Ghat for the true Banaras essence.',
      'Leave valuables in your hotel; ghats and narrow alleys are crowded.',
      'Respect funeral traditions at Harishchandra and Manikarnika ghats; photography is strictly prohibited there.'
    ]
  },
  {
    id: 'ladakh',
    name: 'Ladakh (Leh)',
    state: 'Ladakh',
    region: 'North-Himalayas',
    tagline: 'High Desert Passes, Azure Lakes & Buddhist Monasteries',
    description: 'Awe-inspiring trans-Himalayan high plateau famed for dramatic moonscapes, high mountain passes, and turquoise high-altitude lakes.',
    image: '/images/ladakh.jpg',
    suitableInterests: ['Adventure', 'Nature and Mountains', 'Photography', 'Culture and Heritage'],
    suitableStyles: ['Adventure-Focused', 'Balanced'],
    typicalDurationDays: 5,
    budgetTier: 'Premium',
    avgDailyCostPerPerson: 4200,
    highlights: ['Pangong Tso Lake', 'Nubra Valley & Khardung La', 'Thiksey Monastery', 'Magnetic Hill & Sangam'],
    attractions: [
      {
        id: 'ladakh-pangong',
        name: 'Pangong Tso Lake Day/Overnight Excursion',
        category: 'Nature and Mountains',
        typicalDuration: '5 Hours',
        avgCost: 1800,
        description: 'Iconic 134km endorheic lake at 14,270 feet that changes shades from turquoise to cobalt blue throughout the day.',
        bestTimeOfDay: 'Afternoon',
        tags: ['High Altitude Lake', 'Scenic', 'Mountains']
      },
      {
        id: 'ladakh-khardungla',
        name: 'Khardung La Pass Crossing & Nubra Valley',
        category: 'Adventure',
        typicalDuration: '5 Hours',
        avgCost: 2000,
        description: 'Traverse one of the world’s highest motorable passes at 17,982 ft down into the white sand dunes of Hunder.',
        bestTimeOfDay: 'Morning',
        tags: ['Pass', 'High Altitude', 'Adventure']
      },
      {
        id: 'ladakh-thiksey',
        name: 'Thiksey Monastery Sunrise Morning Prayer',
        category: 'Spiritual Places',
        typicalDuration: '2 Hours',
        avgCost: 50,
        description: 'Twelve-story Tibetan Buddhist complex resembling Potala Palace with a 49-foot Maitreya Buddha statue.',
        bestTimeOfDay: 'Morning',
        tags: ['Monastery', 'Buddhism', 'Chants']
      }
    ],
    foodHighlights: [
      { name: 'Ladakhi Skyu (Traditional Root Vegetable Pasta Stew)', type: 'Hearty Dinner', estimatedCost: 200 },
      { name: 'Yak Cheese Tasting & Butter Tea (Gur Gur Chai)', type: 'High Desert Warmers', estimatedCost: 100 },
      { name: 'Tingmo Steamed Bread with Spicy Vegetable Gravy', type: 'Lunch Staple', estimatedCost: 180 }
    ],
    travelTips: [
      'Mandatory 48-hour acclimatization in Leh before ascending higher passes to prevent acute mountain sickness (AMS).',
      'Obtain Inner Line Permits (ILP) for Pangong and Nubra Valley.',
      'Carry postpaid BSNL/Jio SIM cards; prepaid connections from other states do not work in Ladakh.'
    ]
  }
];

// Helper to look up destination by id or fuzzy name
export function findDestination(query) {
  if (!query) return null;
  const q = query.toLowerCase().trim();
  const match = DESTINATIONS.find(d => 
    d.id === q || 
    d.name.toLowerCase() === q || 
    d.name.toLowerCase().includes(q) ||
    q.includes(d.name.toLowerCase())
  );
  return match || null;
}
