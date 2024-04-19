export interface SelectInterface {
  text: string;
  value: string;
}
export interface IMenuItem {
  name: string;
  link?: string;
  subMenu?: IMenuItem[];
}
