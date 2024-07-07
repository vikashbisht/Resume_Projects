import image from "../assets/banner2.jpg"

const About = () => {
  return (
    <div>
      <h1 className="text-3xl text-center text-pink-600 font-bold mt-6">
        {" "}
        About Us{" "}
      </h1>
      <p className="text-center text-white text-lg mt-6">
        {" "}
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores,
        laudantium quidem. Expedita delectus cupiditate sit deleniti, eos esse
        sapiente cum neque aut perspiciatis officia ipsam eveniet commodi
        laudantium accusamus est! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Facilis unde fugit tenetur ab minima animi vitae et
        aut iusto accusamus sunt delectus placeat possimus velit nulla,
        laudantium iste inventore fuga.{" "}
      </p>
      <div className="flex items-center justify-center">
      <img src={image} className="h-[70vh] w-[70%] mt-8" />  
      </div>
      
    </div>
  );
};
export default About;
