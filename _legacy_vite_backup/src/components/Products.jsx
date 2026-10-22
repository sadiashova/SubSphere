import React, { useEffect } from 'react';
import { Link, Navigate } from 'react-router'; // Changed to react-router-dom for Navigate
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS CSS

const Products = ({ productData }) => {
  const productsData = productData;

  useEffect(() => {
    AOS.init({
      duration: 1000, // You can change this to control the animation speed
      once: true, // Animation plays only once
    });
  }, []);

  const onViewMore = (id) => {
    <Navigate to='/details/id'></Navigate>
    // Note: The Navigate component should be used within a React Router context.
    // This function will not trigger a navigation on its own.
    // The Link component you already have around the button is the correct way for navigation.
  }

  return (
    <section className="py-16 bg-gray-50 font-inter">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
          Our Subscription Services
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productsData.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
              data-aos="fade-up" // AOS animation applied here
              data-aos-anchor-placement="center-bottom" // Optional: Adjust when the animation triggers
            >
              <img
                src={product.thumbnail}
                alt={product.name}
                className="w-full h-48 object-cover object-center"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = `https://placehold.co/400x300/E0E7FF/4338CA?text=No+Image`;
                }}
              />
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h3>
                <p className="text-sm text-indigo-600 font-semibold mb-2">
                  {product.tech_category}
                </p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-3xl font-extrabold text-gray-900">
                    ${product.price}
                  </span>
                  <span className="text-md text-gray-600">
                    per {product.frequency}
                  </span>
                </div>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  {product.description}
                </p>
              <Link to={`/details/${product.id}`}>
                <button className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                >
                  View More
                </button>
              </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;