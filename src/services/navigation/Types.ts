interface INavigationField {
  name: string;
  url: string;
  ids?: number;
  imgUrl?: string;
  category?: string;
}
interface INavigationPatch {
  id: number | string;
  ids: number | string;
  name?: string;
}

export type { INavigationField, INavigationPatch };
