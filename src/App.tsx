import React from "react";
import BottomSide from "./Bottom_Side/BottomSide";
import NavBar from "./NavBar";
import 'devextreme/dist/css/dx.light.css';

export default function App() {

  return (
    <>
      <div className="h-screen w-full">
        <div style={{ height: "10%" }} className="w-full h-full  ">
          <NavBar></NavBar>
        </div >

        <div style={{ height: "90%" }} className="flex flex-col p-4">


          <BottomSide></BottomSide>

        </div>
      </div >
    </>
  );
}

