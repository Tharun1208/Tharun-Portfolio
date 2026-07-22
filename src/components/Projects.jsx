import {
  FiGithub,
  FiExternalLink,
  FiMaximize2,
  FiX
} from "react-icons/fi";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";


import videovault from "../assets/projects/videovault.png";
import watchparty from "../assets/projects/watchparty.png";
import todolist from "../assets/projects/todolist.png";



const projects = [

  {
    title: "VideoVault",
    image: videovault,
    status: "Ongoing",

    description:
      "A controlled video platform with user authentication, profiles, subscription plans, dashboard management, and restricted download features. Backend development and API integration are in progress.",

    tech: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express",
      "MongoDB"
    ],

    github:
      "https://github.com/Tharun1208/Video-Download-Platform",

    demo: "#"

  },


  {
    title: "Watch Party Application",
    image: watchparty,
    status: "Completed",

    description:
      "A real-time video watching platform that allows users to create rooms, synchronize playback, communicate through chat, and interact with participants.",

    tech: [
      "React",
      "Node.js",
      "Express",
      "Socket.IO",
      "MongoDB"
    ],

    github:
      "https://github.com/Tharun1208/Watc-party-app",

    demo:
      "https://watch-partyy.netlify.app/"

  },


  {
    title: "Todo List Application",
    image: todolist,
    status: "Completed",

    description:
      "A responsive task management application that helps users create, update, delete, and organize daily tasks with a simple user-friendly interface.",

    tech: [
      "React",
      "JavaScript",
      "CSS",
      "Local Storage"
    ],

    github:
      "https://github.com/Tharun1208/MyProjects/tree/main/TODO%20list",

    demo: "#"

  }

];




function Projects() {


  const [selectedImage, setSelectedImage] = useState(null);



  return (


    <section
      id="projects"
      className="py-24"
    >


      <div className="container">



        <div className="text-center">


          <h2
            className="
text-4xl
font-bold
text-gray-900
"
          >

            Featured Projects

          </h2>



          <p
            className="
mt-4
text-gray-500
text-lg
"
          >

            Projects I have built and currently working on

          </p>


        </div>







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
            projects.map((project, index) => (



              <motion.div


                key={project.title}


                initial={{
                  opacity: 0,
                  y: 30
                }}


                whileInView={{
                  opacity: 1,
                  y: 0
                }}


                viewport={{
                  once: true
                }}


                transition={{
                  duration: 0.4,
                  delay: index * 0.1
                }}



                whileHover={{
                  y: -8
                }}



                className="
bg-white
rounded-xl
overflow-hidden
shadow-md
hover:shadow-xl
transition-shadow
duration-200
will-change-transform
"


              >







                {/* IMAGE */}



                <div

                  className="
relative
group
overflow-hidden
cursor-pointer
"


                  onClick={() =>
                    setSelectedImage(project.image)
                  }


                >



                  <img

                    src={project.image}

                    alt={project.title}


                    loading="lazy"


                    className="
w-full
h-48
object-cover
group-hover:scale-105
transition-transform
duration-300
"


                  />




                  <div

                    className="
absolute
inset-0
bg-black/40
opacity-0
group-hover:opacity-100
flex
items-center
justify-center
transition-opacity
duration-200
"

                  >


                    <FiMaximize2

                      size={32}

                      className="text-white"

                    />


                  </div>




                </div>








                {/* CONTENT */}



                <div className="p-6">



                  <div
                    className="
flex
justify-between
items-center
gap-3
"
                  >


                    <h3
                      className="
text-xl
font-bold
text-gray-900
"
                    >

                      {project.title}

                    </h3>



                    <span
                      className="
text-xs
px-3
py-1
rounded-full
bg-blue-50
text-blue-600
"
                    >

                      {project.status}

                    </span>



                  </div>







                  <p
                    className="
mt-4
text-gray-600
leading-7
"
                  >

                    {project.description}

                  </p>







                  <div
                    className="
flex
flex-wrap
gap-2
mt-5
"
                  >


                    {
                      project.tech.map(skill => (


                        <span

                          key={skill}

                          className="
text-sm
px-3
py-1
rounded-full
bg-gray-100
text-gray-700
hover:bg-blue-600
hover:text-white
transition-colors
duration-200
"

                        >

                          {skill}

                        </span>


                      ))

                    }


                  </div>








                  <div
                    className="
flex
gap-6
mt-6
"
                  >


                    <a

                      href={project.github}

                      target="_blank"

                      rel="noopener noreferrer"

                      className="
flex
items-center
gap-2
text-gray-700
hover:text-blue-600
transition-colors
"

                    >

                      <FiGithub />

                      Code

                    </a>





                    <a

                      href={project.demo}

                      target="_blank"

                      rel="noopener noreferrer"

                      className="
flex
items-center
gap-2
text-gray-700
hover:text-blue-600
transition-colors
"

                    >

                      <FiExternalLink />

                      Demo

                    </a>



                  </div>



                </div>




              </motion.div>



            ))

          }



        </div>




      </div>








      {/* IMAGE MODAL */}


      <AnimatePresence>

        {
          selectedImage && (


            <motion.div


              initial={{
                opacity: 0
              }}


              animate={{
                opacity: 1
              }}


              exit={{
                opacity: 0
              }}


              className="
fixed
inset-0
bg-black/70
z-50
flex
items-center
justify-center
p-5
"


              onClick={() =>
                setSelectedImage(null)
              }


            >



              <motion.img


                src={selectedImage}

                alt="Preview"


                initial={{
                  scale: 0.9
                }}


                animate={{
                  scale: 1
                }}


                exit={{
                  scale: 0.9
                }}


                transition={{
                  duration: 0.2
                }}


                className="
max-h-[85vh]
rounded-xl
shadow-xl
"


              />



              <button

                onClick={() =>
                  setSelectedImage(null)
                }

                className="
absolute
top-5
right-5
bg-white
p-2
rounded-full
hover:scale-105
transition
"

              >

                <FiX size={22} />

              </button>



            </motion.div>


          )

        }

      </AnimatePresence>



    </section>


  );

}


export default Projects;