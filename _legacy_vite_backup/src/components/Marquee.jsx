import React, { useState } from 'react';

const partners = [
  { id: 1, name: 'BeautyBliss', logo: 'https://placehold.co/120x60/F0F4F8/3B82F6?text=BeautyBliss' },
  { id: 2, name: 'GlamourCo', logo: 'https://placehold.co/120x60/F0F4F8/EC4899?text=GlamourCo' },
  { id: 3, name: 'Radiant Cosmetics', logo: 'https://placehold.co/120x60/F0F4F8/6366F1?text=RadiantCo' },
  { id: 4, name: 'PureEssence', logo: 'https://placehold.co/120x60/F0F4F8/10B981?text=PureEssence' },
  { id: 5, name: 'LuxeLook', logo: 'https://placehold.co/120x60/F0F4F8/EF4444?text=LuxeLook' },
  { id: 6, name: 'GlowUp Labs', logo: 'https://placehold.co/120x60/F0F4F8/F59E0B?text=GlowUpLabs' },
  { id: 7, name: 'Chic Beauty', logo: 'https://placehold.co/120x60/F0F4F8/8B5CF6?text=ChicBeauty' },
  { id: 8, name: 'Velvet Touch', logo: 'https://placehold.co/120x60/F0F4F8/06B6D4?text=VelvetTouch' },
];

const customerReviews = [
  {
    id: 1,
    name: "Alice Johnson",
    rating: 5,
    review: "The Everyday Glow Box is my absolute favorite! The products are high-quality and perfect for my daily routine. Highly recommend this subscription!",
    avatar: "https://placehold.co/80x80/E0E7FF/4338CA?text=AJ"
  },
  {
    id: 2,
    name: "Brenda Lee",
    rating: 4,
    review: "I love the variety in the Glam Night Out Box. Always something new and exciting to try for special occasions. Great value!",
    avatar: "https://placehold.co/80x80/FCE7F3/EC4899?text=BL"
  },
  {
    id: 3,
    name: "Catherine Davis",
    rating: 5,
    review: "Skincare Infused Makeup is a game-changer! My skin feels amazing, and the makeup looks flawless. So glad I subscribed.",
    avatar: "https://placehold.co/80x80/D1FAE5/10B981?text=CD"
  },
  {
    id: 4,
    name: "David Smith",
    rating: 4,
    review: "The Lash & Brow Perfectors box is fantastic. My brows have never looked better! The tools are professional grade.",
    avatar: "https://placehold.co/80x80/DBEAFE/3B82F6?text=DS"
  },
];

const Marquee = () => {
  const duplicatedPartners = [...partners, ...partners];
  const [email, setEmail] = useState('');

  const handleNewsletterSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      alert(`Subscribed ${email} to the newsletter! (This is a demo)`);
      setEmail('');
    } else {
      alert('Please enter a valid email address.');
    }
  };

  return (
    <>
      {/* Our Trusted Partners Section */}
      <section className="py-16 bg-gradient-to-r from-purple-50 to-indigo-50 font-inter">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 relative">
            Our Trusted Partners
            <span className="block w-24 h-1 bg-indigo-600 mx-auto mt-4 rounded-full"></span>
          </h2>
          <div className="relative w-full overflow-hidden py-6">
            <style>
              {`
              @keyframes marquee {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
              }

              .marquee-container {
                display: flex;
                width: fit-content;
                animation: marquee 30s linear infinite;
              }

              .marquee-item {
                flex-shrink: 0;
                margin: 0 2.5rem;
                display: flex;
                align-items: center;
                justify-content: center;
                height: 70px;
                background-color: #ffffff;
                padding: 0.75rem 1.25rem;
                border-radius: 0.75rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
                transition: transform 0.3s ease, box-shadow 0.3s ease;
              }

              .marquee-item:hover {
                transform: translateY(-5px) scale(1.05);
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
              }

              .marquee-item img {
                max-height: 100%;
                max-width: 100%;
                object-fit: contain;
                filter: grayscale(80%);
                opacity: 0.8;
                transition: filter 0.3s ease, opacity 0.3s ease;
              }

              .marquee-item img:hover {
                filter: grayscale(0%);
                opacity: 1;
              }
              `}
            </style>
            <div className="marquee-container">
              {duplicatedPartners.map((partner, index) => (
                <div key={index} className="marquee-item">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="h-full w-auto"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = `https://placehold.co/120x60/E0E7FF/4338CA?text=${partner.name.replace(/\s/g, '+')}`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews Section */}
      <section className="py-16 bg-white font-inter">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 relative">
            What Our Customers Say
            <span className="block w-24 h-1 bg-pink-600 mx-auto mt-4 rounded-full"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {customerReviews.map((review) => (
              <div key={review.id} className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="w-20 h-20 rounded-full object-cover mb-4 border-4 border-white shadow-md"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/80x80/E0E7FF/4338CA?text=${review.name.split(' ').map(n => n[0]).join('')}`;
                  }}
                />
                <h3 className="text-xl font-bold text-gray-800 mb-2">{review.name}</h3>
                <div className="flex text-yellow-500 mb-3">
                  {'★'.repeat(review.rating)}
                  {'☆'.repeat(5 - review.rating)}
                </div>
                <p className="text-gray-700 text-base italic leading-relaxed">
                  "{review.review}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe to Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-inter">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold mb-6">
            Stay Updated with Our Newsletter
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Get exclusive offers, new product alerts, and beauty tips delivered straight to your inbox!
          </p>
          <form onSubmit={handleNewsletterSubscribe} className="flex flex-col sm:flex-row justify-center items-center gap-4 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Enter your email address"
              className="w-full sm:flex-1 p-4 rounded-lg border-2 border-white bg-white bg-opacity-20 text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent transition-all duration-300"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full sm:w-auto bg-white text-blue-700 py-4 px-8 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export default Marquee;
