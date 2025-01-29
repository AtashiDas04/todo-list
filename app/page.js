'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setFade(true);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <h1 className={`text-4xl font-bold text-white ${fade ? "fade-in" : "opacity-0"}`}>
        Smart Todo List
      </h1>
    </div>
  );
}
