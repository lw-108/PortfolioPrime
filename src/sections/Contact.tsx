import React, { useState } from 'react';
import { motion } from 'motion/react';
import CreepyButton from '../components/ui/creepy-button';
import { AnimatedTitle } from '../components/ui/AnimatedTitle';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  return (
    <section id="contact" className="relative z-10 w-full min-h-screen bg-background py-20 px-6 sm:px-8 lg:px-16 overflow-hidden select-none font-clash">
      <div className="max-w-384 mx-auto w-full border-x border-dashed border-neutral-800/60 min-h-[80vh] flex flex-col justify-between relative px-4 sm:px-8 lg:px-12">
        
        {/* Header */}
        <div className="border-b border-dashed border-border pb-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
          <div>
            <span className="text-[#f54900] text-sm uppercase tracking-widest font-semibold">
              Connection
            </span>
            <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-extrabold uppercase tracking-tight mt-2 text-foreground leading-none">
              <AnimatedTitle text="Contact /" />
            </h2>
          </div>
          <p className="text-muted-foreground max-w-xs text-sm sm:text-base text-left md:text-right">
            Let's build something exceptional together
          </p>
        </div>

        {/* Contact Info and Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-16 flex-1 items-start">
          
          {/* Info Side */}
          <div className="flex flex-col gap-10 text-left">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-foreground">Get In Touch</h3>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mt-2.5 max-w-md">
                Whether you want to discuss a software project, hire me for full-time roles, or just say hello, drop a message or reach out directly.
              </p>
            </div>

            {/* Direct Details cards */}
            <div className="flex flex-col gap-5 max-w-md">
              
              {/* Email */}
              <div className="flex gap-4 items-center bg-secondary/10 border border-border p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#f54900]/10 flex items-center justify-center text-[#f54900] font-bold text-lg">&#x2709;</div>
                <div className="min-w-0">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">Email ID</span>
                  <a href="mailto:lingeshwarma8877@gmail.com" className="text-sm font-semibold text-foreground hover:text-[#f54900] transition-colors truncate block">
                    lingeshwarma8877@gmail.com
                  </a>
                </div>
              </div>

              {/* Phones */}
              <div className="flex gap-4 items-center bg-secondary/10 border border-border p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#f54900]/10 flex items-center justify-center text-[#f54900] font-bold text-lg">&#x260E;</div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">Mobile Number</span>
                  <p className="text-sm font-semibold text-foreground">
                    +91-90254 64209 <span className="text-muted-foreground font-normal">/</span> +91-93449 21545
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex gap-4 items-center bg-secondary/10 border border-border p-4 rounded-xl">
                <div className="w-10 h-10 rounded-lg bg-[#f54900]/10 flex items-center justify-center text-[#f54900] font-bold text-lg">&#x26F3;</div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground block">Location Address</span>
                  <p className="text-xs font-semibold text-foreground leading-snug">
                    166/167, Thairpalayam, Kuttaithairpalayam, Chithode, Erode &mdash; 638102, Tamil Nadu, India.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="bg-secondary/10 border border-border/80 hover:border-[#f54900]/30 rounded-2xl p-6 sm:p-8 w-full transition-all duration-300">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center py-16 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-[#f54900]/10 border border-[#f54900]/20 flex items-center justify-center text-[#f54900] text-3xl mb-4">
                  &#x2714;
                </div>
                <h3 className="text-lg font-bold text-foreground">Message Transmitted!</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  Thank you. Your request has been successfully recorded.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-name" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Your Name</label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-secondary/25 border border-border focus:border-[#f54900] rounded-lg px-4 py-3 text-xs text-foreground focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-email" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Email Address</label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-secondary/25 border border-border focus:border-[#f54900] rounded-lg px-4 py-3 text-xs text-foreground focus:outline-none transition-colors"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="form-message" className="text-[10px] uppercase font-bold tracking-wider text-muted-foreground">Your Message</label>
                  <textarea
                    id="form-message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-secondary/25 border border-border focus:border-[#f54900] rounded-lg px-4 py-3 text-xs text-foreground focus:outline-none transition-colors resize-none"
                    placeholder="Describe your project, ideas, or questions"
                  />
                </div>

                {/* Submit button */}
                <div className="mt-2 flex justify-start">
                  <CreepyButton>
                    Send Message
                  </CreepyButton>
                </div>
              </form>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Contact;
