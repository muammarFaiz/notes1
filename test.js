const sliced = ["abc", "abcd", "efg", "hij", "afh", "xyz"];
const hehe = [];
const filtered = sliced.filter((v) => {
    // console.log(v.match(/aaa/));
    return v.match(/aaa/);
})
// hehe.forEach((val) => {
//     console.log("foreach running");
//     console.log(val);
// })
// if (hehe[0]) {
//     // console.log(hehe[0]);
//     console.log("true");
// } else {
//     console.log("false");
// }
console.log(filtered);