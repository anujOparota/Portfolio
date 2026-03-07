import { useState } from "react";
import { Send, Github, Linkedin, Instagram, Mail, Loader2, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SectionReveal from "./SectionReveal";
import emailjs  from "@emailjs/browser";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    else if (form.name.trim().length > 100) errs.name = "Name must be under 100 characters.";
    if (!form.email.trim()) errs.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email.";
    if (!form.message.trim()) errs.message = "Message is required.";
    else if (form.message.trim().length > 1000) errs.message = "Message must be under 1000 characters.";
    return errs;
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  const errs = validate();
  setErrors(errs);
  if (Object.keys(errs).length > 0) return;

  setSubmitting(true);

  const templateParams = {
    from_name: form.name,
    from_email: form.email,
    message: form.message,
  };

  try {
    await emailjs.send(
      "portfolio@2007",  
      "template@2007",  
      templateParams,
      "yoiiMVBwrf2m_dgP0"   
    );

    setSubmitted(true);
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 4000);
  } catch (error) {
    console.error("EmailJS Error:", error);
  }

  setSubmitting(false);
};

  const updateField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
  };

  return (
    <SectionReveal id="contact" className="py-24 px-4 bg-card/30">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground text-center mb-4">
          Get In <span className="text-primary">Touch</span>
        </h2>
        <div className="w-16 h-1 bg-primary mx-auto rounded-full mb-6" />
        <p className="text-muted-foreground text-center max-w-xl mx-auto mb-12">
          Have a project in mind or just want to say hi? Feel free to reach out — I'm always open to new opportunities and conversations.
        </p>

        <div className="grid md:grid-cols-5 gap-10">
          {/* Form with accessible validation */}
          <form onSubmit={handleSubmit} className="md:col-span-3 space-y-5" noValidate>
            <div>
              <label htmlFor="contact-name" className="sr-only">Your Name</label>
              <Input
                id="contact-name"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
                className="bg-card border-border focus:border-primary"
              />
              {errors.name && <p id="name-error" role="alert" className="text-destructive text-xs mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="contact-email" className="sr-only">Your Email</label>
              <Input
                id="contact-email"
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
                className="bg-card border-border focus:border-primary"
              />
              {errors.email && <p id="email-error" role="alert" className="text-destructive text-xs mt-1">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="contact-message" className="sr-only">Your Message</label>
              <Textarea
                id="contact-message"
                placeholder="Your Message"
                rows={5}
                value={form.message}
                onChange={(e) => updateField("message", e.target.value)}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "message-error" : undefined}
                className="bg-card border-border focus:border-primary resize-none"
              />
              {errors.message && <p id="message-error" role="alert" className="text-destructive text-xs mt-1">{errors.message}</p>}
            </div>

            {submitted ? (
              <div className="flex items-center gap-2 text-primary font-medium" role="status">
                <CheckCircle size={18} /> Message sent! I'll get back to you soon.
              </div>
            ) : (
              <Button type="submit" size="lg" className="w-full sm:w-auto px-8 hover:shadow-lg hover:shadow-primary/25 transition-all duration-300" disabled={submitting}>
                {submitting ? <><Loader2 size={16} className="animate-spin" /> Sending...</> : <><Send size={16} /> Send Message</>}
              </Button>
            )}
          </form>

          {/* Social links */}
          <div className="md:col-span-2 flex flex-col justify-center">
            <h3 className="font-display text-lg font-semibold text-foreground mb-6">Connect With Me</h3>
            <nav aria-label="Social media links" className="space-y-4">
              {[
                { icon: Github, label: "GitHub", href: "https://github.com/anujOparota", handle: "anujOparota" },
                { icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/anuj-parota-315125323/", handle: "Anuj Parota" },
                { icon: Mail, label: "Email", href: "mailto:anujparota@gmail.com", handle: "anujparota@gmail.com" },
                { icon: Instagram, label: "Instagram", href: "https://instagram.com/anuj_parota_07", handle: "anuj_parota_07" },
              ].map(({ icon: Icon, label, href, handle }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-lg p-1"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Icon size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{label}</p>
                    <p className="text-xs text-muted-foreground">{handle}</p>
                  </div>
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-20 pt-8 border-t border-border text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} Portfolio. Built with ♥️ by Anuj Parota.<br></br> All rights reserved.
        </p>
      </footer>
    </SectionReveal>
  );
};

export default ContactSection;
