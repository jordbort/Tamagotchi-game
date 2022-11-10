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
 *      - Values should not be increasing before naming the character, while eating/sleeping/playing, or after dying
 *      - Interaction buttons also should not be available during the above states
 * Game states:
 *      - Initial "name your pet" state
 *      - Idle, watching your character's state deteriorate lol (only state with interation buttons and rising stat values)
 *      - Letting your pet sleep
 *      - Playing with your pet
 *      - Dead/game over screen
 *      - (Optional: evolution screen)
 */

/** USER STORY
 * User should start by seeing the pet and entering a name in a text field
 * User should be able to submit a name by hitting Enter or clicking a Submit button
 * User should notice the game switching to the main "idle" state
 * User should see the stats and numbers rising if they don't interact
 * User should be able to click on one of three buttons to care for their pet
 * User should see the image of their pet change to reflect whichever interaction is happening
 * User should see their character die with "game over" text if a stat hits 10
 * User should then see a message to refresh their page, or there'll be a button to do it
 */

// setting up HTML grabbers
const petName = document.querySelector(".pet-name")
const petAge = document.querySelector(".pet-age")
const petHunger = document.querySelector(".pet-hunger")
const petSleepiness = document.querySelector(".pet-sleepiness")
const petBoredom = document.querySelector(".pet-boredom")

// name your pet
// const chosenName = prompt("What is your pet's name?")
const chosenName = "Dude"

// instantiating (?) the pet
const pet = {
    name: chosenName,
    age: 0,
    alive: true,
    hunger: 1,
    sleepiness: 1,
    boredom: 1,
}
petName.textContent = `Name: ${pet.name}`
petAge.textContent = `Age: ${pet.age}`
petHunger.textContent = `Hunger: ${pet.hunger}`
petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
petBoredom.textContent = `Boredom: ${pet.boredom}`