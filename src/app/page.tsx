import Sidebar from "@/component/sidebar"
import Header from "@/component/task-header";
import React from "react";

export default function Home() {
  return (
      <>
        <div className="flex items-center">
          <Sidebar></Sidebar>
          <div className="w-full h-full">
            <Header/>
          </div>
        </div>
      </>
  );
}
