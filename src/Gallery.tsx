import React, { useState } from 'react';
import { Camera, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const images = [
  {
    id: 1,
    title: "Health Camp Services",
    description: "Providing essential healthcare services to communities",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 2,
    title: "Education Initiative",
    description: "Supporting education for underprivileged children",
    category: "Education",
    image: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 3,
    title: "Community Outreach",
    description: "Engaging with local communities for sustainable development",
    category: "Community",
    image: "https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 4,
    title: "Medical Camp",
    description: "Free medical checkups and consultations",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 5,
    title: "Food Distribution",
    description: "Providing nutritional support to those in need",
    category: "Community",
    image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 6,
    title: "Senior Care Program",
    description: "Supporting elderly community members",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 7,
    title: "Youth Development",
    description: "Empowering young minds through education",
    category: "Education",
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 8,
    title: "Community Garden",
    description: "Sustainable farming initiatives",
    category: "Community",
    image: "https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=1200&q=80"
  },
  {
    id: 9,
    title: "Dental Camp",
    description: "Free dental checkups and treatments",
    category: "Healthcare",
    image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
  }
];

const categories = ["All", "Healthcare", "Education", "Community"];

function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const filteredImages = selectedCategory === "All"
    ? images
    : images.filter(img => img.category === selectedCategory);

  const handlePrevImage = () => {
    if (selectedImage === null) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex].id);
  };

  const handleNextImage = () => {
    if (selectedImage === null) return;
    const currentIndex = images.findIndex(img => img.id === selectedImage);
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex].id);
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (selectedImage === null) return;
    if (e.key === 'ArrowLeft') handlePrevImage();
    if (e.key === 'ArrowRight') handleNextImage();
    if (e.key === 'Escape') setSelectedImage(null);
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800">
      {/* Navigation */}
      <nav className="bg-green-900/90 backdrop-blur-sm sticky top-0 z-40 border-b border-green-800/50">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center text-white hover:text-green-200 transition-colors"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <Camera className="w-16 h-16 text-green-200 mx-auto mb-6 animate-float" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair">
            Our Impact Gallery
          </h1>
          <p className="text-lg md:text-xl text-green-100/90 mb-12 max-w-2xl mx-auto">
            A visual journey through our community service initiatives and healthcare programs
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-6 py-2 rounded-full transition-all duration-300 transform
                  ${selectedCategory === category 
                    ? 'bg-green-500 text-white scale-105 shadow-lg' 
                    : 'bg-green-800/50 text-green-100 hover:bg-green-700/50'}
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {filteredImages.map((image) => (
            <div
              key={image.id}
              onClick={() => setSelectedImage(image.id)}
              className="group relative overflow-hidden rounded-xl aspect-square cursor-pointer transform transition-all duration-500 hover:-translate-y-2"
            >
              <img
                src={image.image}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-bold text-white mb-2">{image.title}</h3>
                  <p className="text-green-100 text-sm mb-3">{image.description}</p>
                  <span className="inline-block px-3 py-1 bg-green-500/80 rounded-full text-sm text-white">
                    {image.category}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevImage}
              className="absolute left-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button
              onClick={handleNextImage}
              className="absolute right-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            {/* Image */}
            <img
              src={images.find(img => img.id === selectedImage)?.image}
              alt={images.find(img => img.id === selectedImage)?.title}
              className="max-h-[90vh] max-w-[90vw] object-contain"
            />

            {/* Image info */}
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
              <div className="container mx-auto">
                <h3 className="text-xl font-bold text-white mb-2">
                  {images.find(img => img.id === selectedImage)?.title}
                </h3>
                <p className="text-green-100">
                  {images.find(img => img.id === selectedImage)?.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;