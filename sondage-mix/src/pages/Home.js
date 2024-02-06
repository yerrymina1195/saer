// @flow strict
import { Link } from 'react-router-dom';
import * as React from 'react';
import { useSpring, animated } from 'react-spring';
import img1 from '../images/Banner.png';

function Home() {
   // const backgroundImageStyle = {
   //    backgroundImage: `url(${img1})`,
   //    backgroundSize: 'cover',
   //    backgroundPosition: 'center',
   //    minHeight: '100vh',
   //    minWidth: '95vw',
   // };

   const textAnimation = useSpring({
      opacity: 1,
      transform: 'translateX(0%)', // Initial position
      from: { opacity: 0, transform: 'translateX(-100%)' }, // Starting position
      config: { duration: 9000 },
   });
   const textanimation = useSpring({
    opacity: 1,
    transform: 'translateX(0%)', // Initial position
    from: { opacity: 0, transform: 'translateX(100%)'}, // Starting position
    config: { duration: 9000 },
 });

 const buttonAnimation = useSpring({
  opacity: 1,
  transform: 'scale(1)', // Initial scale
  from: { opacity: 0, transform: 'scale(0)' }, // Starting scale
   config: { duration: 9000 },
   });
  
     
    

   return (
    <div className="rxdform min-h-screen ">  
     <h1 className="text-4xl font-bold bg-blue-700 py-2 shadow-lg">RxDForm</h1>
    {/* <div className="  w-full flex flex-col sm:flex-row justify-content-between items-center " > */}
      <div className="  flex flex-col sm:flex-row content " >
        <div className="  flex flex-col  justify-center items-center text-black border border-4 border-t-0
          border-blue-700   shadow-2xl ">
       
          <animated.h1 style={textAnimation} className="text-4xl font-bold mb-6   rounded">
            Bienvenue sur notre plateforme de sondage
          </animated.h1>
          <animated.p style={textanimation} className="text-xl font-bold mb-8">
            Participez à nos sondages et partagez votre opinion avec nous !!!
          </animated.p>
          <Link to="/connexion">
            <animated.button
              style={buttonAnimation} className="mx-auto h-12 px-6 w-40 bg-green-600 mt-8 rounded font-semibold text-sm text-blue-100 hover:bg-green-800">
              Call To Action
            </animated.button>
          </Link>
        </div>
        
        <div className="overflow-hidden "> <img src={img1} alt="" className=" sm-w-auto bg-blue-300 py-12 content w-full object-cover  shadow-lg" /> </div>
      </div>
      
      </div>
      
    );
    
}

export default Home;
