import { ReactNode } from "react";
import s from "./Icon.module.scss";
type Props = {
  children: ReactNode;
  size?: "S" | "M" | "L";
};

export const Icon = ({ children, size }: Props) => {
  return (
    <div className={`${s.iconContainer} ${s[size ? size : "S"]}`}>
      {children}
    </div>
  );
};
