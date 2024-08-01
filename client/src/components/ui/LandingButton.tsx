interface LandingButtonProps {
    text : string
}

const LandingButton = ( { text } : LandingButtonProps) : React.JSX.Element => {
  return (
    <button className="lg:w-40 border-2 border-[#353535] font-semibold px-8 py-2 rounded-lg text-xl hover:bg-[#353535] hover:text-white transition-colors duration-300">
      { text }
    </button>
  );
};

export default LandingButton;