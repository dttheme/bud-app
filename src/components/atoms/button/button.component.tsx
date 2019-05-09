import React from "react";
import styles from "./button.module.scss";

export const Button = ({
  onClick,
  className,
  children,
  type = "button"
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: React.ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
}) => {
  return (
    <button
      type={type}
      className={`${styles.buttonComponent} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
