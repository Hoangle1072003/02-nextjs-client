import React from "react";

type ContainerProps = {
  children: React.ReactNode;
  style?: React.CSSProperties;
};

const AppContainer: React.FC<ContainerProps> = ({ children, style }) => {
  return (
    <div
      style={{
        maxWidth: "1240px",
        margin: "0 auto",
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default AppContainer;
