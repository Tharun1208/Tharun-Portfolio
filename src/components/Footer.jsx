import {
  FiGithub,
  FiLinkedin
} from "react-icons/fi";

import { motion } from "framer-motion";


function Footer() {


  return (

    <footer
      className="
        border-t
        border-gray-200
        py-10
        bg-white
      "
    >


      <motion.div

        initial={{
          opacity: 0,
          y: 20
        }}

        whileInView={{
          opacity: 1,
          y: 0
        }}

        viewport={{
          once: true,
          amount: 0.2
        }}

        transition={{
          duration: 0.4
        }}

        className="
          container
          text-center
        "

      >



        <p className="text-gray-500">


          © 2026{" "}


          <span
            className="
              font-bold
              text-blue-600
            "
          >

            Tharun H S

          </span>


          . All Rights Reserved.


        </p>




        <p
          className="
            mt-3
            text-sm
            text-gray-400
          "
        >

          Built with React, Tailwind CSS and modern web technologies.

        </p>





        <div
          className="
            flex
            justify-center
            gap-6
            mt-6
          "
        >



          <a

            href="https://github.com/Tharun1208"

            target="_blank"

            rel="noopener noreferrer"

            className="
              text-gray-500
              hover:text-blue-600
              hover:-translate-y-1
              transition-transform
              duration-200
            "

          >

            <FiGithub size={24} />

          </a>






          <a

            href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"

            target="_blank"

            rel="noopener noreferrer"

            className="
              text-gray-500
              hover:text-blue-600
              hover:-translate-y-1
              transition-transform
              duration-200
            "

          >

            <FiLinkedin size={24} />

          </a>



        </div>





        <p

          className="
            mt-6
            text-xs
            text-gray-400
          "

        >

          Designed & Developed by Tharun 🚀

        </p>





      </motion.div>


    </footer>


  );

}


export default Footer;