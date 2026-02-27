'use client';

import { useState } from 'react';
import PageTransition from '@/components/PageTransition';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen pt-16">
      <PageTransition className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
          Get in Touch
        </h1>
        <p className="text-slate-500 mb-10">
          Have a project in mind, want to collaborate, or just want to say hi? Drop me a message.
        </p>

        {submitted ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-8 text-center">
            <div className="text-green-600 font-semibold text-lg mb-2">Message sent!</div>
            <p className="text-slate-600 text-sm">
              Thanks for reaching out. I'll get back to you as soon as I can.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors"
            >
              Send Message
            </button>
          </form>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="text-sm text-slate-400 mb-1">Email</div>
            <div className="text-slate-700 font-medium">hello@ali-amer.dev</div>
          </div>
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">
            <div className="text-sm text-slate-400 mb-1">GitHub</div>
            <a
              href="https://github.com/ali-amer"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:text-green-500"
            >
              github.com/ali-amer
            </a>
          </div>
        </div>
      </PageTransition>
    </div>
  );
}
