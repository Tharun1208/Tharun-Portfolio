import { motion } from "framer-motion";

import {
  FiCode,
  FiLayers,
  FiBriefcase,
  FiBookOpen,
  FiFileText
} from "react-icons/fi";


function About() {


  const stats = [

    {
      number:"10+",
      title:"Technologies",
      icon:<FiCode/>
    },

    {
      number:"5+",
      title:"Projects",
      icon:<FiLayers/>
    },

    {
      number:"1+",
      title:"Internship",
      icon:<FiBriefcase/>
    },

    {
      number:"100%",
      title:"Learning",
      icon:<FiBookOpen/>
    }

  ];



  return (


    <section
      id="about"
      className="py-24"
    >


      <div className="container">


        <div
          className="
            grid
            md:grid-cols-2
            gap-12
            items-center
          "
        >



          {/* LEFT CONTENT */}


          <motion.div

            initial={{
              opacity:0,
              x:-40
            }}

            whileInView={{
              opacity:1,
              x:0
            }}

            viewport={{
              once:true,
              amount:0.2
            }}

            transition={{
              duration:0.5,
              ease:"easeOut"
            }}

          >



            <h2
              className="
                text-4xl
                font-bold
                gradient-text
              "
            >
              About Me
            </h2>



            <div
              className="
                w-16
                h-1
                bg-blue-600
                mt-4
                rounded-full
              "
            />




            <p
              className="
                mt-6
                text-gray-600
                leading-8
                text-lg
              "
            >
              I am a Computer Science Engineering student passionate about
              Full Stack Development and building real-world software solutions.
            </p>




            <p
              className="
                mt-5
                text-gray-600
                leading-8
                text-lg
              "
            >
              My skills include developing modern web applications using
              React, Node.js, Express.js, and MongoDB. I enjoy creating
              responsive user interfaces, scalable backend systems, and
              exploring AI-based technologies.
            </p>




            <p
              className="
                mt-5
                text-gray-600
                leading-8
                text-lg
              "
            >
              I continuously improve my technical skills through practical
              projects, learning new technologies, and solving real-world
              programming challenges.
            </p>





            <motion.a

              whileHover={{
                scale:1.04,
                y:-2
              }}

              whileTap={{
                scale:0.96
              }}

              href="/resume.pdf"

              target="_blank"

              rel="noopener noreferrer"

              className="
                inline-flex
                items-center
                gap-2
                mt-8
                bg-blue-600
                text-white
                px-7
                py-3
                rounded-xl
                shadow-md
                hover:bg-blue-700
                transition
                duration-200
              "

            >

              <FiFileText/>

              View Resume


            </motion.a>



          </motion.div>







          {/* STATS */}



          <motion.div


            initial={{
              opacity:0,
              x:40
            }}


            whileInView={{
              opacity:1,
              x:0
            }}


            viewport={{
              once:true,
              amount:0.2
            }}


            transition={{
              duration:0.5
            }}


            className="
              grid
              grid-cols-2
              gap-5
            "

          >



            {
              stats.map((item,index)=>(



                <motion.div

                  key={index}


                  initial={{
                    opacity:0,
                    y:20
                  }}


                  whileInView={{
                    opacity:1,
                    y:0
                  }}


                  viewport={{
                    once:true
                  }}


                  transition={{
                    duration:0.4,
                    delay:index*0.08
                  }}


                  whileHover={{
                    y:-8,
                    scale:1.03
                  }}


                  className="
                    bg-white
                    p-6
                    rounded-2xl
                    text-center
                    border
                    border-gray-100
                    shadow-sm
                    hover:shadow-xl
                    hover:shadow-blue-100
                    transition-shadow
                    duration-200
                    will-change-transform
                  "

                >



                  <div
                    className="
                      mx-auto
                      w-12
                      h-12
                      flex
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-100
                      text-blue-600
                      text-2xl
                      mb-4
                    "
                  >

                    {item.icon}

                  </div>





                  <h3
                    className="
                      text-3xl
                      font-bold
                      text-blue-600
                    "
                  >

                    {item.number}

                  </h3>





                  <p
                    className="
                      mt-2
                      text-gray-600
                    "
                  >

                    {item.title}

                  </p>



                </motion.div>


              ))
            }



          </motion.div>



        </div>



      </div>


    </section>


  );


}


export default About;