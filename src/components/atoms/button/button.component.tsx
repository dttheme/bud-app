import React from "react";
import styles from "./button.module.scss";

export const Button = ({
  onClick,
  className,
  children
}: {
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <button
      className={`${styles.buttonComponent} ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
