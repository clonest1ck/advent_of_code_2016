// Open input file
var file = process.argv[2];

// Valid input?
if(file !== undefined) {
  var fs = require("fs");
  var data = fs.readFileSync(file);

  var lowest = ban(data.toString());
  console.log(lowest);

} else {
  console.log("Undefined input, exiting...");
  process.exit();
}

function ban(list) {
  var ranges = [];
  list = list.split("\n");
  for(var i = 0; i < list.length; i++) {
    if(list[i] !== "") {
      var range = list[i].split("-");
      var item;
      if(parseInt(range[0]) < parseInt(range[1])) {
        item = {
          "start": parseInt(range[0]),
          "end"  : parseInt(range[1])
        };
        
      } else {
        item = {
          "start": parseInt(range[1]),
          "end"  : parseInt(range[0])
        };
      }
      ranges.push(item);
    }
  }
  
  ranges.sort(function(a, b) {
    return a.start - b.start;
  });
  
  if(ranges[0].start > 0) {
    return 0;
  } else {
    var end = ranges[0].end;
    var allowed = 0;
    i = 1;
    
    for(i = 1; i < ranges.length; i++) {
      if(ranges[i].start <= end + 1) {
        if(ranges[i].end > end) {
          end = ranges[i].end;
        } 
      } else {
        allowed += ranges[i].start - end - 1;
        end = ranges[i].end;
      }
      
      if(end >= 4294967295) {
        break;
      }
    }
    end++;
    console.log("Allowed: " + allowed);
    return end;
  }
}