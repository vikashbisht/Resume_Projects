import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Cards from "./Cards";

const FreeBooks = () => {

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

  const filterData = book.filter((item) => item.category === "Free");

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <>
      <div className="max-w-screen-2xl container mt-4 mx-auto md:px-20 px-4">
        <div>
        <h1 className="font-semibold text-xl pb-3 mt-8 md:mt-0"> Free E-books</h1>
        <p className="pb-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus,
          facilis odit odio rem incidunt voluptas nihil? Minima eius, nihil unde
          expedita dolor explicabo maiores? Ullam aspernatur perspiciatis animi
          officiis reiciendis.
        </p>
        </div>
      <div>
      <Slider {...settings}>
        {filterData.map((item) => (
          <Cards item={item} key={item.id} />
        ))}
      </Slider>
      </div>
      </div>
    </>
  );
};
export default FreeBooks;
