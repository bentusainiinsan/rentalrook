
import { Property, PropertyType } from './types';

export const COMPANY_INFO = {
    name: "Sonipat Home Service.com",
    phone: "8816014071",
    email: "care@sonipathomeservice.com",
    address: "128/1, Sainipura, Sonipat",
    officeLocationUrl: "https://www.google.com/maps?q=29.006456480081468,77.01762222665928",
    logoRedirectUrl: "https://www.sonipathomeservice.com",
};

export const SOCIAL_LINKS = {
    facebook: "https://www.facebook.com/sonipathomeservice",
    instagram: "https://www.instagram.com/sonipathomeservice",
    x: "https://x.com/sonipathome",
    whatsapp: "https://wa.me/918816014071",
};

export const APP_INFO = {
    playStoreUrl: "https://play.google.com/store/apps/details?id=com.crapd.sonipathomeservice",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=https://play.google.com/store/apps/details?id=com.crapd.sonipathomeservice",
};

export const LOCATION_DATA: { [key: string]: string[] } = {
  "Sonipat": ["4 Marla", "8 Marla", "Adersh Nagar", "Anand Nagar", "Arya Nagar", "Ashok Nagar", "Ashok Vihar", "Baba Colony", "Badwasni Gaon", "Bandepur", "Bara Bagad", "Batra Colony", "Bayanpur", "Bhagat Pura", "Bhagat Singh Colony", "Bharam Colony", "Bharam Nagar", "Bharatpuri", "Bhattan Mohalla", "Bheem Nagar", "Chawla Colony", "Chintpurni Colony", "Chitana Gaon", "Chotu Ram Chowk", "Chouhan Colony", "Davru Gaon", "Davru Road", "Defence Colony", "Deha Basti", "Delhi Camp", "Dev Nagar", "Dhanak Basti", "Dhiya Colony'", "Double Story", "Faj Bazar", "Faraz Khana", "Ganj Bazar", "Garh Sahajanpur", "Garhi Bharmana", "Garhi Gasita", "Gokul Nagar", "Govind Nagar", "Hanuman Nagar", "Hem Park", "Hullaheri Gaon", "Indian Colony", "Indra Colony", "Indra Colony, Kailash Pur", "Jamalpura", "Janta Colony", "Jatti Kalan", "Jatwara", "Jawahar Nagar", "Jeevan Nagar", "Kaath Mandi", "Kabir Nagar-Kalupur", "Kabir Pur", "Kachhey Querter", "Kailash Colony", "Kakroi Road", "Kalash Colony", "Kalupur", "Katth Mandi", "Khan Colony", "Khari Kwa", "Kot Mohalla", "Krishan Pura", "Krishana Nagar", "Kriti Nagar", "Kumhar Gate", "Lajpat Nagar", "Lal Darwaja", "Lehrara", "Luxmi Nagar", "Mahabir Colony", "Malviya Nagar", "Mamchand Colony", "Maya Puri", "Mc Colony", "Mirch Mandi", "Mission Road", "Model Town", "Mohalla Kalan", "Mohan Nagar", "Mohanpura", "Nandwani Nagar", "Narender Nagar", "New Jeevan Nagar", "Old Housing Board Colony", "Om Colony", "Omnagar", "Other", "Pancham Nagar", "Parbhu Nagar", "Pargati Nagar", "Patel Nagar", "Prem Nagar", "Prem Nagar- Kakroi Road", "Prem Nagar-Behind Bus Stand", "Pwd Colony", "Railway Colony", "Raj Mohalla", "Rajiv Colony", "Rajiv Nagar", "Ram Nagar", "Rishi Colony", "Rk Colony", "Roop Nagar", "Sabun Darwaja", "Sai Baba Colony", "Sainipura", "Sant Garb Dass Nagar", "Sector 1", "Sector 10", "Sector 11", "Sector 12", "Sector 13", "Sector 14", "Sector 15", "Sector 15 Housing Board", "Sector 16", "Sector 17", "Sector 18", "Sector 19", "Sector 23", "Sector 3", "Sector 7", "Sector 9", "Shadipur", "Shanti Vihar", "Shartri Colony", "Shastri Park", "Shiv Colony", "Sidharth Colony", "Sikka Colony", "Sri Nagar", "Sudama Nagar", "Sujjan Singh Park", "Sundal Mohalla", "Sunder Sawari", "Tara Nagar", "Teacher Colony", "Uttam Nagar", "Vikas Nagar", "Vikas Nagar- Murthal Road", "Vishal Nagar", "West Ram Nagar"],
  "Gannaur": ["Anup Nagar", "B.S.T Colony", "Baddi", "Badi leharari", "Barodth", "Baye barodth", "Bega", "Bhakadpur", "Bhuri", "Bigaan", "Chirsmi", "chotti leharari", "Deha", "Dhatoli", "Dhutri", "Gandhi Nagar", "Gannaur Mandi", "Garhi gulama", "Garhi Kashri", "Gayaspur", "Ghasoli", "Hari Nagar", "Hasanpur", "Janta School", "K.D.Nagar", "Kami", "Khera Taga", "Kot Mohalla", "Kurad", "Ladsoli", "lala Garhi", "Maichand Colony", "Namaste Chowk", "Papnera", "Pardhanwas Mohalla", "Patti bharaman", "Peer garhi", "Pelanda garhi", "Pipli khera", "Rajpura", "Ramnagar", "Rashulpur", "Rehda Basti", "Roshanpur", "Shashtri Nagar", "Shehpur", "Sunfeda", "Tandoli", "Umedgarh", "Vasant Nagar"],
  "Kharkhoda": ["Badhana", "Bahiyanpur", "Barona", "Bidhallan", "Farmana", "Fathepur", "Firozpur Bangar", "Garhi Sisana", "Gopalpur", "Gorad", "Harshana Kalan", "Jagdishpur", "Jatola", "Jhanjoli", "Jharoth", "Jharothi", "Kakroi", "Katlupur", "Khanda", "Kharkhoda", "Kheri Dhaiya", "Khrumpur", "Kundal", "Leharara", "Livaan", "Mandora", "Mandori", "Matindu", "Mohammdabad", "Mojamnagar", "Nakloi", "Naseebpur Bangar", "Nasirpur Choulka", "Nirthaan", "Nithaan", "Nizampur Khurd", "Nizampur Mazra", "Pai", "Parladpur", "Pipli", "Quali", "Rathdhana", "Redhu", "Rohana", "Rohat", "Shedpur", "Sheri", "Shotti", "Silana", "Sinoli", "Sisana", "Thana Kalan", "Thana Khurd", "Trukhpur"],
  "Kailana": ["Agawanpur", "Ahulana", "Attal", "Bajana Kalan", "Bajana Khurd", "Balli", "Bhaver", "Bilindpur", "Chatiya", "Gamdaa", "Ghummad", "Heer Mazra", "Jahri", "Jassi Pur", "Kalana", "Kehri", "Khabru", "Mazra", "Naya Bass", "Panchi", "Pugthalla", "Purkash", "Razlu Garhi", "Sandal Kalan", "Sandal Khurd", "Sardaana", "Sazadpur", "Seeya Khera", "Shekpura", "Tavedi", "Tharu"],
  "Rai Bahalgarh": ["Aterna", "Bad Malik", "Badkhalsha", "Badoli", "Bahalgarh", "Barota", "Behra ( Bakipur)", "Chauhan Joshi", "Chetera", "Dadhi Nangal", "Dipalpur", "Garh Marikpur", "Garh Sejhenpur", "Jagdishpur", "Jainpur", "Jakholi", "Jat Joshi", "Jathadi", "Jatti Kalan", "Jhundpur", "Kamaspur", "Kheri", "Khewara", "Khurampur", "Kundli", "Liwaspur", "Makimpur", "Malikpur", "Manoli", "Mazra", "Mehandipur", "Mimarpur", "Murthal", "Nandnaur", "Nangal", "Nathupur", "Nehra", "Nehri", "Orangabad", "Palada", "Paladi", "Peou Manhari", "Rai", "Raipur", "Rasoi", "Revali", "Saberpur", "Seveli", "Shahpur", "Tanda", "Tikola"],
  "Gohana": ["Abadi rattangarh", "Adarsh Nagar", "Badota", "Badwasni", "Baggad", "Barota", "Bhaadi", "Bhatana", "Bhatgaon dugran", "Bhatgaon dugran garhi haqiqat", "Bhatgaon maalyan", "Bidghal", "Bohelaa", "Chatiya Deva", "Chitana", "Chopra Colony", "citawali", "Dariyapur Basti", "Dodavaa", "Dubeta", "Gamadi", "Gangser", "Garhi Naamdar Khaa", "Garhi Sarai naamdaar kha", "Garhi Ujala khaa", "Gohana City", "Gohana Mandi", "Grina", "Gudaa", "Hasangarh", "Hullaheri", "Jaji", "Jholly", "Jind Road", "Jolly", "Jua", "Kakaana", "Kalana Khash", "Kashandi", "Kasnada", "Keravedi", "Khandrai", "Khanpur kalan", "Kheri", "Kheri damkan", "Khijrpur jaat mazra", "Kilhond", "Lath", "Laxmi Nagar", "Luhari Tibba", "Machri", "Mahalana", "Mahipur", "Mazri", "Mehra", "Mohana", "Nagar", "Nayat", "Nenna", "Pinana", "Punjabi Colony", "Remana", "Rolad", "Sainipura", "Salarpur mazra", "Salimsar mazra", "Silampur trally", "Sonipat Road", "SP Majra", "Surgathal", "Thehad", "Thihaad kalan", "Thihaad khurd", "Vishnu Nagar", "Wazirpur"]
};

export const INITIAL_PROPERTIES: Property[] = [
    {
        id: 'test_1',
        title: 'Testing Property',
        type: PropertyType.Room,
        location: { block: 'Sonipat', area: 'Model Town' },
        address: 'Near Main Market, Model Town',
        rent: 1,
        images: ['https://picsum.photos/seed/test1/800/600', 'https://picsum.photos/seed/test2/800/600', 'https://picsum.photos/seed/test3/800/600'],
        owner: { name: 'Test Owner', phone: '9876543210' },
        description: 'This is a test property with a price of Rs. 1 for payment gateway testing.',
        isVerified: true,
    },
    {
        id: 'prop_123',
        title: 'Spacious 2 BHK House in Sector 14',
        type: PropertyType.House,
        location: { block: 'Sonipat', area: 'Sector 14' },
        address: '123, Green Park, Sector 14, Sonipat',
        rent: 15000,
        images: ['https://picsum.photos/seed/house1/800/600', 'https://picsum.photos/seed/house2/800/600', 'https://picsum.photos/seed/house3/800/600'],
        owner: { name: 'Ramesh Kumar', phone: '8816014071' },
        description: 'A beautiful and spacious 2 BHK house available for rent in a prime location. Close to market and school.',
        isVerified: true,
    },
    {
        id: 'prop_456',
        title: 'Commercial Shop on Murthal Road',
        type: PropertyType.Shop,
        location: { block: 'Rai Bahalgarh', area: 'Murthal' },
        address: 'Shop No. 5, Main Murthal Road, Near Ahuja Dhaba',
        rent: 25000,
        images: ['https://picsum.photos/seed/shop1/800/600', 'https://picsum.photos/seed/shop2/800/600', 'https://picsum.photos/seed/shop3/800/600'],
        owner: { name: 'Sunita Devi', phone: '9998887776' },
        description: 'Prime location shop suitable for any business. High footfall area.',
        isVerified: false,
    },
     {
        id: 'prop_789',
        title: 'Large Godown in Kundli Industrial Area',
        type: PropertyType.Godown,
        location: { block: 'Rai Bahalgarh', area: 'Kundli' },
        address: 'Plot 42, Sector 53, HSIIDC Kundli',
        rent: 75000,
        images: ['https://picsum.photos/seed/godown1/800/600', 'https://picsum.photos/seed/godown2/800/600', 'https://picsum.photos/seed/godown3/800/600'],
        owner: { name: 'Anil Singhania', phone: '9123456789' },
        description: 'Massive 5000 sq. ft. godown available for rent in Kundli. Suitable for storage and logistics.',
        isVerified: true,
    }
];