import {
  FiGithub,
  FiLinkedin,
  FiFileText,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "About", link: "#about" },
    { name: "Skills", link: "#skills" },
    { name: "Projects", link: "#projects" },
    { name: "Experience", link: "#experience" },
    { name: "Education", link: "#education" },
    { name: "Contact", link: "#contact" },
  ];

  const handleNavClick = (e, target) => {
    e.preventDefault();

    setOpen(false);

    const section = document.querySelector(target);

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className="
        fixed
        top-0
        w-full
        z-50
        bg-white/80
        backdrop-blur-lg
        border-b
        border-gray-200
        shadow-sm
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-6
          py-4
          flex
          justify-between
          items-center
        "
      >
        {/* Logo */}
        <a
          href="#"
          onClick={(e) => handleNavClick(e, "body")}
          className="
            text-3xl
            font-extrabold
            bg-gradient-to-r
            from-blue-600
            to-purple-600
            bg-clip-text
            text-transparent
            hover:scale-110
            transition
          "
        >
          Tharun.
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex gap-8">
          {links.map((item, index) => (
            <a
              key={index}
              href={item.link}
              onClick={(e) => handleNavClick(e, item.link)}
              className="
                relative
                text-gray-700
                font-medium
                group
                hover:text-blue-600
                transition
              "
            >
              {item.name}

              <span
                className="
                  absolute
                  left-0
                  -bottom-1
                  w-0
                  h-[2px]
                  bg-blue-600
                  group-hover:w-full
                  transition-all
                  duration-300
                "
              />
            </a>
          ))}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-5">
          <a
            href="https://github.com/Tharun1208"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiGithub
              size={24}
              className="
                text-gray-700
                hover:text-blue-600
                hover:scale-125
                transition-all
              "
            />
          </a>

          <a
            href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiLinkedin
              size={24}
              className="
                text-gray-700
                hover:text-blue-600
                hover:scale-125
                transition-all
              "
            />
          </a>

          <motion.a
            whileHover={{
              scale: 1.08,
              y: -3,
            }}
            whileTap={{
              scale: 0.95,
            }}
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="
              flex
              items-center
              gap-2
              bg-blue-600
              text-white
              px-5
              py-2.5
              rounded-full
              shadow-lg
              shadow-blue-200
              hover:bg-blue-700
              transition
            "
          >
            <FiFileText />
            Resume
          </motion.a>
        </div>

        {/* Mobile Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {open ? <FiX size={28} /> : <FiMenu size={28} />}
        </button>
      </div>

      <AnimatePresence>
                {open && (
          <motion.div
            initial={{
              opacity: 0,
              height: 0,
            }}
            animate={{
              opacity: 1,
              height: "auto",
            }}
            exit={{
              opacity: 0,
              height: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="
              md:hidden
              bg-white
              border-t
              border-gray-200
              px-6
              py-6
              space-y-5
              shadow-lg
            "
          >
            {links.map((item, index) => (
              <a
                key={index}
                href={item.link}
                onClick={(e) => handleNavClick(e, item.link)}
                className="
                  block
                  text-gray-700
                  font-medium
                  hover:text-blue-600
                  hover:translate-x-2
                  transition
                "
              >
                {item.name}
              </a>
            ))}

            <div
              className="
                flex
                gap-5
                pt-4
              "
            >
              <a
                href="https://github.com/Tharun1208"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiGithub
                  size={24}
                  className="
                    text-gray-700
                    hover:text-blue-600
                    hover:scale-110
                    transition
                  "
                />
              </a>

              <a
                href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FiLinkedin
                  size={24}
                  className="
                    text-gray-700
                    hover:text-blue-600
                    hover:scale-110
                    transition
                  "
                />
              </a>
            </div>

            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="
                inline-flex
                items-center
                gap-2
                bg-blue-600
                text-white
                px-5
                py-3
                rounded-full
                shadow-lg
                shadow-blue-200
                hover:bg-blue-700
                transition
              "
            >
              <FiFileText />
              View Resume
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

export default Navbar;
