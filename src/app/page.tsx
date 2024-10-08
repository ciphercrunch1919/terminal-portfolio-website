"use client"

import { useEffect, useRef } from "react";
import { Terminal } from "./components/terminal";

export default function Home() {
  const bottomRef = useRef<HTMLDivElement>(null); //Reference to use to auto scroll to the bottom of the page

  // Scrolling to bottom
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Listen for terminal updates
  useEffect(() => {
    const observer = new MutationObserver(() => {
      if (bottomRef.current) {
        bottomRef.current.scrollTop = bottomRef.current.scrollHeight;
      }
    });

    // Observe changes in the terminal content
    if (bottomRef.current) {
      observer.observe(bottomRef.current, { childList: true, subtree: true });
    }

    // Clean up the observer on unmount
    return () => {
      if (bottomRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  return (
    <>
      <div ref={bottomRef} style={{ maxHeight: 'calc(100vh - 10px)', overflowY: 'auto', scrollBehavior: 'smooth', }}>
        <Terminal />
      </div>
    </>
  );
}
