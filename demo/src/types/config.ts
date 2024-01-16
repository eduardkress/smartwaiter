export interface Link {
  name: string;
  url: string;
}
export interface Social {
  name: string;
  url: string;
}
export interface Config {
  company: string;
  image: string;
  foreground: string;
  background: string;
  links: Link[];
  socials: Social[];
}
