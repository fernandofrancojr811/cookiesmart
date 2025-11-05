export default function CookieLoader() {
  return (
    <div className="relative h-8 w-8 md:h-10 md:w-10 rounded-full" style={{ background: "#D8A25E", boxShadow: "0 8px 20px rgba(0,0,0,0.12)" }}>
      {[...Array(12)].map((_,i)=>(
        <div key={i} className="absolute h-1.5 w-1.5 md:h-2 md:w-2 rounded-full" style={{
          background: "#4E342E",
          top: `${50 + Math.sin(i)*28}%`,
          left: `${50 + Math.cos(i)*28}%`,
          transform: "translate(-50%, -50%)",
          animation: "chip 2.8s ease-in-out infinite",
          animationDelay: `${i*0.12}s`
        }} />
      ))}
      <style jsx>{`
        @keyframes chip { 0%,100%{ transform: translate(-50%,-50%) } 50%{ transform: translate(-50%,-56%) } }
      `}</style>
    </div>
  );
}
