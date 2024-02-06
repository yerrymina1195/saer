
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import axiosClient from "../axios.js";

function Connexion() {
  const { setCurrentUser, setUserToken, setLoading } = useStateContext();
  const navitage = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState({ __html: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    setError({ __html: "" });

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUserToken(data.token);
        sessionStorage.setItem('token', data.token);
        setLoading(true);
        console.log(data);
        alert(`Bienvenu ${data.user.name}`);
        navitage('/Form', { replace: true });
        window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...accum, ...next],
            []
          );
          console.log(finalErrors);
          setError({ __html: finalErrors.join("<br>") });
        }
        console.error(error);
      });
  };








  return (
    <>
    <div className="  h-[550px] flex justify-center content-center items-center ">
    <div className="flex  flex-1 flex-col sm:mx-auto sm:w-full sm:max-w-md items-center mt-5  bg-white  justify-center px-6 py-12 lg:px-8 rounded-lg border-2 border-slate-100">
       <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
         
         {error.__html && (<div className="bg-red-500 rounded py-2 px-3 text-white" dangerouslySetInnerHTML={error}>
      </div>)}
       </div>

       <div className="">
         <form className="space-y-6" onSubmit={onSubmit} action="#" method="POST">
           <div>
             <div className="flex items-center justify-between">
               <label htmlFor="email" className="block ">
                 <span className="">
                   Email address
                 </span>
               </label>
             </div>
             <div className="">
               <input
                 name="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                 autoComplete="email"
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 outline-none shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div>
             <div className="flex items-center justify-between">
               <label htmlFor="password" className="block ">
                 <span className="">
                   Password
                 </span>
               </label>
             </div>
             <div className="">
               <input
              
                 name="password"
                 type="password"
                 value={password}
                 onChange={e => setPassword(e.target.value)}
                 autoComplete="current-password"
                 required
                 className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 outline-none focus:ring-inset focus:ring-amber-600 sm:text-sm sm:leading-6"
               />
             </div>
           </div>

           <div>
             <button
               type="submit"
               className="flex w-full justify-center rounded-md bg-amber-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-400"
             >
               Sign in
             </button>
           </div>
         </form>
         <h2 className=" mt-2 text-center">
        <Link
          to="/inscription"
          className="font-medium text-indigo-600  hover:text-indigo-500"
        >
          sign up 
        </Link>
        </h2>
       </div>
     </div>
    </div>
   </>
  )
}

export default Connexion




