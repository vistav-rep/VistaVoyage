import maraExImage from '../assets/JAMAL LABELED IMAGES/MASAI MARA SAFARI SHOT 1.jpg';
import DubaiSkyImage from '../assets/Dubai sky.jpeg'
import Swahili from '../assets/swahili.jpg';
import Nairobi from '../assets/JAMAL LABELED IMAGES/GIRAFFE CENTRE SHOT.jpg';
import maasai from '../assets/JAMAL LABELED IMAGES/MASAI MARA SAFARI SHOT 4.jpg';
import Homabay from '../assets/Homabay.jpg';
import Amboseli from '../assets/JAMAL LABELED IMAGES/MASAI MARA SAFARI SHOT 7.jpg';
import Tsavo from '../assets/Tsavo west.jpg';
import Rally from '../assets/Rally accomodation.jpg';
import Saf from '../assets/saf.jpeg';
import Seychelles from '../assets/Seychelles.jpg';


export const tours = [
  
  {
    id: "exclusive-maasai-mara",
    title: "Exclusive Maasai Mara Safari Expedition",
    price: 550,
    duration: "3 Days 2 Nights",
    location: "Maasai Mara, Kenya",
    image: maraExImage,
    tag: "Best Seller",
    description: "Experience the magic of the Maasai Mara with our exclusive expedition. Witness the Great Migration, enjoy luxury tented camps, and embark on thrilling game drives led by expert guides.",
    itinerary: [
      { day: 1, title: 'Flight to Mara & Evening Game Drive', description: 'Depart from Nairobi for a scenic flight to the Maasai Mara. Upon arrival, transfer to your luxury tented camp. After lunch, enjoy your first evening game drive in search of the Big Five.' },
      { day: 2, title: 'Full Day Game Observation', description: 'Early morning breakfast followed by a full day of game viewing. Picnic lunch will be served in the heart of the savanna. Witness the vast herds and the predators that follow them.' },
      { day: 3, title: 'Cultural Visit & Departure', description: 'Visit a traditional Maasai village to learn about their ancient culture and traditions. After lunch, transfer to the airstrip for your flight back to Nairobi.' }
    ],
    inclusions: [
      'Return flights from Nairobi',
      'Luxury tented camp accommodation',
      'All meals and selected drinks',
      'Daily guided game drives',
      'Maasai village visit',
      'Park entrance fees'
    ]
  },
  {
    id: "dubai-skyline",
    title: "Dubai Skyline & Luxury Desert Escape",
    price: 1250,
    duration: "5 Days 4 Nights",
    location: "Dubai, UAE",
    image: DubaiSkyImage,
    tag: "Top Rated",
    description: "A perfect blend of modern luxury and traditional desert adventure. Stay in world-class skyscrapers and enjoy a private desert safari under the stars.",
    itinerary: [
      { day: 1, title: 'Arrival in the City of Gold', description: 'Transfer from Dubai International Airport to your 5-star hotel. Evening dinner cruise at Dubai Marina.' },
      { day: 2, title: 'Modern Dubai Tour & Burj Khalifa', description: 'Visit the Dubai Mall, watch the Fountain Show, and head to the At The Top observatory of Burj Khalifa. Afternoon at leisure.' },
      { day: 3, title: 'Private Desert Safari', description: 'Morning at leisure. Afternoon dune bashing adventure followed by a traditional BBQ dinner in a private desert camp under the stars.' },
      { day: 4, title: 'Old Dubai & Souks', description: 'Explore the Al Fahidi Historical Neighborhood, cross the creek in an Abra, and visit the Gold and Spice Souks. Farewell dinner at an authentic Emirati restaurant.' },
      { day: 5, title: 'Leisure & Departure', description: 'Final shopping opportunities at the Mall of the Emirates before your private transfer to the airport.' }
    ],
    inclusions: [
      '5-star hotel accommodation',
      'Daily breakfast and select dinners',
      'Private desert safari with BBQ',
      'Burj Khalifa entrance tickets',
      'Private airport transfers',
      'Professional city guides'
    ]
  },
  {
    id: "south-africa-combo",
    title: "South Africa: Cape Town & Safari Combo",
    price: 1850,
    duration: "7 Days 6 Nights",
    location: "Cape Town, SA",
    image: Saf,
    tag: "Luxury",
    description: "Explore the vibrant city of Cape Town before heading into the wild for an unforgettable safari experience in South Africa's premier reserves.",
    itinerary: [
      { day: 1, title: 'Welcome to the Mother City', description: 'Arrive at Cape Town International and transfer to your luxury hotel at the V&A Waterfront.' },
      { day: 2, title: 'Table Mountain & City Sights', description: 'Cable car ride up Table Mountain followed by a guided tour of the Bo-Kaap and Company Gardens.' },
      { day: 3, title: 'Cape Peninsula Expedition', description: 'Full day tour to Cape Point, Boulders Beach penguin colony, and the scenic Chapman\'s Peak Drive.' },
      { day: 4, title: 'Flight to the Lowveld', description: 'Morning flight to the Kruger region and transfer to your private safari lodge. Sunset game drive.' },
      { day: 5, title: 'Safari Adventures', description: 'Morning and evening game drives in open vehicles. Bush walks with professional rangers.' },
      { day: 6, title: 'Wildlife Observation', description: 'Tracking the Big Five and learning about the smaller wonders of the African bush. Gala dinner in the boma.' },
      { day: 7, title: 'Farewell Safari', description: 'Final early morning game drive followed by a hearty breakfast and transfer for your flight home.' }
    ],
    inclusions: [
      'Internal flights (CPT to Kruger)',
      'Luxury hotel and safari lodge stays',
      'Most meals and all safari activities',
      'Expert guides and trackers',
      'All park and conservation fees',
      'Private ground transportation'
    ]
  },
  {
    id: "amboseli-kilimanjaro",
    title: "Amboseli & Mt. Kilimanjaro View",
    price: 600,
    duration: "3 Days 2 Nights",
    location: "Amboseli, Kenya",
    image: Amboseli,
    tag: "Photography",
    description: "Capture the iconic views of Mt. Kilimanjaro from Amboseli National Park. Famous for its large herds of elephants and stunning backdrops.",
    itinerary: [
      { day: 1, title: 'Drive to Amboseli', description: 'Depart from Nairobi for Amboseli National Park. Enjoy a scenic drive with views of the Rift Valley. Afternoon game drive with Kilimanjaro backdrop.' },
      { day: 2, title: 'Elephants & Kilimanjaro', description: 'Full day exploring the park. Visit the Observation Hill for panoramic views. Witness the legendary elephant herds of Amboseli.' },
      { day: 3, title: 'Early Morning Drive & Return', description: 'Catch the mountain at its clearest during an early morning drive. After breakfast, depart for Nairobi.' }
    ],
    inclusions: [
      'Ground transport in 4x4 Land Cruiser',
      'Full board lodge accommodation',
      'Experienced driver-guide',
      'Park entrance fees',
      'All taxes and service charges'
    ]
  },
  {
    id: "tsavo-west",
    title: "Tsavo West National Park Exploration",
    price: 2100,
    duration: "3 Days 2 Nights",
    location: "Tsavo West, Kenya",
    image: Tsavo,
    tag: "Premium",
    description: "A luxury exploration of Tsavo West. Visit Mzima Springs, the Shetani Lava Flow, and enjoy exceptional game viewing in one of Kenya's largest parks."
  },
  {
    id: "wrc-safari-rally",
    title: "Exclusive WRC Safari Rally Accommodation",
    price: 134,
    duration: "Per Night",
    location: "Naivasha, Kenya",
    image: Rally,
    tag: "Latest Deal",
    description: "Experience the thrill of the WRC Safari Rally with our exclusive accommodation packages at Sarova Lion Hill, Sawela Lodge, and Elmer Resort. Premium access to the rally action."
  }
];
