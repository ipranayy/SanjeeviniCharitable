import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, Facebook, Instagram, Twitter, ChevronLeft, ChevronRight, Heart, Calendar, Users, Camera, HeartHandshake as HeartHand, Send, X } from 'lucide-react';
import VolunteerForm from './components/VolunteerForm';
import DonateButton from './components/DonateButton';

const slides = [
  {
    id: 1,
    image: "https://raw.githubusercontent.com/sanjeevini-trust/sanjeevini-trust.github.io/main/images/logo.jpg",
    title: "Sanjeevini Charitable Trust",
    caption: "Serving humanity through healthcare, education, and food aid since 1998"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=2000&q=80",
    title: "Healthcare for All",
    caption: "Providing accessible medical care to underserved communities"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=2000&q=80",
    title: "Education Initiative",
    caption: "Empowering through quality education and learning resources"
  }
];

const events = [
  {
    id: 1,
    title: "Medical Camp 2024",
    date: "March 15, 2024",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
    description: "Free health checkups, consultations, and medicine distribution"
  },
  {
    id: 2,
    title: "Education Support Drive",
    date: "April 1, 2024",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80",
    description: "Distribution of educational materials and scholarships"
  },
  {
    id: 3,
    title: "Food Distribution Program",
    date: "April 15, 2024",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
    description: "Monthly food aid distribution to families in need"
  }
];

const galleryImages = [
  "https://images.unsplash.com/photo-1509099836639-18ba1795216d?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=800&q=80"
];

function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [showVolunteerForm, setShowVolunteerForm] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const aboutRef = useRef<HTMLElement>(null);
  const eventsRef = useRef<HTMLElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const volunteerRef = useRef<HTMLElement>(null);
  const contactRef = useRef<HTMLElement>(null);

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

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    closeMobileMenu();
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

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
      <div className="bg-green-900 text-white py-2 px-4">
        <div className="container mx-auto flex flex-wrap justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <a href="tel:+919880798085" className="flex items-center hover:text-green-200">
              <Phone size={16} className="mr-2" />
              <span>+91 98807 98085</span>
            </a>
            <a href="mailto:sanjeevinicharitabletrusts@gmail.com" className="hidden md:flex items-center hover:text-green-200">
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
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="text-xl font-bold text-green-800">Sanjeevini Trust</Link>
            <div className="hidden md:flex space-x-8">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: 'about-us' },
                { name: 'Events', path: 'events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Volunteer', path: 'volunteer' },
                { name: 'Contact Us', path: 'contact-us' }
              ].map((item) => (
                item.path.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.path)}
                    className="text-gray-700 hover:text-green-700 transition-colors"
                  >
                    {item.name}
                  </button>
                )
              ))}
            </div>
            <button 
              className="md:hidden p-2"
              onClick={toggleMobileMenu}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-green-800" />
              ) : (
                <svg className="w-6 h-6 text-green-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}>
            <div className="py-4 space-y-2">
              {[
                { name: 'Home', path: '/' },
                { name: 'About Us', path: 'about-us' },
                { name: 'Events', path: 'events' },
                { name: 'Gallery', path: '/gallery' },
                { name: 'Volunteer', path: 'volunteer' },
                { name: 'Contact Us', path: 'contact-us' }
              ].map((item) => (
                item.path.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                    onClick={closeMobileMenu}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.path)}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                  >
                    {item.name}
                  </button>
                )
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Carousel */}
      <div id="home" className="relative h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute top-0 left-0 w-full h-full transition-all duration-700 ${
              index === currentSlide ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transform scale-105 transition-transform duration-3000"
              style={{ 
                backgroundImage: `url(${slide.image})`,
                backgroundSize: index === 0 ? 'contain' : 'cover',
                backgroundColor: index === 0 ? '#ffffff' : 'transparent',
                backgroundRepeat: 'no-repeat'
              }}
            >
              {index !== 0 && <div className="absolute inset-0 bg-black bg-opacity-40" />}
            </div>
            <div className={`relative h-full flex items-center justify-center text-center px-4 ${index === 0 ? 'text-green-800' : 'text-white'}`}>
              <div className={index === 0 ? 'bg-white/80 p-8 rounded-lg backdrop-blur-sm' : ''}>
                <h1 className="text-4xl md:text-6xl font-bold mb-4 transform transition-all duration-700 delay-300">{slide.title}</h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto transform transition-all duration-700 delay-500">{slide.caption}</p>
                <DonateButton />
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
              Sanjeevini Charitable Trust is dedicated to serving communities through three core pillars: healthcare accessibility, educational support, and food security. Since our founding, we have touched thousands of lives through our commitment to these essential services.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md transform transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-white mb-3">Healthcare</h3>
                <p className="text-white">Free medical camps, health checkups, and medicine distribution to those in need</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md transform transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-white mb-3">Education</h3>
                <p className="text-white">Supporting underprivileged students with resources and scholarships</p>
              </div>
              <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-md transform transition-all duration-500 hover:-translate-y-2">
                <h3 className="text-xl font-semibold text-white mb-3">Food Aid</h3>
                <p className="text-white">Regular food distribution programs to support families in need</p>
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
          
          {/* Events Grid */}
          <div className="grid md:grid-cols-3 gap-8">
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

          {/* Image Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            {galleryImages.slice(0, 6).map((image, index) => (
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

          {/* View More Button */}
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
        {showVolunteerForm && <VolunteerForm onClose={() => setShowVolunteerForm(false)} />}
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
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Sanjeevini Trust</h3>
              <p className="text-green-100">Dedicated to serving humanity through healthcare and education initiatives.</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><a href="#about-us" className="text-green-100 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#events" className="text-green-100 hover:text-white transition-colors">Events</a></li>
                <li><a href="#volunteer" className="text-green-100 hover:text-white transition-colors">Volunteer</a></li>
                <li><a href="#contact-us" className="text-green-100 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
              <div className="space-y-2 text-green-100">
                <p className="flex items-center">
                  <Phone size={16} className="mr-2" /> +91 98807 98085
                </p>
                <p className="flex items-center">
                  <Mail size={16} className="mr-2" /> sanjeevinicharitabletrusts@gmail.com
                </p>
                <div className="flex items-center mt-4">
                  <a 
                    href="https://www.facebook.com/p/Sanjeevini-Charitable-Trust-100064478990400/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-green-100 hover:text-white transition-colors flex items-center"
                  >
                    <Facebook size={16} className="mr-2" /> Follow us on Facebook
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-green-800 mt-8 pt-8 text-center text-green-100">
            <p>&copy; 2024 Sanjeevini Charitable Trust. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;