import { FiMail, FiGithub, FiLinkedin, FiFileText, FiSend, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TiltCard from "./TiltCard";
import { playClickSound, playHoverSound } from "../utils/sound";

function Contact() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    playClickSound();
    setLoading(true);
    setStatus("");
    setErrorMessage("");

    try {
      // Primary: FormSubmit.co endpoint to tharunhs1208@gmail.com
      const response = await fetch("https://formsubmit.co/ajax/tharunhs1208@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `New Portfolio Message from ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success === "true" || result.success === true)) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        if (formRef.current) formRef.current.reset();
        setTimeout(() => setStatus(""), 8000);
      } else {
        throw new Error(result.message || "Delivery failed");
      }
    } catch (err) {
      console.warn("FormSubmit notice, attempting Web3Forms backup:", err);

      try {
        const backupRes = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            access_key: "62688846-5e5d-4f11-88f1-e4070a7d9765",
            name: formData.name,
            email: formData.email,
            message: formData.message,
            subject: `Portfolio Message from ${formData.name}`,
            to_email: "tharunhs1208@gmail.com",
          }),
        });

        if (backupRes.ok) {
          setStatus("success");
          setFormData({ name: "", email: "", message: "" });
          if (formRef.current) formRef.current.reset();
          setTimeout(() => setStatus(""), 8000);
          return;
        }
      } catch (backupErr) {
        console.error("Backup failed:", backupErr);
      }

      // If network fails, launch mailto
      const subject = encodeURIComponent(`Portfolio Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.open(`mailto:tharunhs1208@gmail.com?subject=${subject}&body=${body}`, "_blank");

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus(""), 8000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-28 relative overflow-hidden bg-[#08090d]">
      <div className="container relative z-10">
        {/* Section Header with In & Out scroll transition */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-xs uppercase font-mono tracking-[0.25em] text-slate-400 font-semibold mb-3">
            05 // LET'S BUILD SOMETHING MEANINGFUL TOGETHER
          </p>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Start a <span className="gradient-title">Conversation</span>
          </h2>

          <p className="mt-3 text-slate-400 text-sm">
            Have a project in mind, full-time opportunity, or want to collaborate?
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto">
          {/* LEFT: Contact Channels */}
          <motion.div
            initial={{ opacity: 0, x: -40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-5"
          >
            <TiltCard max={4} lift={6} className="h-full">
              <div className="luxury-card p-8 rounded-3xl h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    Direct Channels
                  </h3>

                  <p className="mt-2 text-xs font-mono text-slate-400 leading-relaxed">
                    Available for software engineering roles, internships, and full-stack web applications.
                  </p>

                  <div className="mt-6 space-y-3 font-mono text-xs">
                    <a
                      href="mailto:tharunhs1208@gmail.com"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:border-white/25 transition shadow-sm"
                    >
                      <FiMail className="text-indigo-400 text-base flex-shrink-0" />
                      <span className="truncate">tharunhs1208@gmail.com</span>
                    </a>

                    <a
                      href="https://github.com/Tharun1208"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:border-white/25 transition shadow-sm"
                    >
                      <FiGithub className="text-indigo-400 text-base flex-shrink-0" />
                      <span>github.com/Tharun1208</span>
                    </a>

                    <a
                      href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 text-slate-200 hover:text-white hover:border-white/25 transition shadow-sm"
                    >
                      <FiLinkedin className="text-indigo-400 text-base flex-shrink-0" />
                      <span>linkedin.com/in/tharun-h-s</span>
                    </a>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
                  <a
                    href="mailto:tharunhs1208@gmail.com?subject=Project%20Inquiry&body=Hi%20Tharun,%0A%0AI%20would%20like%20to%20connect%20regarding..."
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="flex items-center justify-center gap-2 bg-indigo-600/20 hover:bg-indigo-600 text-indigo-300 hover:text-white border border-indigo-500/30 font-mono text-xs font-semibold px-5 py-3 rounded-2xl transition hover:scale-105 w-full"
                  >
                    <FiMail />
                    <span>Email Directly (tharunhs1208@gmail.com)</span>
                  </a>

                  <a
                    href="/resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    onMouseEnter={playHoverSound}
                    onClick={playClickSound}
                    className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white text-slate-300 hover:text-slate-900 border border-white/10 font-mono text-xs font-semibold px-5 py-3 rounded-2xl transition hover:scale-105 w-full"
                  >
                    <FiFileText />
                    <span>Download Resume (PDF)</span>
                  </a>
                </div>
              </div>
            </TiltCard>
          </motion.div>

          {/* RIGHT: Send Message Form */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="md:col-span-7"
          >
            <TiltCard max={4} lift={6} className="h-full">
              <div className="luxury-card p-8 rounded-3xl h-full flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-white">
                    Send a Message
                  </h3>

                  <AnimatePresence mode="wait">
                    {status === "success" && (
                      <motion.div
                        key="success"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-start gap-2.5"
                      >
                        <FiCheckCircle size={16} className="mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-bold">Message sent successfully!</p>
                          <p className="text-[11px] text-emerald-400/80 mt-0.5">
                            Delivered to tharunhs1208@gmail.com (check Spam / Promotions if first time).
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {status === "error" && (
                      <motion.div
                        key="error"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="mt-4 p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2"
                      >
                        <FiAlertCircle size={16} />
                        <span>{errorMessage || "Failed to send. Please use the direct email button."}</span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <form ref={formRef} onSubmit={sendEmail} className="mt-6 space-y-4">
                    <div>
                      <input
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Your Name"
                        className="w-full bg-white/5 border border-white/10 p-3.5 rounded-2xl text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none text-xs font-mono transition"
                      />
                    </div>

                    <div>
                      <input
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="Your Email Address"
                        className="w-full bg-white/5 border border-white/10 p-3.5 rounded-2xl text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none text-xs font-mono transition"
                      />
                    </div>

                    <div>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        required
                        placeholder="Project inquiry or message..."
                        className="w-full bg-white/5 border border-white/10 p-3.5 rounded-2xl text-white placeholder-slate-500 focus:border-indigo-400 focus:ring-1 focus:ring-indigo-400 outline-none text-xs font-mono transition resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      onMouseEnter={playHoverSound}
                      onClick={playClickSound}
                      className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs font-mono tracking-wider py-4 rounded-2xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition hover:-translate-y-0.5 cursor-pointer disabled:opacity-50"
                    >
                      <FiSend />
                      <span>{loading ? "Sending Message..." : "Send Message"}</span>
                    </button>
                  </form>
                </div>
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;