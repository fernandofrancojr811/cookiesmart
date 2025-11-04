
// Pseudo-patch: chocolate chips animation
/*
export function CookieLoader() {
  return (
    <div className="relative h-24 w-24 rounded-full" style={{ background: "#D8A25E", boxShadow: "0 8px 20px rgba(0,0,0,0.15)" }}>
      {[...Array(6)].map((_,i)=>(
        <div key={i} className="absolute h-3 w-3 rounded-full" style={{
          background: "#4E342E",
          top: `${30 + Math.sin(i)*10}%`,
          left: `${30 + Math.cos(i)*10}%`,
          animation: "chip 2.4s ease-in-out infinite",
          animationDelay: `${i*0.15}s`
        }}/>
      ))}
      <style jsx>{`
        @keyframes chip {
          0%,100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-3px); opacity: 0.9; }
        }
      `}</style>
    </div>
  );
}
*/
