import zIndex from "@mui/material/styles/zIndex";
import React from "react";
import AnimatedCursor from "react-animated-cursor";

export default function MouseHover() {
  return (
    <div className="App" style={{ zIndex: 9999 }}>
      <AnimatedCursor
        innerSize={15}
        outerSize={10}
        color="54, 255, 5"
        outerAlpha={0.2}
        innerScale={0.7}
        outerScale={5}
        zIndex={9999}
        clickables={[
          "a",
          'input[type="text"]',
          'input[type="email"]',
          'input[type="number"]',
          'input[type="submit"]',
          'input[type="image"]',
          "label[for]",
          "select",
          "textarea",
          "button",
          "svg",
          ".navButton",
          ".link",
          ".projectsImages",
          ".tilt",
          {
            target: ".custom",
            options: {
              innerSize: 10,
              outerSize: 20,
              color: "22, 112, 0",
              outerAlpha: 0.2,
              innerScale: 0.8,
              outerScale: 10,
            },
          },
        ]}
        outerStyle={{ zIndex: 9999 }}
        innerStyle={{ zIndex: 9999 }}
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}
