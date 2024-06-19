import React from 'react';

const Contact: React.FC = () => {
  return (
    <section className="py-16">
      <h2 className="text-3xl font-bold mb-4">Contact Me</h2>
      <p className="text-lg mb-4">You can reach me at:</p>
      <ul>
        <li>Email: john.doe@example.com</li>
        <li>Phone: 123-456-7890</li>
        {/* Add more contact information */}
      </ul>
    </section>
  );
};

export default Contact;
