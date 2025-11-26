import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Use FormSubmit or EmailJS in production. For now, just simulate.
    setSent(true);
  }

  return (
    <main className="max-w-6xl mx-auto px-6 py-12">
      <section className="bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold">Contact</h2>
        <p className="mt-2 text-sm text-gray-600">
          Email: jerson.conmigo@gmail.com — jconmigo@yahoo.com
        </p>

        <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 max-w-xl">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="p-3 border rounded"
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            className="p-3 border rounded"
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message"
            className="p-3 border rounded h-32"
          />
          <button className="px-4 py-2 bg-[#075985] text-white rounded">Send message</button>
        </form>

        {sent && <div className="mt-4 text-sm text-green-600">Thanks — I will reply shortly.</div>}
      </section>
    </main>
  );
}
