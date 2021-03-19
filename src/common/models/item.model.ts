import { CategoryInterface } from "./category.model";

export interface ItemInterface {
    id: string;
    title: string;
    desc: string | null;
    cookTime: number | null;
    servings: number | null;
    pricePerUnit: number;
    categories: [CategoryInterface]
}