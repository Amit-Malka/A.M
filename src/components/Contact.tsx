import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Linkedin, Github, Send, Download } from 'lucide-react';
import { downloadCV } from '../utils/downloadCV';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

const Contact: React.FC = () => {
  const prefersReducedMotion = usePrefersReducedMotion();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setSubmitError('');

    try {
      const response = await fetch('https://formspree.io/f/mvgggrzo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok) {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitStatus('success');
      } else {
        const message = data?.errors?.[0]?.message ?? data?.error ?? 'Submission failed. Please try again.';
        setSubmitError(message);
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Could not reach the server. Please check your connection and try again.');
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: <MapPin size={18} />,
      label: 'Location',
      value: 'Israel',
      href: null
    }
  ];

  const socialLinks = [
    { icon: <Linkedin size={20} />, label: 'LinkedIn', href: 'https://linkedin.com/in/--amitmalka--' },
    { icon: <Github size={20} />, label: 'GitHub', href: 'https://github.com/Amit-Malka' }
  ];

  const riseIn = {
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: prefersReducedMotion ? 0 : 0.6 },
  };

  const inputClasses = 'w-full px-4 py-3 bg-surface border border-line text-ink placeholder:text-muted focus:outline-none focus:border-accent transition-colors';

  return (
    <section id="contact" className="relative scroll-mt-24 bg-bg py-20">
      <div className="mx-auto max-w-5xl px-6">
        <motion.div className="mb-12" {...riseIn}>
          <h2 className="font-display text-4xl lg:text-5xl text-ink mb-4">Get In Touch</h2>
          <p className="text-lg text-muted max-w-2xl leading-relaxed">
            Ready to start your project? Drop me a message and let's create something amazing together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Form: first on mobile, second column on desktop */}
          <motion.div
            className="order-1 lg:order-2"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Your full name"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-ink mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  placeholder="What's this about?"
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  placeholder="Tell me about your project or just say hello..."
                  className={`${inputClasses} resize-vertical`}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-accent text-bg font-semibold transition-opacity hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-bg/30 border-t-bg rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Send Message
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <p className="text-accent text-sm text-center font-medium">
                  Message sent! I'll get back to you soon.
                </p>
              )}
              {submitStatus === 'error' && (
                <p className="text-sm text-center font-medium text-danger">
                  {submitError}
                </p>
              )}
            </form>
          </motion.div>

          {/* Info column */}
          <motion.div
            className="order-2 lg:order-1 space-y-8"
            initial={prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.5 }}
          >
            <div>
              <h3 className="font-display text-2xl text-ink mb-3">Let's Connect</h3>
              <p className="text-muted leading-relaxed">
                I'm always excited to discuss new opportunities, collaborate on interesting projects,
                or simply chat about the latest developments in AI and data science.
              </p>
            </div>

            <ul className="space-y-4 border-t border-line pt-6">
              {contactInfo.map((item) => (
                <li key={item.label} className="flex items-center gap-3 text-sm">
                  <span className="text-accent" aria-hidden="true">{item.icon}</span>
                  <span className="text-muted">{item.label}:</span>
                  {item.href ? (
                    <a href={item.href} className="text-ink font-medium hover:text-accent transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-ink font-medium">{item.value}</span>
                  )}
                </li>
              ))}
            </ul>

            <div>
              <h4 className="text-xs uppercase tracking-wider text-muted mb-3">Find me on</h4>
              <div className="flex gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 flex items-center justify-center border border-line text-ink hover:text-accent hover:border-accent transition-colors"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={downloadCV}
              className="inline-flex items-center justify-center gap-3 px-8 py-4 border border-line text-ink font-semibold transition-colors hover:bg-surface"
            >
              <Download size={20} />
              Download CV
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
