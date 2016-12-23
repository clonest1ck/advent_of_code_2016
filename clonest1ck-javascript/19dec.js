var elves = 3017957;
var ring = [];

for(var i = 0; i < elves; i++) {
  ring.push(i+1);
}

var j = 1;
while(ring.length > 1) {
  ring.splice(j, 1);
  j = (j + 2) % ring.length;
  console.log(ring.length);
}

console.log(ring);