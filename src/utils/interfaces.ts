import {IconType} from "react-icons";

export interface CustomLink {
  href?: string;
  icon?: IconType;
  title: string;

  handleClick?(input?: any): void;
}