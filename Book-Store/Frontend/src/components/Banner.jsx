import banner from "../assets/banner2.jpg"
import toast from "react-hot-toast";

const Banner = () => {
  return (
    <>
      <div className=" max-w-screen-2xl container mx-auto md:px-20 px-4 flex flex-col md:flex-row mt-9">
        <div className="w-full order-2 md:order-1 md:w-1/2 mt-12 md:mt-28">
          <div className="space-y-12">
            <h1 className="text-4xl fontbold">
              Hello there. We welcome you to learn something{" "}
              <span className="text-pink-500">new everyday</span>.
            </h1>
            <p className="text-xl">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Accusantium dolores commodi quasi neque natus nam nostrum qui
              ipsum consequuntur voluptas? Aspernatur totam quos voluptatibus
              incidunt doloremque saepe iste iure consectetur.
            </p>
            <input
            type="text"
            placeholder="Enter your email.."
            className="input input-bordered input-secondary w-full max-w-2xl"
          />
          </div>
          <button onClick={()=>{toast.success("Subscribed successfully")}} className="btn btn-outline btn-secondary mt-4">Subscribe</button>
          
        </div>
        <div className=" order-1 w-full md:w-1/2 mt-28 ml-20">
        <img src={banner} className="w-90 h-90"/>
        </div>
      </div>
    </>
  );
};
export default Banner;
