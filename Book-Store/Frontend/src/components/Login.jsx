import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";

const Login = () => {

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
      email:data.email,
      password:data.password
    }

    await axios.post("http://localhost:4001/user/login", userInfo)
    .then((response) => {
      console.log(response.data);
      if(response.data){
        toast.success("Login Successfully");
        document.getElementById("my_modal_3").close();
        setTimeout(() => {
        window.location.reload();  
        localStorage.setItem("Users", JSON.stringify(response.data.user)); 
        }, 2000); 
        navigate(from), { replace: true };    
    }
    }).catch((error) => {
      if(error.response){
        toast.error(error.response.data.message);
        setTimeout(() => {}, 2000); 
      }
    });
  };

  return (
    <div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form onSubmit={handleSubmit(onSubmit)} method="dialog">
            <Link to="/">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={()=> document.getElementById("my_modal_3").close()}>
              ✕
            </button>
            </Link>
          <h3 className="font-bold text-2xl">Login</h3>
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
            <br />
            {errors.password && <span className="text-red-500">This field is required</span>}
          </div>
          <div className="flex justify-between">
            <button className=" bg-blue-400 mt-4 text-white p-2 rounded-md hover:bg-slate-800 duration-300 cursor-pointer">Login</button>
            <p className="mt-6">Not registred ? 
                <Link to="/signup"><span className="underline text-blue-500 cursor-pointer">Signup</span>{" "}</Link></p>
          </div>
          </form>
        </div>
      </dialog>
    </div>
  );
};
export default Login;
