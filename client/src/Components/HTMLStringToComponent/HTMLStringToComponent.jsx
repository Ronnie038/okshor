import React from "react";

const HTMLStringToComponent = ({ htmlString }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: htmlString,
      }}
    />
  );
};

export default HTMLStringToComponent;
