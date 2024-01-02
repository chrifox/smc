export type PageProps = {
  params: { [key: string]: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type Dice = 2 | 4 | 6 | 8 | 10 | 12 | 20;
