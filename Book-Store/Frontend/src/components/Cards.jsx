const Cards = ({item}) => {
  return (
    <>
      <div className="mt-4 my-3 p-4">
        <div className="card bg-base-100 w-92 shadow-xl hover:scale-105 duration-200">
          <figure>
            <img
              src={item.image}
              alt="Books"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">
              {item.name}
              <div className="badge badge-secondary">{item.category}</div>
            </h2>
            <p>{item.title}</p>
            <div className="card-actions justify-between">
              <div className="badge badge-outline h-8 w-18">Rs.{item.price}</div>
              <div className="badge badge-outline hover:bg-pink-400 hover:text-white px-1 py-1 h-8 w-20 cursor-pointer">Buy Now</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Cards;
