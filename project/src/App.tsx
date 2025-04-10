import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, Facebook, Instagram, Twitter, ChevronLeft, ChevronRight, Heart, Calendar, Users, Camera, HeartHandshake as HeartHand, Send } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSliderImages } from './utils/sliderLoader';
import DonateButton from './components/DonateButton';
import VolunteerForm from './components/VolunteerForm';
import LegalCompliance from './components/LegalCompliance';

const events = [
  {
    id: 1,
    title: 'Medical Camp',
    date: '2024-03-15',
    description: 'Free medical checkup camp for the local community.',
    image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    title: 'Education Workshop',
    date: '2024-04-20',
    description: 'Workshop on improving education standards in rural areas.',
    image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    title: 'Community Clean-up',
    date: '2024-05-10',
    description: 'Join us for a community clean-up drive.',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80'
  }
];

export const galleryImages = [
  "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80"
];

function App() {
  const { slides, loading, error } = useSliderImages();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  const aboutRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const volunteerRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          const isScrollingDown = currentScrollY > lastScrollY;
          
          if (isScrollingDown !== prevScrollPos > currentScrollY) {
            setVisible(!isScrollingDown);
          }
          
          setPrevScrollPos(currentScrollY);
          lastScrollY = currentScrollY;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1 }
    );

    const refs = [aboutRef, eventsRef, galleryRef, volunteerRef, contactRef];
    refs.forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      refs.forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Top Info Bar */}
      <div className="bg-green-900 text-white py-2 px-4 h-10 fixed w-full top-0 z-50">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+919880798085" className="flex items-center hover:text-green-200">
              <Phone size={16} className="mr-2" />
              <span>+91 98807 98085</span>
            </a>
            <a href="mailto:sanjeevinicharitabletrusts@gmail.com" className="flex items-center hover:text-green-200">
              <Mail size={16} className="mr-2" />
              <span>sanjeevinicharitabletrusts@gmail.com</span>
            </a>
          </div>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com/p/Sanjeevini-Charitable-Trust-100064478990400/" target="_blank" rel="noopener noreferrer" className="hover:text-green-200">
              <Facebook size={18} />
            </a>
            <a href="#" className="hover:text-green-200"><Instagram size={18} /></a>
            <a href="#" className="hover:text-green-200"><Twitter size={18} /></a>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav 
        className={`fixed w-full bg-white shadow-md z-40 transition-transform duration-300 ${
          visible ? 'translate-y-10' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-20">
            <div className="text-2xl font-bold text-green-800 font-playfair">Sanjeevini Trust</div>
            <div className="hidden md:flex items-center space-x-12">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: '#about-us' },
                { name: 'Events', path: '#events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Legal', path: '#legal' },
                { name: 'Volunteer', path: '#volunteer' },
                { name: 'Contact Us', path: '#contact-us' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="text-gray-700 hover:text-green-700 transition-colors font-medium font-playfair"
                >
                  {item.name}
                </Link>
              ))}
              <DonateButton variant="header" />
            </div>
            <button className="md:hidden">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Add a spacer to prevent content from jumping */}
      <div className="h-[120px]"></div>

      {/* Hero Carousel */}
      <div className="relative h-[600px] md:h-[700px] overflow-hidden -mt-[60px]">
        {error && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-900">
            <p className="text-white text-xl">Error loading images. Please try again later.</p>
          </div>
        )}
        
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center bg-green-900">
            <p className="text-white text-xl">Loading...</p>
          </div>
        )}

        {!loading && !error && slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <div
              className="absolute inset-0 bg-center bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${slide.image})`,
                backgroundPosition: 'center 25%'
              }}
            >
              <div className="absolute inset-0 bg-black bg-opacity-40" />
            </div>
            <div className="relative h-full flex items-center justify-center text-center text-white px-4">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 transform transition-all duration-700 delay-300">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto transform transition-all duration-700 delay-500">{slide.caption}</p>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
        >
          <ChevronLeft className="text-white" size={24} />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/30 hover:bg-white/50 rounded-full p-2 transition-colors"
        >
          <ChevronRight className="text-white" size={24} />
        </button>
      </div>

      {/* About Us Section */}
      <section ref={aboutRef} id="about-us" className="py-16 bg-pattern-1 slide-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Heart className="w-12 h-12 text-green-600 mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">About Us</h2>
            <p className="text-lg text-white mb-8">
              Sanjeevini Charitable Trust is dedicated to serving communities through healthcare initiatives and social development programs. Founded in 2010, we have touched thousands of lives through our commitment to creating positive change.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md transform transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-white mb-3">Our Mission</h3>
                <p className="text-white">To provide accessible healthcare and education to underserved communities</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md transform transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-white mb-3">Our Vision</h3>
                <p className="text-white">A world where every individual has access to quality healthcare and education</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md transform transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-white mb-3">Our Values</h3>
                <p className="text-white">Compassion, Integrity, and Dedication to service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section ref={eventsRef} id="events" className="py-16 bg-pattern-2 slide-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Calendar className="w-12 h-12 text-white mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Upcoming Events</h2>
            <p className="text-lg text-white mb-8">Join us in making a difference</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {events.map((event) => (
              <div key={event.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-md transition-all duration-500 hover:shadow-xl transform hover:-translate-y-2">
                <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                  <p className="text-green-200 mb-2">{event.date}</p>
                  <p className="text-white mb-4">{event.description}</p>
                  <button className="text-green-200 hover:text-white font-semibold transition-colors">Learn More →</button>
                </div>
              </div>
            ))}
          </div>

          <div className="w-full max-w-6xl mx-auto mt-12 bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg slide-in">
            <div className="relative w-full" style={{ paddingBottom: "75%" }}>
              <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23ffffff&ctz=Asia%2FKolkata&showTitle=0&showNav=1&showDate=1&showPrint=0&showTabs=1&showCalendars=0&src=sanjeevinicharitabletrusts%40gmail.com"
                style={{ border: 0 }}
                className="absolute top-0 left-0 w-full h-full rounded-lg bg-white"
                frameBorder="0"
                scrolling="no"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} id="gallery" className="py-16 bg-pattern-1 slide-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Camera className="w-12 h-12 text-white mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Gallery</h2>
            <p className="text-lg text-white mb-8">Moments of impact and transformation</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {galleryImages.map((image, index) => (
              <div key={index} className="relative overflow-hidden rounded-lg aspect-square group">
                <img
                  src={image}
                  alt={`Gallery image ${index + 1}`}
                  className="absolute top-0 left-0 w-full h-full object-cover transition-all duration-700 transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity duration-300"></div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              View More Photos
            </Link>
          </div>
        </div>
      </section>

      {/* Legal & Compliance Section */}
      <LegalCompliance />

      {/* Volunteer Section */}
      <section ref={volunteerRef} id="volunteer" className="py-16 bg-pattern-2 slide-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Users className="w-12 h-12 text-white mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Volunteer With Us</h2>
            <p className="text-lg text-white mb-8">Join our community of change-makers</p>
            <button
              onClick={() => setShowVolunteerForm(true)}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
            >
              Sign Up as Volunteer
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12">
            <div className="text-center transform transition-all duration-500 hover:-translate-y-2">
              <HeartHand className="w-12 h-12 text-white mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-semibold text-white mb-2">Make an Impact</h3>
              <p className="text-white">Help us create positive change in communities</p>
            </div>
            <div className="text-center transform transition-all duration-500 hover:-translate-y-2">
              <Users className="w-12 h-12 text-white mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-semibold text-white mb-2">Join the Team</h3>
              <p className="text-white">Become part of our dedicated volunteer network</p>
            </div>
            <div className="text-center transform transition-all duration-500 hover:-translate-y-2">
              <Heart className="w-12 h-12 text-white mx-auto mb-4 animate-float" />
              <h3 className="text-xl font-semibold text-white mb-2">Share Love</h3>
              <p className="text-white">Spread compassion and kindness in society</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section ref={contactRef} id="contact-us" className="py-16 bg-pattern-1 slide-in">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Send className="w-12 h-12 text-white mx-auto mb-6 animate-float" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Contact Us</h2>
            <p className="text-lg text-white">Get in touch with us</p>
          </div>
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="transform transition-all duration-500 hover:-translate-y-1">
                <label htmlFor="name" className="block text-sm font-medium text-white mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md focus:ring-green-500 focus:border-green-500 text-white transition-all duration-300"
                  required
                />
              </div>
              <div className="transform transition-all duration-500 hover:-translate-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-white mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md focus:ring-green-500 focus:border-green-500 text-white transition-all duration-300"
                  required
                />
              </div>
              <div className="transform transition-all duration-500 hover:-translate-y-1">
                <label htmlFor="message" className="block text-sm font-medium text-white mb-1">Message</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-md focus:ring-green-500 focus:border-green-500 text-white transition-all duration-300"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-md transition-all duration-300 transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 font-playfair">Sanjeevini Trust</h3>
              <p className="text-green-100 mb-6">Dedicated to serving humanity through healthcare and education initiatives.</p>
              <DonateButton className="w-full" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 font-playfair">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about-us" className="text-green-100 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#events" className="text-green-100 hover:text-white transition-colors">Events</a></li>
                <li><a href="#volunteer" className="text-green-100 hover:text-white transition-colors">Volunteer</a></li>
                <li><a href="#contact-us" className="text-green-100 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 font-playfair">Contact Info</h3>
              <div className="space-y-2 text-green-100">
                <p className="flex items-center">
                  <Phone size={16} className="mr-2" /> +91 98807 98085
                </p>
                <p className="flex items-center">
                  <Mail size={16} className="mr-2" /> sanjeevinicharitabletrusts@gmail.com
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 font-playfair">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/p/Sanjeevini-Charitable-Trust-100064478990400/" target="_blank" rel="noopener noreferrer" className="text-green-100 hover:text-white transition-colors">
                  <Facebook size={24} />
                </a>
                <a href="#" className="text-green-100 hover:text-white transition-colors">
                  <Instagram size={24} />
                </a>
                <a href="#" className="text-green-100 hover:text-white transition-colors">
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-100">
            <p>&copy; 2024 Sanjeevini Charitable Trust. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {showVolunteerForm && <VolunteerForm onClose={() => setShowVolunteerForm(false)} />}
    </div>
  );
}

export default App;