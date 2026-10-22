import React from 'react';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

const Footer = () => {
  return (
<footer className="bg-gray-900 text-white py-8">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
    
    {/* Branding */}
    <div>
      <h2 className="text-2xl font-bold">SubSphere</h2>
      <p className="text-sm text-gray-400">Delivering Delight, Every Month.</p>
    </div>

    {/* Legal Links */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Legal</h3>
      <ul className="space-y-1 text-sm text-gray-300">
        <li><a href="/terms" className="hover:underline">Terms & Conditions</a></li>
        <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
      </ul>
    </div>

    {/* Social Icons (no links) */}
    <div>
      <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
<div className="flex space-x-3 text-white">
  <a href="https://facebook.com" target='_blank'><FaFacebookF /></a>
  <a href="https://x.com" target='_blank'><FaTwitter /></a>
  <a href="https://instagram.com" target='_blank'><FaInstagram /></a>
 <a href="https://linkedin.com" target='_blank'> <FaLinkedinIn /></a>
</div>
    </div>
  </div>

  <div className="text-center text-sm text-gray-500 mt-6">
    &copy; 2025 SubSphere. All rights reserved.
  </div>
</footer>

  );
};

export default Footer;
