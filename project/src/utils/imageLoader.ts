import { useState, useEffect } from 'react';

export interface GalleryImage {
  id: number;
  title: string;
  description: string;
  category: string;
  image: string;
}

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    title: "Medical Camp 2024",
    description: "Free medical checkup and consultation camp",
    category: "Healthcare",
    image: "https://cdn.jsdelivr.net/gh/ipranayy/SanjeeviniCharitable/slider%20images/slider1_1920x1080.jpg"
  },
  {
    id: 2,
    title: "Education Initiative",
    description: "Supporting children's education in rural areas",
    category: "Education",
    image: "https://cdn.jsdelivr.net/gh/ipranayy/SanjeeviniCharitable/slider%20images/slider2_1920x1080.jpg"
  },
  {
    id: 3,
    title: "Community Service",
    description: "Working together for a better tomorrow",
    category: "Community",
    image: "https://cdn.jsdelivr.net/gh/ipranayy/SanjeeviniCharitable/slider%20images/slider3_1920x1080.jpg"
  }
];

export const useGalleryImages = () => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setImages(galleryImages);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return { images, loading, error };
};