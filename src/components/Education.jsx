import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";


function Education() {


  const education = [

    {
      degree: "Bachelor of Engineering (B.E) - Computer Science",
      college: "Garden City University",
      duration: "2023 - Present",
      details:
        "Currently pursuing Computer Science Engineering with focus on Full Stack Development, Artificial Intelligence, Data Structures, and Software Engineering."
    },


    {
      degree: "Pre-University Education",
      college: "Jnana Bharathi PU College",
      duration: "2021 - 2023",
      details:
        "Completed higher secondary education with a strong foundation in mathematics, science, logical thinking, and programming concepts."
    },


    {
      degree: "Secondary Education",
      college: "Morarji Desai Residential School",
      duration: "Completed",
      details:
        "Built strong fundamentals in mathematics, science, communication skills, and problem-solving abilities."
    }

  ];




  return (


    <section
      id="education"
      className="
        py-24
        bg-white
      "
    >



      <div className="container">





        {/* Heading */}


        <motion.div

          initial={{
            opacity:0,
            y:-30
          }}

          whileInView={{
            opacity:1,
            y:0
          }}

          viewport={{
            once:true
          }}

          transition={{
            duration:0.6
          }}

          className="text-center"

        >


          <h2
            className="
              text-4xl
              font-bold
              text-gray-900
            "
          >

            Education

          </h2>



          <p
            className="
              mt-4
              text-gray-500
            "
          >

            Academic background and learning journey

          </p>



        </motion.div>









        {/* Education Cards */}



        <div
          className="
            mt-12
            grid
            md:grid-cols-2
            lg:grid-cols-3
            gap-8
          "
        >




        {

          education.map((item,index)=>(



            <motion.div


              key={index}



              initial={{
                opacity:0,
                y:50
              }}



              whileInView={{
                opacity:1,
                y:0
              }}



              viewport={{
                once:true
              }}



              transition={{
                duration:0.6,
                delay:index*0.2
              }}




              whileHover={{
                y:-10,
                scale:1.03
              }}




              className="
                bg-gray-50
                p-6
                rounded-xl
                border
                border-transparent
                hover:border-blue-200
                hover:shadow-xl
                transition-all
                duration-300
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
                  rounded-full
                  bg-blue-100
                  text-blue-600
                  mb-5
                  hover:bg-blue-600
                  hover:text-white
                  transition
                "
              >

                <FiBookOpen size={24}/>


              </div>









              <h3

                className="
                  text-xl
                  font-bold
                  text-gray-900
                "

              >

                {item.degree}

              </h3>







              <p

                className="
                  mt-3
                  text-blue-600
                  font-medium
                "

              >

                {item.college}

              </p>









              <span

                className="
                  inline-block
                  mt-3
                  px-3
                  py-1
                  rounded-full
                  text-sm
                  bg-blue-50
                  text-blue-600
                  hover:bg-blue-600
                  hover:text-white
                  transition
                "

              >

                {item.duration}

              </span>









              <p

                className="
                  mt-4
                  text-gray-600
                  leading-7
                "

              >

                {item.details}

              </p>





            </motion.div>



          ))

        }





        </div>






      </div>



    </section>


  );

}



export default Education;