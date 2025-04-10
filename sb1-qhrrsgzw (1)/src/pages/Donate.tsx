import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';

export default function Donate() {
  React.useEffect(() => {
    const form = document.createElement('form');
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
    script.setAttribute('data-payment_button_id', 'pl_QHPuqZ6EZRmMrr');
    script.async = true;
    
    form.appendChild(script);
    
    const container = document.getElementById('razorpay-container');
    if (container) {
      container.innerHTML = '';
      container.appendChild(form);
    }

    return () => {
      if (container) {
        container.innerHTML = '';
      }
    };
  }, []);

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

      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <Heart className="w-16 h-16 text-green-200 mx-auto mb-6 animate-float" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 font-playfair">
            Support Our Cause
          </h1>
          <p className="text-lg md:text-xl text-green-100 mb-12 max-w-2xl mx-auto">
            Your contribution helps us continue our mission of serving communities through healthcare and education initiatives
          </p>

          {/* Impact Statistics */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">1000+</div>
              <div className="text-green-200">Lives Impacted</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">50+</div>
              <div className="text-green-200">Medical Camps</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="text-3xl font-bold text-white mb-2">20+</div>
              <div className="text-green-200">Communities Served</div>
            </div>
          </div>

          {/* Donation Button */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">Make a Donation</h2>
            <p className="text-green-100 mb-8">
              Every contribution, no matter how small, makes a difference in someone's life
            </p>
            <div id="razorpay-container" className="flex justify-center"></div>
          </div>

          {/* Additional Information */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
              <h3 className="text-xl font-semibold text-white mb-4">Where Your Money Goes</h3>
              <ul className="text-green-100 space-y-2">
                <li>• Medical supplies and equipment</li>
                <li>• Educational materials and resources</li>
                <li>• Community development programs</li>
                <li>• Healthcare initiatives</li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-left">
              <h3 className="text-xl font-semibold text-white mb-4">Tax Benefits</h3>
              <p className="text-green-100">
                All donations are eligible for tax deduction under Section 80G of the Income Tax Act. You will receive a donation receipt for tax purposes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}