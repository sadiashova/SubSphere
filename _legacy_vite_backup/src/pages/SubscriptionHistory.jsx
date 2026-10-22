import React from 'react'; // Removed useState and useEffect as functionality is removed

const SubscriptionHistory = () => {
  // Hardcoded dummy history for display purposes
  const subscriptions = [
    {
      id: 'sub001',
      boxName: 'Everyday Glow Box',
      startDate: '2023-01-15',
      endDate: '2023-12-15',
      status: 'Active',
      price: '29.99',
      frequency: 'Monthly',
      lastShipped: '2024-05-01',
      nextShipment: '2024-06-01',
    },
    {
      id: 'sub002',
      boxName: 'Glam Night Out Box',
      startDate: '2022-07-20',
      endDate: '2023-07-20',
      status: 'Expired',
      price: '49.99',
      frequency: 'Bi-Monthly',
      lastShipped: '2023-05-20',
      nextShipment: 'N/A',
    },
    {
      id: 'sub003',
      boxName: 'Skincare Infused Makeup',
      startDate: '2024-03-10',
      endDate: '2025-03-10',
      status: 'Active',
      price: '59.99',
      frequency: 'Quarterly',
      lastShipped: '2024-04-10',
      nextShipment: '2024-07-10',
    },
  ];

  // Removed all useEffect, useState, and useContext related to data fetching/loading
  // The component now only displays the hardcoded 'subscriptions' data.

  return (
    <div className="min-h-screen bg-gray-50 font-inter py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-10">
          Your Subscription History
        </h2>

        {subscriptions.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">
            You don't have any active or past subscriptions yet.
          </p>
        ) : (
          <div className="space-y-6">
            {subscriptions.map((sub) => (
              <div
                key={sub.id}
                className="bg-gray-50 rounded-lg p-6 shadow-md border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-4 md:mb-0 md:w-2/3">
                  <h3 className="text-2xl font-bold text-indigo-700 mb-2">
                    {sub.boxName}
                  </h3>
                  <p className="text-gray-700 text-lg">
                    <span className="font-semibold">Status:</span>{" "}
                    <span className={`font-bold ${sub.status === 'Active' ? 'text-green-600' : 'text-red-600'}`}>
                      {sub.status}
                    </span>
                  </p>
                  <p className="text-gray-600 text-base">
                    <span className="font-semibold">Frequency:</span> {sub.frequency}
                  </p>
                  <p className="text-gray-600 text-base">
                    <span className="font-semibold">Price:</span> ${sub.price} / {sub.frequency.toLowerCase().replace('bi-monthly', '2 months')}
                  </p>
                </div>
                <div className="md:w-1/3 md:text-right">
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Subscribed:</span> {sub.startDate}
                  </p>
                  <p className="text-gray-600 text-sm">
                    <span className="font-semibold">Last Shipped:</span> {sub.lastShipped}
                  </p>
                  {sub.nextShipment !== 'N/A' && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Next Shipment:</span> {sub.nextShipment}
                    </p>
                  )}
                  {sub.status === 'Expired' && (
                    <p className="text-gray-600 text-sm">
                      <span className="font-semibold">Ended:</span> {sub.endDate}
                    </p>
                  )}
                  {sub.status === 'Active' && (
                    <button className="mt-4 bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors duration-200 text-sm">
                      Manage Subscription
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SubscriptionHistory;
