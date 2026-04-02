/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link, useParams, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { MapPin, Calendar, Mountain, Shield, Star, Phone, Mail, Instagram, Facebook, ArrowRight, Menu, X, CheckCircle2, Users, Clock, ArrowLeft, Edit2, Save, Plus, Trash2 } from 'lucide-react';

const WHATSAPP_NUMBER = "919876543210"; 
const WHATSAPP_MESSAGE = "hi, want to go trek";
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

const INITIAL_TREKS = [
  {
    id: 1,
    name: "Kedarkantha Trek",
    duration: "6 Days",
    difficulty: "Easy to Moderate",
    altitude: "12,500 ft",
    image: "https://picsum.photos/seed/kedarkantha/1200/600",
    price: "₹8,999",
    excerpt: "A classic winter trek known for its stunning snowscapes and a thrilling summit climb.",
    content: `
      The Kedarkantha Trek is one of the most popular winter treks in the Indian Himalayas. Located in the Govind Wildlife Sanctuary in Uttarakhand, it offers a perfect blend of thrilling summit climbs, beautiful campsites, and dense pine forests.
      
      Starting from the picturesque village of Sankri, the trail takes you through snow-laden paths, offering panoramic views of famous peaks like Swargarohini, Black Peak, and Bandarpoonch. The highlight of the trek is the summit day, where you start early in the morning to catch a mesmerizing sunrise from the top at 12,500 feet.
      
      Whether you are a beginner looking for your first Himalayan adventure or an experienced trekker wanting to experience a winter wonderland, Kedarkantha is the perfect choice.
    `,
    itinerary: [
      "Day 1: Arrival at Sankri",
      "Day 2: Sankri to Juda-ka-Talab",
      "Day 3: Juda-ka-Talab to Kedarkantha Base",
      "Day 4: Kedarkantha Base to Summit and back to Hargaon",
      "Day 5: Hargaon to Sankri",
      "Day 6: Departure from Sankri"
    ]
  },
  {
    id: 2,
    name: "Brahmatal Trek",
    duration: "6 Days",
    difficulty: "Moderate",
    altitude: "12,250 ft",
    image: "https://picsum.photos/seed/brahmatal/1200/600",
    price: "₹9,500",
    excerpt: "A beautiful trek featuring a frozen alpine lake and majestic views of Mt. Trishul and Mt. Nanda Ghunti.",
    content: `
      Brahmatal is a hidden gem in the Himalayas, especially famous for its winter beauty. The trek takes you to the frozen Brahmatal lake, which is steeped in mythology and surrounded by a pristine white landscape.
      
      Unlike other treks, much of the Brahmatal trail walks on a ridge, giving you uninterrupted, sweeping views of the majestic Mt. Trishul and Mt. Nanda Ghunti. The forests of oak and rhododendron look enchanting when covered in snow.
      
      The trek is moderately difficult, making it a great step up for those who have done an easy trek before and want to experience walking on snow-covered ridges.
    `,
    itinerary: [
      "Day 1: Arrival at Lohajung",
      "Day 2: Lohajung to Gujrati Pasture",
      "Day 3: Gujrati Pasture to Tilandi",
      "Day 4: Tilandi to Brahmatal and back to Brahmatal Base",
      "Day 5: Brahmatal Base to Lohajung",
      "Day 6: Departure from Lohajung"
    ]
  },
  {
    id: 3,
    name: "Roopkund Trek",
    duration: "8 Days",
    difficulty: "Difficult",
    altitude: "16,499 ft",
    image: "https://picsum.photos/seed/roopkund/1200/600",
    price: "₹14,500",
    excerpt: "The mysterious skeleton lake trek offering deep forests, alpine meadows, and high-altitude thrills.",
    content: `
      The Roopkund Trek is legendary. Known as the 'Skeleton Lake', Roopkund is a high-altitude glacial lake where hundreds of ancient human skeletons are visible when the snow melts.
      
      But the mystery is just one part of the appeal. The trek offers an incredible variety of landscapes. You will walk through deep virgin forests, cross the expansive twin meadows of Ali and Bedni Bugyal (some of the largest high-altitude meadows in India), and finally navigate the harsh, rocky alpine terrain to reach the lake at 16,499 feet.
      
      This is a difficult trek requiring good physical fitness and prior trekking experience, but the rewards are absolutely unparalleled.
    `,
    itinerary: [
      "Day 1: Arrival at Lohajung",
      "Day 2: Lohajung to Didna Village",
      "Day 3: Didna Village to Ali Bugyal",
      "Day 4: Ali Bugyal to Patar Nachauni",
      "Day 5: Patar Nachauni to Bhagwabasa",
      "Day 6: Bhagwabasa to Roopkund and back to Patar Nachauni",
      "Day 7: Patar Nachauni to Lohajung",
      "Day 8: Departure from Lohajung"
    ]
  },
  {
    id: 4,
    name: "Valley of Flowers",
    duration: "6 Days",
    difficulty: "Moderate",
    altitude: "14,400 ft",
    image: "https://picsum.photos/seed/valley/1200/600",
    price: "₹10,500",
    excerpt: "A UNESCO World Heritage site that blooms with millions of colorful alpine flowers during monsoon.",
    content: `
      The Valley of Flowers is a fairy-tale trek. Tucked away in the Nanda Devi Biosphere Reserve, this UNESCO World Heritage site comes alive during the monsoon months (July to September) when millions of alpine flowers bloom, creating a vibrant carpet of colors.
      
      The trek also includes a visit to Hemkund Sahib, a revered Sikh shrine located next to a glacial lake at 14,200 feet. The contrast between the gentle, colorful Valley of Flowers and the stark, spiritual atmosphere of Hemkund Sahib makes this trek a unique experience.
      
      The trail is well-defined and mostly involves ascending stone paths, making it suitable for enthusiastic beginners.
    `,
    itinerary: [
      "Day 1: Drive from Haridwar to Govindghat",
      "Day 2: Govindghat to Ghangaria",
      "Day 3: Ghangaria to Valley of Flowers and back",
      "Day 4: Ghangaria to Hemkund Sahib and back",
      "Day 5: Ghangaria to Govindghat",
      "Day 6: Drive from Govindghat to Haridwar"
    ]
  }
];

export const TrekContext = React.createContext<any>(null);

export function TrekProvider({ children }: { children: React.ReactNode }) {
  const [treks, setTreks] = useState(() => {
    const saved = localStorage.getItem('ryoko_treks');
    return saved ? JSON.parse(saved) : INITIAL_TREKS;
  });

  useEffect(() => {
    localStorage.setItem('ryoko_treks', JSON.stringify(treks));
  }, [treks]);

  const updateTrek = (id: number, updatedData: any) => {
    setTreks(treks.map((t: any) => t.id === id ? { ...t, ...updatedData } : t));
  };

  const addTrek = (newTrek: any) => {
    setTreks([...treks, { ...newTrek, id: Date.now(), itinerary: [] }]);
  };

  const deleteTrek = (id: number) => {
    setTreks(treks.filter((t: any) => t.id !== id));
  };

  return (
    <TrekContext.Provider value={{ treks, updateTrek, addTrek, deleteTrek }}>
      {children}
    </TrekContext.Provider>
  );
}

// Helper to scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // On non-home pages, always show the solid navbar
  const navClass = isHomePage 
    ? (isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5')
    : 'bg-white shadow-sm py-3';

  const textClass = isHomePage
    ? (isScrolled ? 'text-stone-900' : 'text-white')
    : 'text-stone-900';

  const linkClass = isHomePage
    ? (isScrolled ? 'text-stone-600' : 'text-stone-100')
    : 'text-stone-600';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <Mountain className={`h-8 w-8 ${isHomePage && !isScrolled ? 'text-white' : 'text-brand-700'}`} />
            <span className={`ml-2 text-2xl font-serif font-bold tracking-tight ${textClass}`}>
              Ryoko India
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`text-sm font-medium hover:text-accent-500 transition-colors ${linkClass}`}>Home</Link>
            {isHomePage ? (
              <>
                <a href="#about" className={`text-sm font-medium hover:text-accent-500 transition-colors ${linkClass}`}>About</a>
                <a href="#treks" className={`text-sm font-medium hover:text-accent-500 transition-colors ${linkClass}`}>Treks</a>
              </>
            ) : (
              <Link to="/#treks" className={`text-sm font-medium hover:text-accent-500 transition-colors ${linkClass}`}>All Treks</Link>
            )}
            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold transition-all shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              Contact Us
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`${textClass}`}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-4 px-4 flex flex-col space-y-4"
        >
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 font-medium">Home</Link>
          <Link to="/#treks" onClick={() => setIsMobileMenuOpen(false)} className="text-stone-600 font-medium">All Treks</Link>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-accent-500 text-white px-5 py-3 rounded-lg text-center font-semibold flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Contact on WhatsApp
          </a>
        </motion.div>
      )}
    </nav>
  );
}

function Footer() {
  return (
    <footer className="bg-stone-950 text-stone-400 py-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-2">
            <div className="flex items-center mb-4">
              <Mountain className="h-8 w-8 text-brand-500" />
              <span className="ml-2 text-2xl font-serif font-bold text-white">
                Ryoko India
              </span>
            </div>
            <p className="max-w-sm mb-6">
              Your trusted partner for Himalayan adventures. We organize safe, sustainable, and unforgettable trekking experiences.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="text-stone-400 hover:text-white transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-brand-400 transition-colors">Home</Link></li>
              <li><Link to="/#treks" className="hover:text-brand-400 transition-colors">Our Treks</Link></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Terms & Conditions</a></li>
              <li><Link to="/admin" className="hover:text-brand-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-4">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                <span>Dehradun, Uttarakhand, India</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span>hello@ryokoindia.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-stone-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ryoko India. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function Home() {
  const { treks } = React.useContext(TrekContext);
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://picsum.photos/seed/himalayas/1920/1080" 
            alt="Himalayan Mountains" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-3 rounded-full bg-white/20 backdrop-blur-sm text-white text-sm font-medium tracking-wider uppercase mb-6 border border-white/30"
          >
            Explore the Unexplored
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white mb-6 leading-tight"
          >
            Find Your Next <span className="text-accent-500 italic">Adventure</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-lg md:text-xl text-stone-200 mb-10 max-w-2xl mx-auto font-light"
          >
            Ryoko India offers curated trekking experiences in the Himalayas. Expert guides, safe trails, and memories that last a lifetime.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <a 
              href="#treks"
              className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all hover:scale-105 shadow-[0_0_20px_rgba(34,197,94,0.4)]"
            >
              View Our Treks
              <ArrowRight className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://picsum.photos/seed/trekking/800/1000" 
                alt="Trekking Group" 
                className="rounded-2xl shadow-2xl object-cover h-[600px] w-full"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-sm font-bold tracking-widest text-brand-700 uppercase mb-3">About Ryoko India</h2>
              <h3 className="text-4xl font-serif font-bold text-stone-900 mb-6">We Make Himalayan Treks Accessible & Safe</h3>
              <p className="text-stone-600 mb-6 text-lg leading-relaxed">
                "Ryoko" means journey, and at Ryoko India, we believe every journey into the mountains should be transformative. Founded by passionate mountaineers, we specialize in organizing high-altitude treks across the Indian Himalayas.
              </p>
              <p className="text-stone-600 mb-8 text-lg leading-relaxed">
                Whether you are a beginner looking for your first snow trek or an experienced hiker aiming for a challenging summit, our expert team ensures a safe, eco-friendly, and unforgettable experience.
              </p>
              
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-3">
                  <div className="bg-brand-100 p-2 rounded-lg text-brand-700">
                    <Shield className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Safety First</h4>
                    <p className="text-sm text-stone-500">Certified guides & equipment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="bg-brand-100 p-2 rounded-lg text-brand-700">
                    <Users className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-stone-900">Small Groups</h4>
                    <p className="text-sm text-stone-500">Personalized attention</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Treks (Blog Style Index) */}
      <section id="treks" className="py-20 bg-stone-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold tracking-widest text-brand-700 uppercase mb-3">Trek Destinations</h2>
            <h3 className="text-4xl font-serif font-bold text-stone-900 mb-6">Latest Trekking Expeditions</h3>
            <p className="text-stone-600 text-lg">
              Read about our handpicked selection of the most beautiful and sought-after trekking routes in the Himalayas.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
            {treks.map((trek: any, index: number) => (
              <motion.div 
                key={trek.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group flex flex-col md:flex-row"
              >
                <div className="relative h-64 md:h-auto md:w-2/5 overflow-hidden shrink-0">
                  <img 
                    src={trek.image} 
                    alt={trek.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 bg-brand-600 px-3 py-1 rounded-full text-xs font-bold text-white">
                    {trek.difficulty}
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow md:w-3/5">
                  <h4 className="text-2xl font-bold text-stone-900 mb-2">{trek.name}</h4>
                  <p className="text-stone-600 mb-4 text-sm line-clamp-2">{trek.excerpt}</p>
                  
                  <div className="space-y-2 mb-6 flex-grow">
                    <div className="flex items-center text-stone-500 text-sm">
                      <Clock className="w-4 h-4 mr-2 text-brand-600" />
                      {trek.duration}
                    </div>
                    <div className="flex items-center text-stone-500 text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-brand-600" />
                      {trek.altitude}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-4 border-t border-stone-100">
                    <span className="font-bold text-lg text-stone-900">{trek.price}</span>
                    <Link 
                      to={`/trek/${trek.id}`}
                      className="text-brand-600 font-semibold hover:text-brand-800 transition-colors flex items-center gap-1"
                    >
                      Read Full Post <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-900 relative overflow-hidden text-white">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-10">
          <Mountain className="w-[800px] h-[800px] absolute -top-40 -right-40 text-white" />
        </div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Ready for Your Next Adventure?</h2>
          <p className="text-xl text-stone-300 mb-10">
            Drop us a message on WhatsApp. Our team will help you choose the perfect trek and handle all the logistics.
          </p>
          <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-accent-500 hover:bg-accent-600 text-white px-10 py-5 rounded-full text-xl font-bold transition-all hover:scale-105 shadow-xl"
          >
            <Phone className="w-6 h-6" />
            Message on WhatsApp
          </a>
        </div>
      </section>
    </>
  );
}

function TrekPost() {
  const { id } = useParams();
  const { treks } = React.useContext(TrekContext);
  const trek = treks.find((t: any) => t.id === Number(id));

  if (!trek) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-stone-900 mb-4">Trek not found</h2>
          <Link to="/" className="text-brand-600 hover:underline flex items-center justify-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const specificWhatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(`Hi, I want to go for the ${trek.name} trek.`)}`;

  return (
    <div className="pt-20 pb-20 bg-stone-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
        
        <Link to="/" className="inline-flex items-center gap-2 text-stone-500 hover:text-brand-600 mb-6 transition-colors font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to all treks
        </Link>

        {/* Post Header */}
        <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-stone-100 mb-10">
          <div className="h-[400px] w-full relative">
            <img 
              src={trek.image} 
              alt={trek.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-8">
              <div className="flex gap-3 mb-3">
                <span className="bg-brand-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {trek.difficulty}
                </span>
                <span className="bg-white/20 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {trek.duration}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-2">{trek.name}</h1>
              <p className="text-stone-200 text-lg flex items-center gap-2">
                <MapPin className="w-5 h-5" /> {trek.altitude}
              </p>
            </div>
          </div>

          {/* Post Content */}
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row gap-12">
              
              {/* Main Text */}
              <div className="md:w-2/3">
                <h2 className="text-2xl font-bold text-stone-900 mb-6">About the Trek</h2>
                <div className="prose prose-stone max-w-none text-stone-600 leading-relaxed whitespace-pre-line">
                  {trek.content}
                </div>

                <h2 className="text-2xl font-bold text-stone-900 mt-12 mb-6">Brief Itinerary</h2>
                <ul className="space-y-4">
                  {trek.itinerary.map((day, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <div className="bg-brand-100 text-brand-700 w-8 h-8 rounded-full flex items-center justify-center font-bold shrink-0 mt-0.5">
                        {idx + 1}
                      </div>
                      <span className="text-stone-700 font-medium pt-1">{day}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sidebar / Booking Card */}
              <div className="md:w-1/3">
                <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 sticky top-28">
                  <p className="text-sm text-stone-500 font-medium mb-1">Starting from</p>
                  <p className="text-3xl font-bold text-stone-900 mb-6">{trek.price}</p>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <span className="text-stone-500">Duration</span>
                      <span className="font-semibold text-stone-900">{trek.duration}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <span className="text-stone-500">Max Altitude</span>
                      <span className="font-semibold text-stone-900">{trek.altitude}</span>
                    </div>
                    <div className="flex items-center justify-between border-b border-stone-200 pb-3">
                      <span className="text-stone-500">Difficulty</span>
                      <span className="font-semibold text-stone-900">{trek.difficulty}</span>
                    </div>
                  </div>

                  <a 
                    href={specificWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl"
                  >
                    <Phone className="w-5 h-5" />
                    Book on WhatsApp
                  </a>
                  <p className="text-center text-xs text-stone-500 mt-4">
                    Clicking will open WhatsApp with a pre-filled message.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

function Admin() {
  const { treks, updateTrek, addTrek, deleteTrek } = React.useContext(TrekContext);
  const [editingId, setEditingId] = useState<number | string | null>(null);
  const [formData, setFormData] = useState<any>({});

  const handleEdit = (trek: any) => {
    setEditingId(trek.id);
    setFormData(trek);
  };

  const handleSave = () => {
    if (editingId === 'new') {
      addTrek(formData);
    } else {
      updateTrek(editingId as number, formData);
    }
    setEditingId(null);
  };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="pt-24 pb-20 bg-stone-50 min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-stone-900">Manage Treks</h1>
          <button 
            onClick={() => {
              setEditingId('new');
              setFormData({ name: '', duration: '', difficulty: '', altitude: '', price: '', image: '', excerpt: '', content: '', itinerary: [] });
            }}
            className="bg-brand-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-brand-700"
          >
            <Plus className="w-4 h-4" /> Add New Trek
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
          {treks.map((trek: any) => (
            <div key={trek.id} className="border-b border-stone-200 last:border-0 p-6">
              {editingId === trek.id ? (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Price</label>
                      <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Duration</label>
                      <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Difficulty</label>
                      <input type="text" name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
                      <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Excerpt</label>
                      <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" rows={2} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Full Content</label>
                      <textarea name="content" value={formData.content} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" rows={5} />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-brand-600 text-white rounded-lg flex items-center gap-2"><Save className="w-4 h-4" /> Save</button>
                  </div>
                </div>
              ) : (
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={trek.image} alt={trek.name} className="w-16 h-16 rounded-lg object-cover" />
                    <div>
                      <h3 className="font-bold text-lg text-stone-900">{trek.name}</h3>
                      <p className="text-stone-500 text-sm">{trek.duration} • {trek.price}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(trek)} className="p-2 text-stone-400 hover:text-brand-600 hover:bg-brand-50 rounded-lg transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button onClick={() => deleteTrek(trek.id)} className="p-2 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* New Trek Form */}
          {editingId === 'new' && (
            <div className="border-t border-stone-200 p-6 bg-brand-50">
              <h3 className="font-bold text-lg mb-4">Add New Trek</h3>
              <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Name</label>
                      <input type="text" name="name" value={formData.name} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Price</label>
                      <input type="text" name="price" value={formData.price} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Duration</label>
                      <input type="text" name="duration" value={formData.duration} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-stone-700 mb-1">Difficulty</label>
                      <input type="text" name="difficulty" value={formData.difficulty} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Image URL</label>
                      <input type="text" name="image" value={formData.image} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Excerpt</label>
                      <textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" rows={2} />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-stone-700 mb-1">Full Content</label>
                      <textarea name="content" value={formData.content} onChange={handleChange} className="w-full border border-stone-300 rounded-lg p-2" rows={5} />
                    </div>
                  </div>
                  <div className="flex gap-2 justify-end mt-4">
                    <button onClick={() => setEditingId(null)} className="px-4 py-2 text-stone-600 hover:bg-stone-100 rounded-lg">Cancel</button>
                    <button onClick={handleSave} className="px-4 py-2 bg-brand-600 text-white rounded-lg flex items-center gap-2"><Save className="w-4 h-4" /> Save Trek</button>
                  </div>
                </div>
            </div>
          )}
        </div>
        
        <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-xl text-sm">
          <strong>Note:</strong> Currently, changes made here are saved to your browser's Local Storage. This is great for testing! If you want changes to be visible to all visitors on the internet, we will need to connect a database like Firebase.
        </div>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <TrekProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen font-sans text-stone-900 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/trek/:id" element={<TrekPost />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </TrekProvider>
  );
}
