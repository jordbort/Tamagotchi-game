console.log("JS loaded")
/** NOTES
 * Webpage should feature: 
 *      - the pet on screen
 *      - visible metrics (name, hunger, sleepiness, boredom, age)
 *      - Button to feed your pet (decreases hunger)
 *      - Button to turn the lights off and on (character sleeps)
 *      - Button to play with your pet (decreases boredom)
 * Functionality:
 *      - Game should start with naming your pet
 *      - Age should start at 0 and increase every x minutes
 *      - Hunger, sleepiness and boredom are on a scale of 1-10
 *      - If any one stat hits 10, the character dies
 *      - Values should lower when interacted with in a respective way
 *      - Values shouldn't go lower than 1
 * Game states:
 *      - Initial "name your pet" state
 *      - Idle, watching your character's state deteriorate lol
 *      - Letting your pet sleep
 *      - Playing with your pet
 *      - Dead/game over screen
 *      - (Optional: evolution screen)
*/

// instantiating (?) the pet
const pet = {
    name: null,
    hunger: 1,
    sleepiness: 1,
    boredom: 1,
    age: 0,
}