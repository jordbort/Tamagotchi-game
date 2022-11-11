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
const playBtn = document.querySelector(".pet-play")
const feedBtn = document.querySelector(".pet-feed")
const sleepBtn = document.querySelector(".pet-sleep")

// event listeners
// sleepBtn.addEventListener("click", () => {
//     console.log("zzz")
//     game.clearInterval(gameTimer)
// })

// name your pet
// const chosenName = prompt("What is your pet's name?")
const chosenName = "Dude"


// instantiating (?) the pet
// boredom is the number
// bored is the timer
// getBored() starts the timer and controls `alive`
// hunger is the number
// hungry is the timer
// getHungry() starts the timer and controls `alive`
// sleepiness is the number
// sleepy is the timer
// getSleepy() starts the timer and controls `alive`
const pet = {
    name: chosenName,
    age: 0,
    alive: true,
    boredom: 1,
    hunger: 1,
    sleepiness: 1,
    getBored() {
        const bored = setInterval( () => {
            if(this.boredom >= 10) {
                this.alive = false
                console.log("boredom:", this.boredom, "alive:", this.alive)
                petBoredom.textContent = `Boredom: ${pet.boredom}`
                clearInterval(bored)
            }
            else {
                console.log("boredom:", this.boredom, "alive:", this.alive)
                petBoredom.textContent = `Boredom: ${pet.boredom}`
                this.boredom++
            }
        }, 500)
    },
    getHungry() {
        const hungry = setInterval( () => {
            if(this.hunger >= 10) {
                this.alive = false
                console.log("hunger:", this.hunger, "alive:", this.alive)
                petHunger.textContent = `Hunger: ${pet.hunger}`
                clearInterval(hungry)
            }
            else {
                console.log("hunger:", this.hunger, "alive:", this.alive)
                petHunger.textContent = `Hunger: ${pet.hunger}`
                this.hunger++
            }
        }, 500)
    },
    pauseHunger() {
        clearInterval(this.hunger)
    },
    getSleepy() {
        const sleepy = setInterval( () => {
            if(this.sleepiness >= 10) {
                this.alive = false
                console.log("sleepiness:", this.sleepiness, "alive:", this.alive)
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
                clearInterval(sleepy)
            }
            else {
                console.log("sleepiness:", this.sleepiness, "alive:", this.alive)
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
                this.sleepiness++
            }
        }, 500)
    },
}
pet.getBored()
pet.getHungry()
pet.getSleepy()
petName.textContent = `Name: ${pet.name} (Alive = ${pet.alive})`
petAge.textContent = `Age: ${pet.age}`

// functions
const decrHunger = () => {
    pet.hunger+=1
}
const decrSleepiness = () => {
    pet.sleepiness+=1
}
const decrBoredom = () => {
    pet.boredom+=1
}
const decrAge = () => {
    pet.age+=1
}

petHunger



// const game = {
//     start() {
//         const gameTimer = setInterval( () => {
//             if(this.timer === 10) {
//                 console.log("test", this.timer, "/ 10")
//                 clearInterval(gameTimer)
//             }
//             else {
//                 console.log("test", this.timer, "/ 10");
//                 this.timer++
//             }
//         }, 100);
//     },
//     timer: 1,
// }