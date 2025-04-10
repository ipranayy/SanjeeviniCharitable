import { useState } from 'react';

export interface SliderImage {
  id: number;
  image: string;
  title: string;
  caption: string;
  showContent: boolean;
}

const defaultSlides: SliderImage[] = [
  {
    id: 1,
    image: "https://cdn.jsdelivr.net/gh/ipranayy/SanjeeviniCharitable/slider%20images/slider1_1920x1080.jpg",
    title: "Serving with Compassion",
    caption: "Transforming lives through dedicated healthcare and community service",
    showContent: true
  },
  {
    id: 2,
    image: "https://cdn.jsdelivr.net/gh/ipranayy/SanjeeviniCharitable/slider%20images/slider2_1920x1080.jpg",
    title: "Building Communities",
    caption: "Creating sustainable change through collective action",
    showContent: true
  },
  {
    id: 3,
    image: "https://cdn.jsdelivr.net/gh/ipranayy/SanjeeviniCharitable/slider%20images/slider3_1920x1080.jpg",
    title: "Support Our Cause",
    caption: "Help us make a difference",
    showContent: false
  }
];

export const useSliderImages = () => {
  const [slides] = useState<SliderImage[]>(defaultSlides);
  const [loading] = useState(false);
  const [error] = useState<string | null>(null);

  return { slides, loading, error };
};