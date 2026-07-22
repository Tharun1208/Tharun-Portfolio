import {
    FiMail,
    FiGithub,
    FiLinkedin,
    FiFileText,
    FiSend,
    FiCheckCircle,
    FiAlertCircle
} from "react-icons/fi";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { motion, AnimatePresence } from "framer-motion";


function Contact() {


    const form = useRef();

    const [loading, setLoading] = useState(false);

    const [status, setStatus] = useState("");



    const sendEmail = (e) => {

        e.preventDefault();

        setLoading(true);


        emailjs.sendForm(
            "service_lxelcoi",
            "template_8ihz4bu",
            form.current,
            "Ll5PRpBwenJErbzcC"
        )


        .then(() => {


            setStatus("success");

            form.current.reset();


            setTimeout(() => {

                setStatus("");

            },5000);


        })


        .catch(() => {


            setStatus("error");


            setTimeout(() => {

                setStatus("");

            },5000);


        })


        .finally(() => {

            setLoading(false);

        });


    };




    return (

        <section
            id="contact"
            className="py-24 bg-gray-50"
        >


            <div className="container">


                {/* Heading */}


                <motion.div

                    initial={{
                        opacity:0,
                        y:-40
                    }}

                    whileInView={{
                        opacity:1,
                        y:0
                    }}

                    viewport={{
                        once:true
                    }}

                    transition={{
                        duration:0.7
                    }}

                    className="text-center"

                >


                    <h2 className="
                        text-4xl
                        font-bold
                        text-gray-900
                    ">

                        Contact Me

                    </h2>



                    <p className="
                        mt-4
                        text-gray-500
                    ">

                        Let's connect and build something amazing

                    </p>


                </motion.div>






                <div className="
                    mt-12
                    grid
                    md:grid-cols-2
                    gap-10
                ">





                    {/* CONTACT INFORMATION */}



                    <motion.div


                        initial={{
                            opacity:0,
                            x:-80
                        }}


                        whileInView={{
                            opacity:1,
                            x:0
                        }}


                        viewport={{
                            once:true
                        }}


                        transition={{
                            duration:0.8
                        }}


                        whileHover={{
                            y:-10
                        }}


                        className="
                            bg-white
                            p-8
                            rounded-xl
                            shadow-sm
                            hover:shadow-2xl
                            transition-all
                            duration-300
                        "

                    >



                        <h3 className="
                            text-2xl
                            font-bold
                            text-gray-900
                        ">

                            Get In Touch

                        </h3>




                        <p className="
                            mt-4
                            text-gray-600
                            leading-7
                        ">

                            I am interested in software development opportunities,
                            internships, and collaborative projects.

                        </p>





                        <div className="
                            mt-6
                            space-y-4
                        ">



                            <a
                                href="mailto:tharunhs1208@gmail.com"
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-gray-700
                                    hover:text-blue-600
                                    hover:translate-x-2
                                    transition-all
                                "
                            >

                                <FiMail
                                    size={22}
                                    className="text-blue-600"
                                />

                                tharunhs1208@gmail.com

                            </a>




                            <a
                                href="https://github.com/Tharun1208"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-gray-700
                                    hover:text-blue-600
                                    hover:translate-x-2
                                    transition-all
                                "
                            >

                                <FiGithub
                                    size={22}
                                    className="text-blue-600"
                                />

                                GitHub Profile

                            </a>





                            <a
                                href="https://www.linkedin.com/in/tharun-h-s-8590062a7/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="
                                    flex
                                    items-center
                                    gap-3
                                    text-gray-700
                                    hover:text-blue-600
                                    hover:translate-x-2
                                    transition-all
                                "
                            >

                                <FiLinkedin
                                    size={22}
                                    className="text-blue-600"
                                />

                                LinkedIn Profile

                            </a>



                        </div>






                        <a
                            href="/resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="
                                mt-8
                                inline-flex
                                items-center
                                gap-2
                                bg-blue-600
                                text-white
                                px-6
                                py-3
                                rounded-lg
                                
                                shadow-lg
                                shadow-blue-200

                                hover:bg-blue-700
                                hover:scale-105
                                hover:-translate-y-1

                                transition-all
                                duration-300
                            "
                        >

                            <FiFileText/>

                            View Resume

                        </a>



                    </motion.div>









                    {/* FORM */}





                    <motion.div


                        initial={{
                            opacity:0,
                            x:80
                        }}


                        whileInView={{
                            opacity:1,
                            x:0
                        }}


                        viewport={{
                            once:true
                        }}


                        transition={{
                            duration:0.8
                        }}


                        whileHover={{
                            y:-10
                        }}



                        className="
                            bg-white
                            p-8
                            rounded-xl
                            shadow-sm
                            hover:shadow-2xl
                            transition-all
                            duration-300
                        "

                    >



                        <h3 className="
                            text-2xl
                            font-bold
                            text-gray-900
                        ">

                            Send Message

                        </h3>






                        <AnimatePresence>


                            {
                                status==="success" &&

                                <motion.div

                                    initial={{
                                        opacity:0,
                                        scale:0.8,
                                        y:-20
                                    }}

                                    animate={{
                                        opacity:1,
                                        scale:1,
                                        y:0
                                    }}

                                    exit={{
                                        opacity:0
                                    }}

                                    className="
                                        mt-5
                                        p-5
                                        rounded-xl
                                        bg-green-100
                                        border
                                        border-green-300
                                        text-green-700
                                        flex
                                        gap-3
                                        items-center
                                        shadow-md
                                    "

                                >

                                    <FiCheckCircle
                                        size={30}
                                    />

                                    <div>

                                        <h4 className="font-bold">
                                            Message Sent Successfully!
                                        </h4>

                                        <p className="text-sm">
                                            Thank you for contacting me.
                                            I will reply soon.
                                        </p>

                                    </div>


                                </motion.div>

                            }


                        </AnimatePresence>






                        {
                            status==="error" &&

                            <motion.div

                                initial={{
                                    opacity:0,
                                    x:50
                                }}

                                animate={{
                                    opacity:1,
                                    x:0
                                }}

                                className="
                                    mt-5
                                    p-5
                                    rounded-xl
                                    bg-red-100
                                    border
                                    border-red-300
                                    text-red-700
                                    flex
                                    gap-3
                                    items-center
                                "

                            >

                                <FiAlertCircle size={30}/>


                                <div>

                                    <h4 className="font-bold">
                                        Message Failed
                                    </h4>

                                    <p>
                                        Please try again.
                                    </p>

                                </div>


                            </motion.div>

                        }







                        <form
                            ref={form}
                            onSubmit={sendEmail}
                            className="
                                mt-6
                                space-y-4
                            "
                        >



                            <input
                                name="name"
                                required
                                placeholder="Your Name"
                                className="
                                    w-full
                                    border
                                    p-3
                                    rounded-lg
                                    outline-none

                                    hover:border-blue-400

                                    focus:ring-2
                                    focus:ring-blue-500

                                    transition
                                "
                            />




                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Your Email"
                                className="
                                    w-full
                                    border
                                    p-3
                                    rounded-lg
                                    outline-none

                                    hover:border-blue-400

                                    focus:ring-2
                                    focus:ring-blue-500

                                    transition
                                "
                            />





                            <textarea
                                name="message"
                                rows="5"
                                required
                                placeholder="Your Message"
                                className="
                                    w-full
                                    border
                                    p-3
                                    rounded-lg
                                    outline-none

                                    hover:border-blue-400

                                    focus:ring-2
                                    focus:ring-blue-500

                                    transition
                                "
                            />






                            <motion.button

                                whileHover={{
                                    scale:1.1,
                                    y:-3
                                }}

                                whileTap={{
                                    scale:0.95
                                }}

                                disabled={loading}

                                className="
                                    flex
                                    items-center
                                    gap-2

                                    bg-blue-600
                                    text-white

                                    px-6
                                    py-3

                                    rounded-lg

                                    shadow-lg
                                    shadow-blue-200

                                    hover:bg-blue-700

                                    transition-all

                                    disabled:opacity-50
                                "

                            >

                                <FiSend/>


                                {
                                    loading
                                    ?
                                    "Sending..."
                                    :
                                    "Send Message"
                                }


                            </motion.button>



                        </form>



                    </motion.div>




                </div>


            </div>


        </section>


    );

}


export default Contact;