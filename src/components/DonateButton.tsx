import React from 'react';

declare global {
  interface Window {
    Razorpay: any;
  }
}

interface DonateButtonProps {
  className?: string;
}

const DonateButton: React.FC<DonateButtonProps> = ({ className }) => {
  const loadRazorpay = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const handleDonate = async () => {
    await loadRazorpay();

    const options = {
      key: 'YOUR_RAZORPAY_KEY', // Replace with your actual Razorpay key
      amount: 100 * 100, // Amount in paise (e.g., 100 rupees = 10000 paise)
      currency: 'INR',
      name: 'Sanjeevini Charitable Trust',
      description: 'Donation',
      image: 'https://raw.githubusercontent.com/sanjeevini-trust/sanjeevini-trust.github.io/main/images/logo.jpg',
      handler: function(response: any) {
        // Handle successful payment
        console.log('Payment successful:', response);
        alert('Thank you for your donation!');
      },
      prefill: {
        name: '',
        email: '',
        contact: ''
      },
      theme: {
        color: '#16a34a'
      }
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <button
      onClick={handleDonate}
      className={className || "bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"}
    >
      Donate Now
    </button>
  );
};

export default DonateButton;