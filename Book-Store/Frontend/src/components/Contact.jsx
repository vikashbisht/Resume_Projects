import toast from "react-hot-toast"


const Contact = () => {
  return (
    <div className='flex justify-center items-center w-[100%] h-[100vh]'>
    <div className='max-w-md w-full mx-auto p-6 bg-gray-600 rounded-lg shadow-md'>
        <h2 className='text-3xl text-center text-pink-600 font-bold mb-6'> Contact Us </h2>
        <form>
            <div className='mb-4'>
                <label className='block text-white text--sm font-semibold mb-2'> Name </label>
                <input className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500" required type="text" placeholder="Enter your name" />
            </div>
            <div className='mb-4'>
                <label className='block text-white text--sm font-semibold mb-2'>  Email </label>
                <input className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500"  required type="email" placeholder="Enter your email" />
            </div>
            <div className='mb-4'>
                <label className='block text-white text--sm font-semibold mb-2' > Message </label>
                <textarea rows='4' className="w-full px-3 py-2 border rounded-lg bg-gray-800 focus:border-blue-500" required placeholder="Enter your message" />
            </div>
            <div>
                <button onClick={()=> toast.success('Your message has been sent successfully')} className="w-50 bg-pink-600 text-white p-3 rounded-lg font-semibold hover:bg-pink-700 transition duration-300"> Send Message </button>
            </div>
        </form>
    </div>
    </div>
  )
}
export default Contact