import { TreeNode } from "./tree";
import { HabitId } from "./habits";

type CategoryTreeNodeValue = {
  id: number;
  name: string;
  categories?: HabitId[];
};

export interface HabitTreeNode extends TreeNode<HabitTreeNodeValue> {}
export interface CategoryTreeNode extends TreeNode<CategoryTreeNodeValue> {}

export const categoryTree : CategoryTreeNode = {
//    { id: 1, category_name: 'Electronics', parent_id: null },
//   { id: 2, category_name: 'Audio', parent_id: 1 },
//   { id: 3, category_name: 'Cameras', parent_id: 1 },
//   { id: 4, category_name: 'Computers', parent_id: 1 },
//   { id: 5, category_name: 'Phones', parent_id: 1 },
//   { id: 6, category_name: 'Tablets', parent_id: 1 },
//   { id: 8, category_name: 'Consoles', parent_id: 1 },
//   { id: 7, category_name: 'TV', parent_id: 1 },
//   { id: 9, category_name: 'Headphones & Earphones', parent_id: 2 },
//   { id: 10, category_name: 'MP3 Players', parent_id: 2 },
//   { id: 11, category_name: 'Radios & Receivers', parent_id: 2 },
//   { id: 12, category_name: 'Speakers', parent_id: 2 },
//   { id: 13, category_name: 'Lenses', parent_id: 3 },
//   { id: 14, category_name: 'Action Cameras', parent_id: 3 },
//   { id: 15, category_name: 'Camera Accessories', parent_id: 3 },
//   { id: 16, category_name: 'Digital Cameras', parent_id: 3 },
//   { id: 17, category_name: 'Non Digital Cameras', parent_id: 3 },
//   { id: 19, category_name: 'Desktops', parent_id: 4 },
//   { id: 20, category_name: 'Laptops', parent_id: 4 },
//   { id: 21, category_name: 'Monitors', parent_id: 4 },
//   { id: 22, category_name: 'Printers', parent_id: 4 },
//   { id: 23, category_name: 'Computer Accessories', parent_id: 4 },
//   { id: 24, category_name: 'Mobile Phones', parent_id: 5 },
//   { id: 25, category_name: 'Home Phones', parent_id: 5 },
//   { id: 26, category_name: 'Phone Accessories', parent_id: 5 },
//   { id: 27, category_name: 'General Purpose Tablets', parent_id: 6 },
//   { id: 28, category_name: 'Reading Tablets', parent_id: 6 },
//   { id: 29, category_name: 'Tablet Accessories', parent_id: 6 },
//   { id: 30, category_name: 'Flat Screen TVs', parent_id: 7 },
//   { id: 31, category_name: 'Projectors', parent_id: 7 },
//   { id: 32, category_name: 'TV Accessories', parent_id: 7 },
//   { id: 33, category_name: 'Playstation', parent_id: 8 },
//   { id: 34, category_name: 'Xbox', parent_id: 8 },
//   { id: 35, category_name: 'Nintendo', parent_id: 8 },
//   { id: 36, category_name: 'Console Accessories', parent_id: 8 }
}

export const habitTree: HabitTreeNode = {
  value: {
    id: "happiness",
    color: 5,
  },
  children: [
    {
      value: {
        id: "health",
        color: 4,
      },
      children: [
        {
          value: {
            id: "sleep",
            habits: [
              "sunlight",
              "limitCoffee",
              "noAlcohol",
              "earlySleep",
              "noLateFood",
              "noWorkAfterDinner",
              "noElectronicsInBedroom",
            ],
          },
          children: [],
        },
        {
          value: {
            id: "nutrition",
            habits: ["morningFast", "noLateFood", "supplements", "content"],
          },
          children: [],
        },
        {
          value: {
            id: "body",
            habits: ["outdoors", "exercise", "walk"],
          },
          children: [],
        },
        {
          value: {
            id: "mind",
            habits: [
              "meditation",
              "learn",
              "max",
              "noWorkAfterDinner",
              "noElectronicsInBedroom",
            ],
          },
          children: [],
        },
      ],
    },
    {
      value: {
        id: "relationships",
        color: 11,
      },
      children: [
        {
          value: {
            id: "marriage",
            habits: [
              "compliment",
              "review",
              "help",
              "noWorkAfterDinner",
              "noElectronicsInBedroom",
            ],
          },
          children: [],
        },
      ],
    },
    {
      value: {
        id: "work",
        color: 2,
      },
      children: [
        {
          value: {
            id: "productivity",
            habits: [
              "noWorkAfterDinner",
              "sunlight",
              "limitCoffee",
              "noAlcohol",
              "earlySleep",
              "morningFast",
              "prepare",
              "noEarlyCoffee",
              "noLateFood",
              "outdoors",
              "exercise",
              "noElectronicsInBedroom",
            ],
          },
          children: [],
        },
      ],
    },
  ],
};
