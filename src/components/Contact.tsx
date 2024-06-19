import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold mb-8 text-center">Contact Me</h2>
        <p className="text-lg mb-4 text-center">You can reach me at:</p>
        <ul className="flex justify-center space-x-4">
          <li>Email: john.doe@example.com</li>
          <li>Phone: 123-456-7890</li>
          {/* Add more contact information */}
        </ul>
      </div>
    </section>
  );
};

export default Contact;