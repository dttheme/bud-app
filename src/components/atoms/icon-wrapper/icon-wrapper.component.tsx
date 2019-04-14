import React from "react";
import styles from "./icon-wrapper.module.scss";

export const IconWrapper = ({
  children,
  onClick,
  ariaLabel,
  className
}: {
  children: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  ariaLabel: string;
  className?: string;
}) => {
  return (
    <div
      className={`${className} ${styles.iconWrapper}`}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
