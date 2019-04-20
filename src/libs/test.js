// let obj = {
//   getName() {
//     console.log(this.name);
//   },
//   name: 'test export'
// };

// export { obj };

const obj = {
  getName() {
    console.log(this.name)
  },
  name: 'test export'
}
export default obj
