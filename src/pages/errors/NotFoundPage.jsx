import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16 text-center">
      <h1 className="mb-3 text-4xl font-semibold">Page not found</h1>
      <p className="mb-6 text-slate-700">The page you are looking for does not exist.</p>
      <Link to="/" className="font-semibold text-blue-600 hover:underline">
        Return home
      </Link>
    </section>
  );
}

export default NotFound;
