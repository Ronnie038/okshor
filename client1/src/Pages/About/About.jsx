import image from "../../assets/Banner/Banner.png";
import image2 from "../../assets/Banner/imag-2.png";
import { Icon } from "@iconify/react";
import image3 from "../../assets/Banner/image-3.jpg";
import { setDocumentTitle } from "../../Components/UseDocumentTitle/UseDocumentTitle";
const About = () => {
  setDocumentTitle(`অক্ষর | About`);

  return (
    <div className="">
      <div className="">
        <div
          className=" w-full  h-96 bg-cover flex-col relative flex  bg-no-repeat"
          style={{
            backgroundImage: `url(${image})`,
          }}
        >
          <div className="flex bg-transparent absolute top-40 left-[25%]">
            <h1 className=" bg-transparent  text-[rgb(241,241,245)] ">
              <p className="bg-transparent font-semibold ">
                {" "}
                <span className="bg-transparent text-red-600">
                  {" "}
                  Company About
                </span>
              </p>
              <p className="bg-transparent text-5xl font-bold">Company About</p>
            </h1>
          </div>
        </div>
      </div>

      <div className="mt-8 w-10/12 mx-auto">
        <div className="flex  flex-col mx-5 lg:mx-5 gap-20 lg:flex-row">
          <div className="relative">
            <div className="flex gap-5">
              <div>
                <img className="w-[400px] h-[400px] " src={image2} alt="" />
              </div>

              <div>
                <img className="w-[350px] h-[300px] " src={image2} alt="" />
              </div>
            </div>
            <div className=" bg-red-500 absolute top-[44%] left-[42%] text-center p-8    bg-transparent">
              <p className="bg-transparent my-3 text-white">
                <span className="text-5xl bg-transparent font-bold">180+</span>{" "}
                <br /> Get National <br /> Award
              </p>
            </div>
          </div>
          <div className="">
            <h1 className="font-semibold leading-10 mt-6 text-[rgb(250,76,49)]">
              ABOUT OUR COMPANY
            </h1>
            <p>
              <span className="text-5xl bg-transparent font-bold mt-4 text-black">
                Find Out More About
                <br /> Our Business Consulting
              </span>{" "}
              <br /> <br />
              <p className="mt-4 leading-6">
                আপনি কোনও নির্দিষ্ট বিষয়ে বা সেই বিষয়গুলির সাথে সম্প্রতি ঘটা
                ঘটনা বা <br /> বাংলাদেশের সার্কুলার বিষয়ে কোনও প্রশ্ন বা তথ্য
                চান, তাহলে দয়া করে সম্পর্ককরে <br /> জিজ্ঞাসআপনি কোনও নির্দিষ্ট
                বিষয়ে বা সেই বিষয়গুলির
              </p>
            </p>
            <div className="border w-56 p-4 mt-10 rounded bg-[rgb(250,76,49)] flex justify-center items-center gap-2 ">
              <button className="font-semibold text-white  text-xl">
                READ MORE
              </button>
              <Icon
                className="text-xl bg-[rgb(250,76,49)] text-white"
                icon="mdi:arrow-right-bold"
              />
            </div>
          </div>
          <div></div>
        </div>
        <div className="flex flex-col mx-5 lg:mx-5 mt-10 lg:flex-row gap-32">
          <div className="">
            <h1 className="font-semibold leading-10 mt-2 text-[rgb(250,76,49)]">
              WHO WE ARE
            </h1>
            <p className="mt-4">
              <span className="text-5xl bg-transparent font-semibold  text-black">
                Best Company <br /> Especially In Business
              </span>
              <br /> <br />
              <p className="mt-6 leading-7">
                আপনি কোনও নির্দিষ্ট বিষয়ে বা সেই বিষয়গুলির সাথে সম্প্রতি ঘটা
                ঘটনা বা বাংলাদেশের সার্কুলার বিষয়ে কোনও প্রশ্ন বা তথ্য চান,
                তাহলে দয়া করে <br /> সম্পর্ককরে জিজ্ঞাসআপনি কোনও নির্দিষ্ট
                বিষয়ে বা সেই বিষয়গুলির সাথে সম্প্রতি ঘটা
              </p>
            </p>
            <div className="border w-64 p-4 mt-8 rounded  flex justify-center items-center gap-2 ">
              <button className="font-semibold text-xl">DISCOVER MORE</button>
              <Icon className="text-xl" icon="mdi:arrow-right-bold" />
            </div>
          </div>
          <div className="">
            <img src={image3} alt="" />
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
