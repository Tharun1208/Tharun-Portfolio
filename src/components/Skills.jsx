import {
  FiCode,
  FiServer,
  FiDatabase,
  FiCpu,
  FiTool,
  FiZap
} from "react-icons/fi";


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


        <div className="text-center">


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


        </div>






        {/* Cards */}



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
            skillGroups.map((group)=>(


              <div

                key={group.title}

                className="
                  bg-white
                  p-7
                  rounded-2xl
                  border
                  border-gray-100
                  shadow-sm
                  group
                  hover:-translate-y-3
                  hover:shadow-2xl
                  hover:shadow-blue-100
                  transition-all
                  duration-500
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
                    duration-300
                  "
                >

                  {group.icon}

                </div>







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







                <div
                  className="
                    flex
                    flex-wrap
                    gap-3
                    mt-5
                  "
                >


                  {
                    group.skills.map((skill)=>(


                      <span

                        key={skill}

                        className="
                          px-4
                          py-2
                          bg-gray-100
                          rounded-full
                          text-sm
                          text-gray-700
                          hover:bg-blue-600
                          hover:text-white
                          hover:scale-110
                          cursor-default
                          transition-all
                          duration-300
                        "

                      >

                        {skill}

                      </span>


                    ))
                  }


                </div>




              </div>


            ))
          }



        </div>



      </div>



    </section>


  );

}


export default Skills;