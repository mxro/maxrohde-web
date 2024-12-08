// src/components/Contact.tsx
import React from 'react';

const Contact: React.FC = () => {
  return (
    <footer className="py-16 bg-gray-50 text-center">
      <h2 className="text-2xl font-semibold mb-4">How to get in touch</h2>
      <p className="text-gray-600 mb-2">Pureleap Pty. Ltd.</p>
      <p className="text-gray-600 mb-2">12 Glenmaggie Chase</p>
      <p className="text-gray-600 mb-2">3023 VIC Caroline Springs, Australia</p>
      <a
        href="mailto:public@pureleap.com"
        className="text-blue-500 hover:underline"
      >
        public@pureleap.com
      </a>
    </footer>
  );
};

export default Contact;
