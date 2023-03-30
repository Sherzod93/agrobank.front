export type FirstParamType<F extends (...args: any[]) => any> = Parameters<F> extends [
  firstParameter: infer T,
  ...args: any
]
  ? T
  : never;

export interface WithClassNameComponentProps {
  className?: string;
}

export interface TheSiteIsTestMode {
  text?: string;
  button?: string;
}

export  interface  PollsComponentProps {
  id: string,
  name: string,
  create_date: string,
  finish_date: string,
  voted: string,

  result_page: string,
  vote_page:string,
  questions: any,
  is_active: boolean,
}

export  interface  VoteComponentProps {
  id: string,
  name: string,
  create_date: string,
  finish_date: string,
  voted: string,
  csrf: string,
  result_page: string,
  vote_page:string,
  questions: any,
  is_active: boolean,

}

export  interface  ChartColumnComponentProps {
  types: any,
  items: any,
}
