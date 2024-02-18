import { ReactNode } from "react";
import s from "./Icon.module.scss";
type Props = {
  children: ReactNode;
};

export const Icon = ({ children }: Props) => {
  return <div className={s.iconContainer}>{children}</div>;
};
