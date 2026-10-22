import React, { useState, useEffect } from 'react';
import { useLoaderData, useParams } from 'react-router'; // Ensure react-router-dom is imported

// Placeholder for a toast/sweet alert function
const showMessage = (type, message) => {
    console.log(`${type.toUpperCase()}: ${message}`);
    setTimeout(() => {
        alert(`${type.toUpperCase()}: ${message}`);
    }, 0);
};

const ProductDetails = () => {
    const { id } = useParams();
    const productsData = useLoaderData(); // Renamed 'data' to 'productsData' for clarity

    // Use .find() to get a single product object, not an array
    // Convert id to integer for comparison if your product IDs are numbers
    const product = productsData.find(d => d.id === parseInt(id));

    // Re-enabled state for review functionality
    const [reviewText, setReviewText] = useState('');
    const [rating, setRating] = useState('');
    const [submittedReviews, setSubmittedReviews] = useState([
        // Initial dummy reviews for display
        {
            id: 1,
            text: "Absolutely love the Everyday Glow Box! The products are perfect for my daily routine and feel so light on my skin. Highly recommend!",
            rating: 5.0,
            timestamp: "May 20, 2024, 10:30 AM",
            user: "BeautyLover22"
        },
        {
            id: 2,
            text: "Good selection of products, especially the mascara. The lip tint was a bit too subtle for my taste, but overall a solid box.",
            rating: 4.0,
            timestamp: "May 18, 2024, 03:15 PM",
            user: "MakeupFanatic"
        }
    ]);

    // Handle review submission
    const handleSubmitReview = (e) => {
        e.preventDefault();

        const parsedRating = parseFloat(rating);

        // Basic validation
        if (!reviewText.trim() || isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
            showMessage('error', 'Please enter a review and a rating between 1 and 5.');
            return;
        }

        const newReview = {
            id: submittedReviews.length + 1, // Simple ID generation
            text: reviewText.trim(),
            rating: parsedRating,
            timestamp: new Date().toLocaleString(),
            user: "Current User" // Placeholder for actual user name
        };

        setSubmittedReviews([...submittedReviews, newReview]);
        showMessage('success', 'Your review has been submitted!');
        setReviewText('');
        setRating('');
    };

    // Handle Subscribe Now button click
    const handleSubscribeNow = () => {
        showMessage('info', `Attempting to subscribe to ${product.name}!`);
        // In a real application, you would add logic here to:
        // 1. Check user authentication
        // 2. Redirect to a checkout/subscription confirmation page
        // 3. Potentially interact with a backend API to initiate subscription
    };

    // If product is not found, display a message
    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <p className="text-lg text-gray-700">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 font-inter py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Product Banner */}
                <div className="relative h-64 sm:h-80 lg:h-96 w-full">
                    <img
                        src={product.banner}
                        alt={`${product.name} Banner`}
                        className="w-full h-full object-cover object-center"
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://placehold.co/1200x400/E0E7FF/4338CA?text=Product+Banner`;
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60"></div>
                    <h1 className="absolute bottom-4 left-4 text-white text-4xl sm:text-5xl lg:text-6xl font-extrabold drop-shadow-lg">
                        {product.name}
                    </h1>
                </div>

                <div className="p-6 sm:p-8 lg:p-10">
                    {/* Product Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Overview
                            </h2>
                            <p className="text-gray-700 text-lg leading-relaxed mb-6">
                                {product.description}
                            </p>
                            <div className="space-y-3">
                                <p className="text-gray-800 text-lg">
                                    <span className="font-semibold">Category:</span>{" "}
                                    {product.tech_category}
                                </p>
                                <p className="text-gray-800 text-lg">
                                    <span className="font-semibold">Price:</span> $
                                    {product.price}
                                </p>
                                <p className="text-gray-800 text-lg">
                                    <span className="font-semibold">Frequency:</span>{" "}
                                    {product.frequency}
                                </p>
                                <p className="text-gray-800 text-lg">
                                    <span className="font-semibold">Rating:</span>{" "}
                                    {product.ratings} / 5 ({product.number_of_reviews} reviews)
                                </p>
                            </div>
                            {/* Subscribe Now Button */}
                            <button
                                onClick={handleSubscribeNow}
                                className="mt-8 w-full md:w-auto bg-green-600 text-white py-3 px-8 rounded-lg font-semibold text-xl hover:bg-green-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75"
                            >
                                Subscribe Now
                            </button>
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">
                                Key Features
                            </h2>
                            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
                                {product.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                            <h2 className="text-3xl font-bold text-gray-900 mt-8 mb-4">
                                Subscription Benefits
                            </h2>
                            <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
                                {product.subscription_benefits.map((benefit, index) => (
                                    <li key={index}>{benefit}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Review Section */}
                    <div className="border-t border-gray-200 pt-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-8">
                            Customer Reviews
                        </h2>

                        {/* Review Submission Form */}
                        <form onSubmit={handleSubmitReview} className="bg-gray-50 p-6 rounded-lg shadow-md mb-8">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                                Add Your Review
                            </h3>
                            <div className="mb-4">
                                <label
                                    htmlFor="review"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Your Review
                                </label>
                                <textarea
                                    id="review"
                                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    rows="4"
                                    placeholder="Share your thoughts on this subscription box..."
                                    value={reviewText}
                                    onChange={(e) => setReviewText(e.target.value)}
                                ></textarea>
                            </div>
                            <div className="mb-6">
                                <label
                                    htmlFor="rating"
                                    className="block text-gray-700 text-sm font-bold mb-2"
                                >
                                    Rating (1-5)
                                </label>
                                <input
                                    type="number"
                                    id="rating"
                                    className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                    min="1"
                                    max="5"
                                    step="0.1"
                                    placeholder="e.g., 4.5"
                                    value={rating}
                                    onChange={(e) => setRating(e.target.value)}
                                />
                            </div>
                            <button
                                type="submit"
                                className="bg-indigo-600 text-white py-3 px-8 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-75"
                            >
                                Submit Review
                            </button>
                        </form>

                        {/* Display Submitted Reviews */}
                        {submittedReviews.length > 0 ? (
                            <div className="space-y-6">
                                {submittedReviews.map((review) => (
                                    <div
                                        key={review.id}
                                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
                                    >
                                        <div className="flex justify-between items-center mb-2">
                                            <p className="text-lg font-semibold text-gray-800">
                                                {review.user}
                                            </p>
                                            <span className="text-sm text-gray-500">
                                                {review.timestamp}
                                            </span>
                                        </div>
                                        <div className="flex items-center mb-3">
                                            <span className="text-yellow-500 text-xl mr-2">
                                                {'★'.repeat(Math.floor(review.rating))}
                                                {'☆'.repeat(5 - Math.floor(review.rating))}
                                            </span>
                                            <span className="text-gray-700 text-base">
                                                ({review.rating} / 5)
                                            </span>
                                        </div>
                                        <p className="text-gray-700 leading-relaxed">
                                            {review.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center text-gray-600 text-lg">
                                No reviews yet. Be the first to share your thoughts!
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
