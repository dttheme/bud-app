import React from "react";
import styles from "./button.module.scss";

export const Button = ({
  onClick,
  className = "",
  children,
  type = "button",
  size = "large",
  color
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  size?: "small" | "large";
  color?: "red" | "white";
}) => {
  return (
    <button
      type={type}
      className={`${styles.buttonComponent} ${className} ${size} ${color}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
