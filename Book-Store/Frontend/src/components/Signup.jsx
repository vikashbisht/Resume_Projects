import { Link, useLocation, useNavigate } from "react-router-dom"
import Login from "./Login"
import { useForm } from "react-hook-form"
import axios from "axios";
import toast from "react-hot-toast";

const Signup = () => {

    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname || "/";

    const{
        register,
        handleSubmit,
        formState: { errors }
      } = useForm();
      
      const onSubmit = async (data) => {
        const userInfo = {
          fullname:data.fullname,
          email:data.email,
          password:data.password
        }

        await axios.post("http://localhost:4001/user/signup", userInfo)
        .then((response) => {
          console.log(response.data);
          if(response.data){
          toast.success("User Registered Successfully");
          navigate(from), { replace: true };
        }
        localStorage.setItem("Users", JSON.stringify(response.data.user));
        }).catch((error) => {
          if(error.response){
            toast.error(error.response.data.message);
          }
        });
      };


  return (
    <>
    <div className="flex h-screen items-center justify-center">
    <div className=" w-[450px] shadow-md p-5 rounded-m">
        <div className="">
          <form  onSubmit={handleSubmit(onSubmit)} method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <Link to="/">
            <button className="underline text-blue-500 cursor-pointer">
              Home
            </button>
            </Link>
          <h3 className="font-bold text-2xl">Sign Up</h3>
          <div className="mt-4 space-y-2 w-sc">
            <span>Name</span>
            <br />
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-3 py-1 h-10 border rounded-md outline-none"
              {...register("fullname", { required: true })}
            />
            {errors.fullname && <span className="text-red-500">This field is required</span>}
            <br />
          </div>
          <div className="mt-4 space-y-2">
            <span>Email</span>
            <br />
            <input
              type="email"
              placeholder="Enter your e-mail"
              className="w-full px-3 py-1 h-10 border rounded-md outline-none"
              {...register("email", { required: true })}
            />
            <br />
            {errors.email && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="mt-4 space-y-2">
            <span>Password</span>
            <br />
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-1 h-10 border rounded-md outline-none"
              {...register("password", { required: true })}
            />
            <br/>
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
          <div className=" flex justify-between">
            <button className=" bg-blue-400 mt-4 text-white p-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer">Sign Up</button>
            <p className="mt-6">Have account? 
            <span className="underline text-blue-500 cursor-pointer" onClick={()=>document.getElementById("my_modal_3").showModal() }>Login Here</span>{" "}</p>
            <Login />
          </div>
          </form>
        </div>
      </div>
    </div>
    </>
  )
}
export default Signup