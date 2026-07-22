import { motion } from "framer-motion";


function Experience() {


    const experiences = [


        {
            title: "Full Stack Developer Intern",
            company: "Internship Experience",
            duration: "2026",
            description:
                "Worked on developing modern web applications using React, Node.js, Express.js, and MongoDB. Focused on responsive UI development, API integration, and improving full-stack development skills."
        },


        {
            title: "MERN Stack Developer",
            company: "Personal Projects",
            duration: "2025 - Present",
            description:
                "Developed full-stack applications including VideoVault and Watch Party using React, Node.js, Express.js, MongoDB, and real-time technologies."
        },


        {
            title: "Learning & Skill Development",
            company: "Self Learning",
            duration: "2023 - Present",
            description:
                "Continuously improving programming skills through practical projects, exploring new technologies, and learning AI and software development concepts."
        }


    ];





    return (


        <section
            id="experience"
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
                        y: 20
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

                    className="text-center"

                >


                    <h2
                        className="
text-4xl
font-bold
text-gray-900
"
                    >

                        Experience

                    </h2>



                    <p
                        className="
mt-4
text-gray-500
"
                    >

                        My development journey

                    </p>


                </motion.div>








                {/* Timeline */}



                <div
                    className="
mt-12
relative
ml-4
"
                >


                    {/* Line */}


                    <div
                        className="
absolute
left-0
top-0
bottom-0
w-[2px]
bg-blue-600
"
                    />





                    <div
                        className="
space-y-10
"
                    >



                        {

                            experiences.map((item, index) => (


                                <motion.div


                                    key={index}



                                    initial={{
                                        opacity: 0,
                                        x: -30
                                    }}



                                    whileInView={{
                                        opacity: 1,
                                        x: 0
                                    }}



                                    viewport={{
                                        once: true
                                    }}



                                    transition={{
                                        duration: 0.4,
                                        delay: index * 0.1
                                    }}



                                    className="
relative
pl-10
"


                                >







                                    {/* Dot */}


                                    <motion.div

                                        whileHover={{
                                            scale: 1.2
                                        }}

                                        className="
absolute
-left-[9px]
top-2
w-5
h-5
rounded-full
bg-blue-600
border-4
border-white
shadow-md
"

                                    />








                                    {/* Card */}



                                    <motion.div


                                        whileHover={{
                                            y: -6
                                        }}



                                        transition={{
                                            duration: 0.2
                                        }}



                                        className="
bg-white
p-6
rounded-xl
border
border-gray-100
shadow-sm
hover:shadow-lg
transition-shadow
duration-200
"

                                    >



                                        <div
                                            className="
flex
justify-between
flex-wrap
gap-3
"
                                        >



                                            <h3
                                                className="
text-xl
font-bold
text-gray-900
hover:text-blue-600
transition
"
                                            >

                                                {item.title}

                                            </h3>





                                            <span

                                                className="
text-sm
px-3
py-1
rounded-full
bg-blue-50
text-blue-600
"

                                            >

                                                {item.duration}

                                            </span>



                                        </div>







                                        <p
                                            className="
mt-3
text-blue-600
font-medium
"
                                        >

                                            {item.company}

                                        </p>







                                        <p
                                            className="
mt-4
text-gray-600
leading-7
"
                                        >

                                            {item.description}

                                        </p>





                                    </motion.div>





                                </motion.div>



                            ))

                        }



                    </div>





                </div>





            </div>


        </section>


    );


}


export default Experience;