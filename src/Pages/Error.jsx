import { useState } from "react";
import { Link } from "react-router-dom";

const Error = () => {
  const [mouseX, setMouseX] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const movementCheckHandler = (e) => {
    setMouseX(e.pageX);
    setMouseY(e.pageY);
  };
  return (
    <div className="min-h-screen flex flex-col">
      <div
        onMouseMove={movementCheckHandler}
        className={`grow flex justify-center items-center bg-err bg-contain bg-fixed`}
        style={{
          backgroundPositionX: 0 - mouseX / 200,
          backgroundPositionY: -200 - mouseY / 200,
          backgroundSize: `${window.innerWidth < 800 ? 400 : 120}%`,
        }}
      >
        <div className="w-full backdrop-blur-sm flex justify-center items-center place-self-stretch p-20">
          <div className="bg-err bg-cover bg-bottom place-self-stretch w-full rounded-lg flex">
            <div className="w-full flex-col justify-between p-5 hidden md:flex">
              <h2 className="text-white font-extrabold text-3xl">
                Oops... Looks like something went wrong
              </h2>
              <div className="w-full gap-6 flex items-center">
                <Link to="/" className="text-white underline">
                  Go to home page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error;
