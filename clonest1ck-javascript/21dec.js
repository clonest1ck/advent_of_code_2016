// Open input file
var file = process.argv[2];

// Valid input?
if(file !== undefined) {
  var fs = require("fs");
  var data = fs.readFileSync(file);

  var pass = scramble("abcdefgh", data.toString());
  var find = unscramble("fbgdceah", data.toString());
  
  console.log(pass);
  console.log(find);
  
} else {
  console.log("Undefined input, exiting...");
  process.exit();
}

function unscramble(scrambled, instr) {
  for(var str of permutations("abcdefgh")) {
    if(scramble(str, instr) === scrambled) {
      return str;
    }
  }
}

function scramble(password, instr) {
  instr = instr.split("\n");
  for(var ins of instr) {
    ins = ins.split(" ");
    
    if(ins[0] === "swap") {
      if(ins[1] === "position") {
        password = swapPos(parseInt(ins[2]), parseInt(ins[5]), password);
      } else {
        password = swapChar(ins[2], ins[5], password);
      } 
    } else if(ins[0] === "rotate") {
      if(ins[1] === "based") {
        password = rotateChar(ins[6], password);
      } else {
        var left = ins[1] === "left";
        password = rotate(parseInt(ins[2]), left, password);
      }
    } else if(ins[0] === "reverse") {
      password = reverse(parseInt(ins[2]), parseInt(ins[4]), password);
    } else if(ins[0] === "move") {
      password = move(parseInt(ins[2]), parseInt(ins[5]), password);
    }
  }
  return password;
}

function swapPos(x, y, str) {
  if(x < 0 || y < 0 || x >= str.length || y >= str.length) {
    return str;
  } else if(x > y) {
    var temp = x;
    x = y;
    y = temp;
  }
  var xc = str[x];
  var yc = str[y];
  
  return str.substring(0, x) + yc + str.substring(x + 1, y) + xc + str.substring(y +1);
}

function swapChar(x, y, str) {
  var newStr = "";
  for(var char of str) {
    if(char === x) {
      newStr += y;
    } else if(char === y) {
      newStr += x
    } else {
      newStr += char;
    }
  }
  return newStr;
}

function rotate(times, left, str) {
  times = times % str.length;
  if(left) {
    return str.substring(times) + str.substring(0, times);
  } else {
    return str.substring(str.length-times) + str.substring(0, str.length - times);
  }
}

function rotateChar(char, str) {
  var i = str.indexOf(char);
  if(i > 3) {
    i++;
  }
  i++;
  return rotate(i, false, str);
}

function move(x, y, str) {
  var char = str[x];
  str = str.substring(0, x) + str.substring(x + 1);
  str = str.substring(0, y) + char + str.substring(y);
  
  return str;
}

function reverse(x, y, str) {
  return str.substring(0, x) + str.substring(x, y + 1).split("").reverse().join("") + str.substring(y + 1);
}

function permutations(str) {
  var res = [];
  
  if(str.length < 2) {
    return [str];
  }
  
  for(var i = 0; i < str.length; i++) {
    var temp = permutations(str.substring(0, i) + str.substring(i + 1));
    for(var per of temp) {
      res.push(str[i] + per);
    }
  }
  return res;
}
