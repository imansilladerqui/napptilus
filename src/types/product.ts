export type ProductListItem = {
  id?: string;
  brand?: string;
  name?: string;
  basePrice?: number;
  imageUrl?: string;
};

export type Product = {
  id?: string;
  brand?: string;
  name?: string;
  description?: string;
  basePrice?: number;
  rating?: number;
  specs?: {
    screen?: string;
    resolution?: string;
    processor?: string;
    mainCamera?: string;
    selfieCamera?: string;
    battery?: string;
    os?: string;
    screenRefreshRate?: string;
  };
  colorOptions?: {
    name?: string;
    hexCode?: string;
    imageUrl?: string;
  }[];
  storageOptions?: {
    capacity?: string;
    price?: number;
  }[];
  similarProducts?: ProductListItem[];
};

export type ProductSpecs = NonNullable<Product["specs"]>;
export type ColorOption = NonNullable<Product["colorOptions"]>[number];
export type StorageOption = NonNullable<Product["storageOptions"]>[number];

export type ProductList = ProductListItem[];
