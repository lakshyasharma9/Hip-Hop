import p1_img from './product_1.png';
import p2_img from './Product_2.jpg';
import p3_img from './product_3.png';
import p4_img from './product_4.png';

console.log("Image 1:", p1_img);
console.log("Image 2:", p2_img);
console.log("Image 3:", p3_img);
console.log("Image 4:", p4_img);

let data_product = [
  {
    id: 1,
    name: "Black drop shoulder - with sassy print",
    image: p1_img,
    new_price: 50.00,
    old_price: 80.50,
  },
  {
    id: 2,
    name: "Black drop shoulder - with sassy print",
    image: p2_img,
    new_price: 85.00,
    old_price: 120.50,
  },
  {
    id: 3,
    name: "Black drop shoulder - with sassy print",
    image: p3_img,
    new_price: 60.00,
    old_price: 100.50,
  },
  {
    id: 4,
    name: "Black drop shoulder - with sassy print",
    image: p4_img,
    new_price: 100.00,
    old_price: 150.00,
  },
];

export default data_product;
