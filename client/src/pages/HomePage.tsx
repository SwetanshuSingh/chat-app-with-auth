import { Link } from "react-router-dom";
import LandingButton from "../components/ui/LandingButton";

const HomePage = (): React.JSX.Element => {
  return (
    <main className="w-full h-[100vh] bg-[#e8ebed] flex flex-col justify-start items-start gap-12 font-0 text-[#353535] lg:p-28 p-10">
      <div className="flex items-center gap-1">
        <img
          className=" w-10 h-10"
          src="/logos/conversify-logo.png"
          alt="logo"
        />
        <h1 className="font-medium text-5xl tracking-wide">Vondroy</h1>
      </div>

      <p className="lg:w-[500px] w-[250px] text-xl">
        The next-gen. realtime chat app created using React, TypeScript, Prisma,
        Socket.io and MongoDB.
      </p>

      <div className="buttons flex gap-4">
        <Link to="/signup">
          <LandingButton text="Sign up" />
        </Link>
        <Link to="/login">
          <LandingButton text="Login" />
        </Link>
      </div>
    </main>
  );
};

export default HomePage;
