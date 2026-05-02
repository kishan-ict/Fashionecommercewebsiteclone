import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, MessageSquare, CheckCircle } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    orderNumber: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const update = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = "Required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Valid email required";
    if (!form.message.trim() || form.message.length < 10) newErrors.message = "Please provide more detail";
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setSubmitted(true);
  };

  const inputClass =
    "w-full px-4 py-3 border border-gray-200 text-sm text-black placeholder-gray-400 outline-none focus:border-black transition-colors bg-white";

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <div
        className="py-16 text-center"
        style={{ background: "#FAF9F6" }}
      >
        <span
          className="inline-block text-[11px] tracking-[0.4em] uppercase mb-4"
          style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
        >
          We're Here For You
        </span>
        <h1
          className="text-black"
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            fontWeight: 600,
          }}
        >
          Get In Touch
        </h1>
        <div className="flex items-center justify-center mt-4 gap-3">
          <div className="h-px w-12 bg-gray-200" />
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#C9A96E" }} />
          <div className="h-px w-12 bg-gray-200" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {[
            {
              icon: Phone,
              title: "Phone / WhatsApp",
              lines: ["+91 9986998851"],
              link: "tel:9986998851",
              linkText: "Call Now",
            },
            {
              icon: Mail,
              title: "Email",
              lines: ["kishanmpatil1@gmail.com"],
              link: "mailto:kishanmpatil1@gmail.com",
              linkText: "Send Email",
            },
            {
              icon: MapPin,
              title: "Store Address",
              lines: ["H&J Fashion House", "MG Road, Bengaluru", "Karnataka – 560001"],
              link: "#",
              linkText: "Get Directions",
            },
            {
              icon: Clock,
              title: "Business Hours",
              lines: ["Mon – Sat: 10am – 7pm", "Sunday: 11am – 5pm", "Online: 24/7"],
              link: null,
              linkText: null,
            },
          ].map((info) => (
            <div
              key={info.title}
              className="p-6 border text-center group hover:border-[#C9A96E] transition-all"
              style={{ borderColor: "#EFEFEF" }}
            >
              <div
                className="w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "#FAF9F6" }}
              >
                <info.icon size={20} style={{ color: "#C9A96E" }} />
              </div>
              <h3
                className="text-black mb-3 text-[11px] tracking-widest uppercase"
                style={{ fontFamily: "'Inter', sans-serif", fontWeight: 700 }}
              >
                {info.title}
              </h3>
              {info.lines.map((line, idx) => (
                <p
                  key={idx}
                  className="text-gray-600 text-[13px] leading-relaxed"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  {line}
                </p>
              ))}
              {info.link && info.linkText && (
                <a
                  href={info.link}
                  className="inline-block mt-3 text-[11px] tracking-widest uppercase underline hover:text-[#C9A96E] transition-colors"
                  style={{ fontFamily: "'Inter', sans-serif", color: "#C9A96E" }}
                >
                  {info.linkText}
                </a>
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-3">
            <div className="mb-8">
              <span
                className="inline-block text-[11px] tracking-[0.4em] uppercase mb-2"
                style={{ color: "#C9A96E", fontFamily: "'Inter', sans-serif", fontWeight: 600 }}
              >
                Send a Message
              </span>
              <h2
                className="text-black"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "1.8rem",
                  fontWeight: 600,
                }}
              >
                How Can We Help?
              </h2>
            </div>

            {submitted ? (
              <div className="py-12 text-center">
                <div
                  className="w-16 h-16 mx-auto mb-5 rounded-full flex items-center justify-center"
                  style={{ background: "#F0F7F0" }}
                >
                  <CheckCircle size={32} style={{ color: "#7B9B6E" }} />
                </div>
                <h3
                  className="text-black mb-2"
                  style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem" }}
                >
                  Message Sent!
                </h3>
                <p
                  className="text-gray-500 text-sm mb-6"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Thank you for reaching out. We typically respond within 24 hours.
                </p>
                <div
                  className="text-sm text-gray-600 p-4 mb-6"
                  style={{ background: "#FAF9F6", fontFamily: "'Inter', sans-serif" }}
                >
                  For urgent queries, please call us at{" "}
                  <a href="tel:9986998851" className="text-[#C9A96E] font-medium">+91 9986998851</a>
                </div>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ name: "", email: "", phone: "", subject: "", message: "", orderNumber: "" });
                  }}
                  className="px-6 py-3 border border-black text-xs tracking-widest uppercase hover:bg-black hover:text-white transition-all"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-black mb-1.5 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className={`${inputClass} ${errors.name ? "border-red-400" : ""}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-black mb-1.5 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      placeholder="you@example.com"
                      className={`${inputClass} ${errors.email ? "border-red-400" : ""}`}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    {errors.email && <p className="text-red-500 text-[10px] mt-1">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-black mb-1.5 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Phone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 9876543210"
                      className={inputClass}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] tracking-widest uppercase text-black mb-1.5 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Order Number (if any)</label>
                    <input
                      type="text"
                      value={form.orderNumber}
                      onChange={(e) => update("orderNumber", e.target.value)}
                      placeholder="HJ12345678"
                      className={inputClass}
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-black mb-1.5 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>Subject</label>
                  <select
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    className={inputClass}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <option value="">Select a topic</option>
                    <option value="order">Order Status / Tracking</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="product">Product Enquiry</option>
                    <option value="payment">Payment Issue</option>
                    <option value="complaint">Complaint</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] tracking-widest uppercase text-black mb-1.5 font-semibold" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Please describe how we can help you..."
                    rows={5}
                    className={`${inputClass} resize-none ${errors.message ? "border-red-400" : ""}`}
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  />
                  {errors.message && <p className="text-red-500 text-[10px] mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto px-10 py-4 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#333] transition-colors flex items-center justify-center gap-2"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <MessageSquare size={14} />
                  Send Message
                </button>
              </form>
            )}
          </div>

          {/* FAQ Sidebar */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h3
                className="text-black mb-2"
                style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600 }}
              >
                FAQs
              </h3>
              <p className="text-gray-500 text-[13px]" style={{ fontFamily: "'Inter', sans-serif" }}>
                Quick answers to common questions
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How can I track my order?",
                  a: "Once your order ships, you'll receive an email with a tracking link. You can also contact us with your order number.",
                },
                {
                  q: "What is your return policy?",
                  a: "We offer hassle-free 30-day returns on all orders. Items must be unworn, unwashed, and in original packaging.",
                },
                {
                  q: "How long does delivery take?",
                  a: "Standard delivery takes 4-7 business days. Express delivery (2-3 days) is available for an additional charge.",
                },
                {
                  q: "Do you ship internationally?",
                  a: "Currently, we ship within India only. International shipping is coming soon!",
                },
                {
                  q: "How do I find the right size?",
                  a: "Use our detailed size guide on each product page. When in doubt, we recommend sizing up for the best fit.",
                },
              ].map((faq, idx) => (
                <div
                  key={idx}
                  className="p-4 border"
                  style={{ borderColor: "#EFEFEF" }}
                >
                  <p
                    className="text-black text-[13px] font-medium mb-2"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {faq.q}
                  </p>
                  <p
                    className="text-gray-500 text-[12px] leading-relaxed"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    {faq.a}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick Contact CTA */}
            <div
              className="mt-6 p-5 text-center"
              style={{ background: "#FAF9F6" }}
            >
              <p
                className="text-[11px] tracking-widest uppercase text-gray-400 mb-3"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Need Immediate Help?
              </p>
              <a
                href="tel:9986998851"
                className="inline-flex items-center gap-2 px-6 py-3 bg-black text-white text-xs tracking-widest uppercase font-semibold hover:bg-[#333] transition-colors"
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                <Phone size={13} />
                Call +91 9986998851
              </a>
              <p className="text-[11px] text-gray-400 mt-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                Available Mon–Sat 10am–7pm
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
