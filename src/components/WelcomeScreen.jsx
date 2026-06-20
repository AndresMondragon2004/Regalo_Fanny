export default function WelcomeScreen({ onNext }) {
  return (
    <div className="flex flex-col items-center justify-center w-full z-20 px-4">
      <h1 className="text-4xl md:text-6xl font-caveat text-slate-800 mb-12 drop-shadow-md text-center max-w-2xl leading-tight">
        Hola bonita, tengo algo para ti,<br/>
        <span className="text-rose-600 block mt-4 text-3xl md:text-5xl">solo haz clic para verlo</span>
      </h1>
      <button 
        onClick={onNext}
        className="px-12 py-4 bg-white text-rose-600 rounded-full shadow-2xl shadow-rose-900/20 font-bold text-xl hover:scale-110 hover:bg-rose-50 hover:text-rose-700 transition-all duration-300 animate-bounce border-2 border-rose-50 cursor-pointer"
      >
        Ver sorpresa
      </button>
    </div>
  );
}
