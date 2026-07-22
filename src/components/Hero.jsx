import {
    FiGithub,
    FiLinkedin,
    FiFileText
} from "react-icons/fi";

import { motion } from "framer-motion";


function Hero() {


    return (

        <section
            className="
                min-h-screen
                flex
                items-center
                pt-24
            "
        >


            <div
                className="
                    container
                    grid
                    md:grid-cols-2
                    gap-12
                    items-center
                "
            >




                {/* LEFT CONTENT */}



                <motion.div

                    initial={{
                        opacity: 0,
                        x: -40
                    }}

                    animate={{
                        opacity: 1,
                        x: 0
                    }}

                    transition={{
                        duration: 0.5
                    }}

                >



                    <p
                        className="
                            text-blue-600
                            font-semibold
                            text-lg
                            mb-4
                        "
                    >

                        Hello, I'm

                    </p>





                    <h1

                        className="
                            text-5xl
                            md:text-6xl
                            font-bold
                            leading-tight
                            text-gray-900
                        "

                    >

                        Tharun H S

                    </h1>







                    <h2

                        className="
                            text-3xl
                            md:text-4xl
                            font-semibold
                            mt-4
                            text-gray-700
                        "

                    >

                        Full Stack Developer

                    </h2>







                    <p

                        className="
                            mt-6
                            text-gray-500
                            text-lg
                            leading-8
                            max-w-xl
                        "

                    >

                        I build scalable and responsive web applications
                        using React, Node.js, Express.js, and MongoDB.
                        Passionate about software development, problem solving,
                        and exploring AI technologies.

                    </p>







                    <div

                        className="
                            flex
                            gap-5
                            mt-8
                            flex-wrap
                        "

                    >





                        <a

                            href="#projects"

                            className="
                                bg-blue-600
                                text-white
                                px-7
                                py-3
                                rounded-lg
                                font-medium
                                hover:bg-blue-700
                                hover:-translate-y-1
                                transition-transform
                                duration-200
                            "

                        >

                            View Projects

                        </a>






                        <a

                            href="/resume.pdf"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="
                                border
                                border-gray-300
                                px-7
                                py-3
                                rounded-lg
                                font-medium
                                flex
                                items-center
                                gap-2
                                hover:bg-blue-600
                                hover:text-white
                                hover:border-blue-600
                                hover:-translate-y-1
                                transition-transform
                                duration-200
                            "

                        >

                            <FiFileText size={20} />

                            View Resume


                        </a>




                    </div>







                    <div

                        className="
                            flex
                            gap-5
                            mt-8
                        "

                    >



                        <a

                            href="https://github.com/Tharun1208"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="
                                text-gray-600
                                hover:text-blue-600
                                hover:-translate-y-1
                                transition-transform
                                duration-200
                            "

                        >

                            <FiGithub size={30} />

                        </a>







                        <a

                            href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"

                            target="_blank"

                            rel="noopener noreferrer"

                            className="
                                text-gray-600
                                hover:text-blue-600
                                hover:-translate-y-1
                                transition-transform
                                duration-200
                            "

                        >

                            <FiLinkedin size={30} />

                        </a>



                    </div>




                </motion.div>









                {/* IMAGE */}





                <motion.div


                    initial={{
                        opacity: 0,
                        x: 40
                    }}


                    animate={{
                        opacity: 1,
                        x: 0
                    }}


                    transition={{
                        duration: 0.5
                    }}


                    className="
                        flex
                        justify-center
                    "

                >





                    <div

                        className="
                            relative
                        "

                    >




                        <div

                            className="
                                absolute
                                inset-0
                                bg-blue-300
                                rounded-full
                                blur-3xl
                                opacity-40
                            "

                        />







                        <img

                            src="/profile.png"

                            alt="Tharun"

                            loading="lazy"

                            className="
                                relative
                                w-72
                                h-72
                                md:w-96
                                md:h-96
                                object-cover
                                rounded-full
                                border-8
                                border-white
                                shadow-xl
                            "

                        />




                    </div>





                </motion.div>





            </div>


        </section>


    );

}


export default Hero;