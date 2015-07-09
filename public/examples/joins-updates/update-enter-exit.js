//join
var p = d3.select("body").selectAll("p")
    .data([4, 8, 15, 16, 23, 42])

// Enter… (append new items)
p.enter().append("p")
    .text(String);

// Update all 'P' items… (by inserting the string we are updating the selection)
p.text(String);

// Exit…
p.exit().remove();