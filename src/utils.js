// variables used for search page
export const prices = [
  {
    name: 'Any',
    min: 0,
    max: 1000000,
  },
  {
    name: `$1 to $10`,
    min: 1,
    max: 10,
  },
  {
    name: `$10 to $100`,
    min: 10,
    max: 100,
  },
  {
    name: `$100 to $1000`,
    min: 100,
    max: 1000,
  },
];
export const ratings = [
  {
    _id: 1,
    name: '4stars & up',
    rating: 4,
  },
  {
    _id: 2,
    name: '3stars & up',
    rating: 3,
  },
  {
    _id: 3,
    name: '2stars & up',
    rating: 2,
  },
  {
    _id: 4,
    name: '1stars & up',
    rating: 1,
  },
];

// //convert objects to form data
// export function buildFormData(formData, data, parentKey) {
//   if (
//     data &&
//     typeof data === "object" &&
//     !(data instanceof Date) &&
//     !(data instanceof File)
//   ) {
//     Object.keys(data).forEach((key) => {
//       buildFormData(
//         formData,
//         data[key],
//         parentKey ? `${parentKey}[${key}]` : key
//       );
//     });
//   } else {
//     const value = data == null ? "" : data;
//     formData.append(parentKey, value);
//   }
// }