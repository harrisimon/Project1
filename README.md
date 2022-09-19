# Project 1 - Planning

For my project I will create a platformer called 'Sewer Rat'.
With the user playing as a rat they will try to navigate through the sewer, jumping over platforms, and avoiding water geysers that spray out at unexpecting times. The rat will start with a 'Grime level' of 3 which goes down if a gap jump is missed or they are sprayed with water. The goal will be to escape the sewer before the timer ends without the grime level going down to zero.

## Technologies Used
- HTML-canvas  
- CSS  
- Javascript

## User stories
As a user, I want the ability to...  
* see a title screen and hit 'space' to start.  
* run forward and backward through the level.  
* use the arrow keys to move.  
* see the timer.  
* see the current 'grime' level.
* jump over gaps using the 'space' key.  
* advance in each level.  
* see a screen fade for each level screen.  
* reload the game.  
* finish the game by escaping the sewer.   

## Wireframes
![sewer-rat-wireframe](/sewer-rat-complete.png)Start screen and level layout
,
![rat](/rat.png)Rat pixel character

## Entity Relationship Diagram
###
                Rat: {
                    constructor(complete parameters to come later)
                        x: (x location on the canvas)  
                        y: (y location on the canvas)  
                        height: (should fit between level platforms)  
                        width: (should be smaller than water hazards  
                                and only a fraction of level vertical height)  
                        speed: (to smoothly move and track)  
                        velocity: (for player to fall)  
                        onPlatform: (to track when the rat is on a platform, eg not falling or jumping)  
                        grimeLevel: (a number representing how many tries remain)  
                        render: (a method to display the rat on screen)  
                }
###
                LevelPlatform: {  
                    constructor(complete parameters to come later)  
                        x: (x location on the canvas)  
                        y: (y location on the canvas)  
                        height: (should be constant and only a fraction of the canvas)  
                        width: (should vary depending on level drawing)  
                        render: (a method to draw plaforms on screen)  
                    }
###
                WaterHazard: {  
                    constructor(complete parameters to come later)  
                        x: (x location on the canvas)  
                        y: (y location on the canvas)  
                        height: (should be enough to cover between platforms)  
                        width: (should be constant)  
                        active: (a boolean of whether they are on screen to avoid)  
                        render: (a method to render methods on screen)  
                }
###
                Pipe: {
                    construction(complete parameters to come later)  
                        x: (location on the canvas)  
                        y: (location on the canvas)  
                        height: (constant)  
                        width: (constant)  
                }
###
function - gameLoop - holds the entire logic that runs the game  
function - timer - sets the timer to countdown and ends the game at zero  
function - detectHit - used to see if rat has encountered a water hazard, will lower 'Grime Level' by one  
function - respawm - shifts position of the rat if hazard is hit  
function - movementHandler a function  to move rat around using arrow keys, includes gravity and jumping  
function - onPlatform - used to keep the rat from constantly be affected by gravity function, keeps y velocity at 0  
function - gravity - used to add falling  
function - hazardController - controls the interval of the hazards, will be either intermittent or constant  
function - drawLevel - used to draw the level screens  


## Schedule
- Monday - Project planning, pseudo-coding, asset and level generation
- Tuesday - write out classes and canvas context to start placing items
- Wednesday - gameLoop function (including platform detection and movement and gravity)
- Thursday - continue gameLoop function (including timer and collision detection)
- Friday - gameLoop finishing
- Weekend - polish and continue and leftover work