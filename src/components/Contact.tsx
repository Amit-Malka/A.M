import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Linkedin, Github, Send, Download } from 'lucide-react';
import { downloadCV } from '../utils/downloadCV';

const Contact: React.FC = () => {
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
      icon: <MapPin size={20} />,
      label: 'Location',
      value: 'Israel',
      href: null
    }
  ];

  const socialLinks = [
    { icon: <Linkedin size={24} />, label: 'LinkedIn', href: 'https://linkedin.com/in/--amitmalka--' },
    { icon: <Github size={24} />, label: 'GitHub', href: 'https://github.com/Amit-Malka' }
  ];

  return (
    <section id="contact" className="relative scroll-mt-24 min-h-screen bg-gradient-to-br from-primary to-background-dark py-20">

      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl lg:text-6xl font-bold text-white mb-4">Get In Touch</h2>
          <p className="text-xl text-gray-200 max-w-3xl mx-auto">
            Ready to start your project? Drop me a message and let's create something amazing together
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-3xl p-8">
              <h3 className="text-3xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-lg text-gray-200 leading-relaxed mb-8">
                I'm always excited to discuss new opportunities, collaborate on interesting projects,
                or simply chat about the latest developments in AI and data science.
              </p>

              <div className="space-y-6 mb-8">
                {contactInfo.map((item) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center text-white">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-300 font-medium">{item.label}</div>
                      {item.href ? (
                        <a href={item.href} className="text-white font-medium hover:text-accent transition-colors duration-300">
                          {item.value}
                        </a>
                      ) : (
                        <span className="text-white font-medium">{item.value}</span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mb-8">
                <h4 className="text-xl font-semibold text-white mb-4">Find me on</h4>
                <div className="flex gap-4">
                  {socialLinks.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-16 h-16 bg-white/10 backdrop-blur-sm border border-accent/20 rounded-2xl flex items-center justify-center text-gray-300 hover:text-white hover:bg-secondary hover:border-secondary hover:scale-110 transition-all duration-300"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      aria-label={link.label}
                    >
                      {link.icon}
                    </motion.a>
                  ))}
                </div>
              </div>

              <motion.button
                onClick={downloadCV}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 border-2 border-secondary text-secondary font-semibold rounded-xl hover:bg-secondary hover:text-white transition-all duration-300 hover:scale-105"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 1 }}
              >
                <Download size={20} />
                Download CV
              </motion.button>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="bg-white/5 backdrop-blur-sm border border-accent/20 rounded-3xl p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
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
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-300 focus:outline-none focus:border-secondary focus:bg-white/15 transition-all duration-300 resize-vertical"
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-primary text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-secondary/25 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  whileHover={!isSubmitting ? { scale: 1.02 } : {}}
                  whileTap={!isSubmitting ? { scale: 0.98 } : {}}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={20} />
                      Send Message
                    </>
                  )}
                </motion.button>

                {submitStatus === 'success' && (
                  <p className="text-green-400 text-sm text-center font-medium">
                    Message sent! I'll get back to you soon.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-sm text-center font-medium">
                    {submitError}
                  </p>
                )}
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;