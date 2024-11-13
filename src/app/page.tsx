"use client";

import { useEffect } from "react";
import Homepage from "./homepage/page";

export default function Home() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://app.sandbox.midtrans.com/snap/snap.js";
    script.setAttribute("data-client-key", "SB-Mid-client-YTHeG5CtUSOeIyDs");
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
    <Homepage />
    </>
  );
}
