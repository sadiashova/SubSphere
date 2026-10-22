import React from 'react';

const faqData = [
  {
    question: "What makes your beauty box unique?",
    answer: "Our beauty box stands out with its hyper-personalized curation, focusing on clean beauty, trending innovations, and exclusive access to indie brands. We tailor each product to your detailed beauty profile, ensuring every item is a delightful discovery."
  },
  {
    question: "How do you select the products?",
    answer: "Our expert team meticulously researches and tests products from around the globe, prioritizing ethical sourcing, high-quality ingredients, and proven effectiveness. We partner directly with brands that align with our values of sustainability and innovation."
  },
  {
    question: "Can I choose my products?",
    answer: "Absolutely! While we love to surprise you, many of our subscription tiers offer customization options, allowing you to select a few items each month based on your preferences. You can also update your beauty profile anytime to refine your future boxes."
  },
  {
    question: "What if I have sensitive skin or allergies?",
    answer: "Your safety is our priority. Our beauty profile questionnaire includes detailed sections for skin sensitivities and allergies. We strive to select products that avoid known irritants based on your input, and all ingredients are listed on our product pages."
  },
  {
    question: "How flexible are the subscription plans?",
    answer: "We offer monthly, quarterly, and annual subscription plans designed for your convenience. You can easily pause, skip a month, or cancel your subscription anytime through your online account dashboard, without any hidden fees or long-term commitments."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Currently, we ship within Bangladesh only. We are actively working to expand our shipping capabilities to bring our curated beauty boxes to more customers worldwide. Stay tuned for updates!"
  }
];

const blogPosts = [
  {
    id: 1,
    title: "5 Must-Have Skincare Ingredients for Radiant Skin",
    description: "Unlock your glow with these powerhouse ingredients that dermatologists swear by. From hyaluronic acid to vitamin C, discover what your skin truly needs.",
    image: "https://placehold.co/400x250/E0E7FF/4338CA?text=Skincare+Tips",
    date: "May 25, 2024"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Choosing Your Perfect Foundation Shade",
    description: "Finding your ideal foundation can be tricky. Our comprehensive guide simplifies the process, ensuring a flawless match every time.",
    image: "https://placehold.co/400x250/FCE7F3/EC4899?text=Foundation+Guide",
    date: "May 20, 2024"
  },
  {
    id: 3,
    title: "Spring Beauty Trends: What's Hot This Season?",
    description: "Dive into the latest spring beauty trends, from pastel eyeshadows to dewy finishes. Get ready to refresh your look with our top picks.",
    image: "https://placehold.co/400x250/D1FAE5/10B981?text=Spring+Trends",
    date: "May 15, 2024"
  },
  {
    id: 4,
    title: "Beyond the Brush: Essential Makeup Tools You Need",
    description: "Elevate your makeup application with our guide to essential tools. Discover brushes, sponges, and gadgets that make a difference.",
    image: "https://placehold.co/400x250/DBEAFE/3B82F6?text=Makeup+Tools",
    date: "May 10, 2024"
  }
];

const Blog = () => {
  return (
    <div className="font-inter bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-100 to-pink-100 py-20 px-4 text-center shadow-inner">
        <h2 className="text-5xl md:text-6xl font-extrabold text-purple-800 leading-tight mb-4 animate-fade-in-down">
          Beauty Insights & Inspiration
        </h2>
        <p className="mt-6 text-lg md:text-2xl text-purple-700 max-w-4xl mx-auto font-medium opacity-0 animate-fade-in delay-300">
          Explore our blog for expert tips, trending products, and all things beauty. Your journey to radiant skin and flawless makeup starts here.
        </p>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 relative">
            Latest Blog Posts
            <span className="block w-24 h-1 bg-pink-600 mx-auto mt-4 rounded-full"></span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover object-center"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = `https://placehold.co/400x250/E0E7FF/4338CA?text=Blog+Image`;
                  }}
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-3">{post.date}</p>
                  <p className="text-gray-700 text-base mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <a
                    href="#" // Placeholder for actual blog post link
                    className="inline-flex items-center text-indigo-600 font-semibold hover:text-indigo-800 transition-colors duration-200"
                  >
                    Read More
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-100">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12 relative">
            Frequently Asked Questions
            <span className="block w-24 h-1 bg-purple-600 mx-auto mt-4 rounded-full"></span>
          </h2>

          <div className="space-y-4">
            {faqData.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <input type="checkbox" id={`faq-${index}`} className="hidden peer" defaultChecked={index === 0} />
                <label
                  htmlFor={`faq-${index}`}
                  className="flex justify-between items-center p-5 cursor-pointer text-lg font-semibold text-gray-800 bg-gray-50 hover:bg-gray-100 transition-colors duration-200 rounded-t-xl peer-checked:rounded-b-none"
                >
                  {faq.question}
                  <svg className="w-6 h-6 transform transition-transform duration-200 peer-checked:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </label>
                <div className="max-h-0 overflow-hidden transition-all duration-300 ease-in-out peer-checked:max-h-screen">
                  <div className="p-5 border-t border-gray-200 text-gray-700 text-base leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Animations for Hero Section */}
      <style>
        {`
        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in-down {
          animation: fadeInDown 1s ease-out forwards;
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }
        `}
      </style>
    </div>
  );
};

export default Blog;
