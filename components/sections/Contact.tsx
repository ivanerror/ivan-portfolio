'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { GlowCard } from '@/components/ui/glow-card';
import { ParallaxElement } from '@/components/ui/parallax-background';
import { Button } from '@/components/ui/button';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { toast } from 'sonner';

const Contact = () => {
  const t = useTranslations('contact');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Formspree endpoint - Replace 'YOUR_FORM_ID' with your actual Formspree form ID
      const response = await fetch('https://formspree.io/f/xkgqgrvb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _replyto: formData.email,
          _subject: `Portfolio Contact from ${formData.name}`
        })
      });

      if (response.ok) {
        // Success - show success toast
        toast.success(t('form.success'), {
          description: t('form.successDescription'),
          duration: 4000,
        });
        
        // Reset form
        setFormData({ name: '', email: '', message: '' });
      } else {
        // Error response from Formspree
        throw new Error('Failed to send message');
      }
    } catch (error) {
      // Show error toast
      toast.error(t('form.error'), {
        description: t('form.errorDescription'),
        duration: 4000,
      });
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 relative">
      <div className="container mx-auto max-w-4xl" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            {t('title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('description')}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GlowCard
              glowColor="from-cyan-400 via-blue-400 to-indigo-400"
              intensity="medium"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span className="text-lg font-semibold">Contact Information</span>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Mail className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a
                        href="mailto:gabrielivansetyaputra@gmail.com"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        ivangabriel68@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Phone className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a
                        href="tel:+6281234567890"
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        +62 822-1347-1166
                      </a>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">Tulungagung, Indonesia</p>
                    </div>
                  </div>
                </div>
              </div>
            </GlowCard>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <GlowCard
              glowColor="from-indigo-400 via-purple-400 to-pink-400"
              intensity="medium"
            >
              <div className="space-y-6">
                <div className="flex items-center space-x-2">
                  <Send className="h-5 w-5" />
                  <span className="text-lg font-semibold">Send Message</span>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      {t('form.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder={t('form.name')}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('form.email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background"
                      placeholder={t('form.email')}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      {t('form.message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-background resize-none"
                      placeholder={t('form.message')}
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>{t('form.sending')}</span>
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        <span>{t('form.send')}</span>
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </GlowCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;