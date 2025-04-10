import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Camera, ArrowLeft, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useGalleryImages, type GalleryImage } from './utils/imageLoader';

// Fixed categories
const categories = ["All", "Healthcare", "Education", "Community", "General"];

function Gallery() {
  const { images, loading, error } = useGalleryImages();
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-white text-xl">Loading gallery...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-900 to-green-800 flex items-center justify-center">
        <div className="text-white text-xl">Error loading gallery: {error}</div>
      </div>
    );
  }

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

        {/* Featured Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
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

        {/* Google Drive Embedded Folder */}
        <div className="w-full bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Complete Photo Gallery</h2>
          <div className="relative w-full" style={{ height: '600px' }}>
            <iframe 
              src="https://drive.google.com/embeddedfolderview?id=1CjZH-aBsHTUXDNlsg73WWV_waF-A5JBn#grid" 
              className="absolute inset-0 w-full h-full rounded-lg"
              style={{ border: 'none' }}
              title="Trust Photo Gallery"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-50"
            >
              <X className="w-8 h-8" />
            </button>

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

            {selectedImage !== null && (
              <>
                <img
                  src={images.find(img => img.id === selectedImage)?.image}
                  alt={images.find(img => img.id === selectedImage)?.title}
                  className="max-h-[90vh] max-w-[90vw] object-contain"
                />

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
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;