import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCpu,
  FiTool,
  FiZap
} from "react-icons/fi";

import { motion } from "framer-motion";



const skillGroups = [

  {
    title: "Frontend Development",

    icon: <FiCode />,

    skills: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "React.js",
      "Tailwind CSS"
    ]
  },


  {
    title: "Backend Development",

    icon: <FiServer />,

    skills: [
      "Node.js",
      "Express.js",
      "REST API",
      "JWT Authentication"
    ]
  },


  {
    title: "Database",

    icon: <FiDatabase />,

    skills: [
      "MongoDB",
      "MySQL"
    ]
  },


  {
    title: "Programming Languages",

    icon: <FiCpu />,

    skills: [
      "Java",
      "Python",
      "JavaScript"
    ]
  },


  {
    title: "Tools & Technologies",

    icon: <FiTool />,

    skills: [
      "Git",
      "GitHub",
      "VS Code",
      "Postman",
      "MongoDB Atlas"
    ]
  },


  {
    title: "Other Skills",

    icon: <FiZap />,

    skills: [
      "Data Structures",
      "Problem Solving",
      "API Integration",
      "Responsive Design",
      "AI Concepts"
    ]
  }

];





function Skills() {


  return (


    <section
      id="skills"
      className="
        py-24
        bg-gray-50
      "
    >



      <div className="container">





        {/* Heading */}


        <motion.div


          initial={{
            opacity: 0,
            y: -30
          }}


          whileInView={{
            opacity: 1,
            y: 0
          }}


          viewport={{
            once: true
          }}


          transition={{
            duration: 0.4
          }}


          className="
            text-center
          "


        >



          <h2

            className="
              text-4xl
              font-bold
              gradient-text
            "

          >

            Technical Skills


          </h2>




          <p

            className="
              mt-4
              text-gray-500
              text-lg
            "

          >

            Technologies and tools I work with


          </p>



        </motion.div>









        {/* Skill Cards */}



        <div

          className="
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
            mt-12
          "

        >



          {

            skillGroups.map((group, index) => (



              <motion.div



                key={group.title}



                initial={{

                  opacity: 0,

                  y: 40

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


                  duration: 0.4,

                  delay: index * 0.1


                }}



                whileHover={{


                  y: -12,

                  scale: 1.03


                }}



                className="

                  bg-white

                  p-7

                  rounded-2xl

                  border

                  border-gray-100

                  shadow-sm

                  group

                  hover:shadow-2xl

                  hover:shadow-blue-100

                  transition-shadow

                  duration-200

                "


              >







                {/* Icon */}



                <div


                  className="

                    w-12

                    h-12

                    flex

                    items-center

                    justify-center

                    rounded-xl

                    bg-blue-100

                    text-blue-600

                    text-2xl

                    mb-5

                    group-hover:bg-blue-600

                    group-hover:text-white

                    group-hover:rotate-6

                    transition-all

                    duration-200

                  "


                >


                  {group.icon}


                </div>










                {/* Skill Title */}



                <h3


                  className="

                    text-xl

                    font-semibold

                    text-gray-900

                    group-hover:text-blue-600

                    transition

                  "


                >


                  {group.title}


                </h3>









                {/* Skill Tags */}



                <div


                  className="

                    flex

                    flex-wrap

                    gap-3

                    mt-5

                  "


                >



                  {


                    group.skills.map((skill) => (



                      <motion.span



                        key={skill}



                        whileHover={{

                          scale: 1.1

                        }}



                        className="

                          px-4

                          py-2

                          bg-gray-100

                          rounded-full

                          text-sm

                          text-gray-700

                          hover:bg-blue-600

                          hover:text-white

                          cursor-default

                          transition-colors

                          duration-200

                        "


                      >


                        {skill}


                      </motion.span>



                    ))



                  }



                </div>







              </motion.div>



            ))



          }



        </div>






      </div>



    </section>


  );


}



export default Skills;