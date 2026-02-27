'use client';

import { useState } from 'react';
import PageTransition from '@/components/PageTransition';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSending(true);
    setError(null);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const res = await fetch('https://formsubmit.co/ajax/alihamyamer@gmail.com', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: data,
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="min-h-screen pt-28">
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
              Thanks for reaching out. I&apos;ll get back to you as soon as I can.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6"
          >
            <input type="hidden" name="_subject" value="New message from ali-amer.org" />
            <input type="text" name="_honey" className="hidden" />
            <input type="hidden" name="_captcha" value="false" />

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
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
                name="email"
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
                name="message"
                required
                rows={5}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500 resize-none"
                placeholder="Tell me about your project or idea..."
              />
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={sending}
              className="w-full px-6 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {sending ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <a
            href="mailto:alihamyamer@gmail.com"
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-green-300 hover:bg-green-50/50 transition-colors group"
          >
            <div className="text-sm text-slate-400 mb-1">Email</div>
            <div className="text-slate-700 font-medium group-hover:text-green-700 transition-colors">
              alihamyamer@gmail.com
            </div>
          </a>
          <a
            href="https://github.com/alihamyamer"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 hover:border-green-300 hover:bg-green-50/50 transition-colors group"
          >
            <div className="text-sm text-slate-400 mb-1">GitHub</div>
            <div className="text-green-600 font-medium group-hover:text-green-500 transition-colors">
              github.com/alihamyamer
            </div>
          </a>
        </div>
      </PageTransition>
    </div>
  );
}
