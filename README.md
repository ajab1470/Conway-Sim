# Conway-Sim
Simple simulation of Conway's Game of Life in JavaScript

Conway's Game of life is an automated simulation of cells that live, breed, and die. For more details on the rules of Life, follow this link: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life 

Currently, this implementations is a simple representation of Life. The default is the graphic, canvas representation, but a text based ascii representation is also available. Eventually, users will be able to define their own start board to create whatever patterns they choose

To run yourself - Canvas version: Have a canvas element in your HTML with the id "board canvas". As mentioned above, the default is this version, so you should not have to change the JS at all. To adjust the color, alter the rgb values in the if/else statements in the canvas_display function.

To run yourself - ASCII version: Have a div element in your HTML with the id "board". Go into the main function of the JS and switch the comment notation(//) from the ascii lines to the canvas lines. To adjust which characters represent what, alter the contents of the if/else statements in the ascii_display function.