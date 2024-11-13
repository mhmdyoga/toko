"use client";

import { useEffect } from "react";
import Homepage from "./homepage/page";

export default function Home() {

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof (window as any).snap === "undefined") {
      const script = document.createElement("script");
      const clientKey = "Mid-client-6lN3P3KI3sgekWQh"
      script.src = "https://app.midtrans.com/snap/snap.js";
      script.setAttribute("data-client-key", clientKey);
      script.async = true;
      document.body.appendChild(script);
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  return (
    <>
      <Homepage />
    </>
  );
}