import { useEffect, useState } from "react";
import Cards from "./Cards";
import {Link} from "react-router-dom";
import axios from "axios";

const Course = () => {

  const [book, setBook] = useState([]);
  useEffect(() => {
    const getBook = async () => {
      try{
        const response = await axios.get('http://localhost:4001/book')
        setBook(response.data);
      }
      catch(error){
        console.log(error);
      }
    }
    getBook();
  }
  ,[])


  return (
    <>
      <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
        <div className="mt-28 items-center justify-center text-center">
          <h1 className="text-2xl  md:text-4xl">
            We're delighted to have you{" "}
            <span className="text-pink-400"> Here! :)</span>
          </h1>
          <p className="mt-12">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi,
            commodi omnis veniam esse impedit dolore, laboriosam aut quas
            aliquam quibusdam molestias fugit molestiae velit iste. Ipsa
            explicabo atque non expedita? Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Sint esse architecto, dolorum, exercitationem cum
            non deleniti nobis porro quasi omnis laudantium, quam saepe sed
            voluptas modi officiis reiciendis velit. Earum!
          </p>
          <Link to="/">
          <button className="mt-6 bg-pink-400 text-white px-4 py-2 rounded-md hover:bg-pink-600">Home</button>
          </Link>
        </div>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-4">
            {
                book.map((item) => (
                    <Cards item={item} key={item.id} />
                ))
            }
        </div>
      </div>
    </>
  );
};
export default Course;
