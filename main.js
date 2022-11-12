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

// SET UP HTML GRABBERS
const petContainer = document.querySelector(".pet-container")
const petState = document.querySelector(".pet-state")
const petName = document.querySelector(".pet-name")
const petAge = document.querySelector(".pet-age")
const petMood = document.querySelector(".pet-mood")
const petBoredom = document.querySelector(".pet-boredom")
const petHunger = document.querySelector(".pet-hunger")
const petSleepiness = document.querySelector(".pet-sleepiness")
const playBtn = document.querySelector(".pet-play")
const feedBtn = document.querySelector(".pet-feed")
const sleepBtn = document.querySelector(".pet-sleep")

// PET DATA AND METHODS
const pet = {
    // name: prompt("What is your pet's name?"),
    name: "Yaboi",
    age: 0,
    alive: true,
    currentMood: "content",
    mood: {
        content: "🙂️",
        bored: "😮‍💨️",
        hungry: "🤤️",
        sleepy: "🥱️",
        dead: "😵️",
        playing: "😄️",
        eating: "😋️",
        sleeping: "😴️",
    },
    canGetOlder: false,
    canGetBored: false,
    canGetHungry: false,
    canGetSleepy: false,
    canPlay: false,
    canEat: false,
    canSleep: false,
    maturity: 1,
    boredom: 1,
    hunger: 1,
    sleepiness: 1,
    getOlder() {
        const aging = setInterval( () => {
            if(this.canGetOlder) {
                this.age++
                petAge.textContent = `Age: ${pet.age}`
            }
        }, 5000)
    },
    getBored() {
        const bored = setInterval( () => {
            if(this.canGetBored) {
                if(this.boredom <= 0) {
                    this.boredom = 0
                }
                this.boredom++
                petBoredom.textContent = `Boredom: ${pet.boredom}`
                if(this.boredom >= 10) {
                    console.log(`${this.name} has died of boredom at age ${this.age}. (maturity: ${this.maturity})`)
                    this.die()
                    clearInterval(bored)
                    return
                }
                if(this.boredom >= 7) {
                    this.bored()
                }
            }
        }, 2000)
    },
    getHungry() {
        const hungry = setInterval( () => {
            if(this.canGetHungry) {
                if(this.hunger <= 0) {
                    this.hunger = 0
                }
                this.hunger++
                petHunger.textContent = `Hunger: ${pet.hunger}`
                if(this.hunger >= 10) {
                    console.log(`${this.name} has died of hunger at age ${this.age}. (maturity: ${this.maturity})`)
                    this.die()
                    clearInterval(hungry)
                    return
                }
                if(this.hunger >= 7) {
                    this.hungry()
                }
            }
        }, 2000)
    },
    getSleepy() {
        const sleepy = setInterval( () => {
            if(this.canGetSleepy) {
                if(this.sleepiness <= 0) {
                    this.sleepiness = 0
                }
                this.sleepiness++
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
                if(this.sleepiness >= 10) {
                    console.log(`${this.name} has died of sleepiness at age ${this.age}. (maturity: ${this.maturity})`)
                    this.die()
                    clearInterval(sleepy)
                    return
                }
                if(this.sleepiness >= 7) {
                    this.sleepy()
                }
            }
        }, 2000)
    },
    die() {
        this.disableStats()
        this.canDoNone()
        this.currentMood = "dead"
        this.alive = false
        petMood.textContent = `Mood: ${this.currentMood}`
        petState.textContent = `${this.mood.dead}`
    },
    bored() {
        console.log(`Warning: ${this.name} is getting bored!! (boredom: ${this.boredom})`)
        this.currentMood = "bored"
        petMood.textContent = `Mood: ${this.currentMood}`
        petState.textContent = `${this.mood.bored}`
    },
    hungry() {
        console.log(`Warning: ${this.name} is getting hungry!! (hunger: ${this.hunger})`)
        this.currentMood = "hungry"
        petMood.textContent = `Mood: ${this.currentMood}`
        petState.textContent = `${this.mood.hungry}`
    },
    sleepy() {
        console.log(`Warning: ${this.name} is getting sleepy!! (sleepiness: ${this.sleepiness})`)
        this.currentMood = "sleepy"
        petMood.textContent = `Mood: ${this.currentMood}`
        petState.textContent = `${this.mood.sleepy}`
    },
    play() {
        console.log(`${this.name} is playing...`)
        this.interactionOff()
        this.canDoNone()
        this.currentMood = "playing"
        petMood.textContent = `Mood: ${this.currentMood}`
        petState.textContent = `${this.mood.playing}`
        const playing = setInterval( () => {
            if(this.boredom > 1) {
                this.boredom--
                console.log(`${this.name} is still playing... (boredom: ${this.boredom})`)
                petBoredom.textContent = `Boredom: ${pet.boredom}`
            }
            else {
                console.log(`${this.name} is happy!`)
                clearInterval(playing)
                petBoredom.textContent = `Boredom: ${pet.boredom}`
                this.currentMood = "content"
                petMood.textContent = `Mood: ${this.currentMood}`
                petState.textContent = `${this.mood.content}`
                this.interactionOn()
                this.canDoAll()
                return
            }
        }, 1000)
    },
    eat() {
        console.log(`${this.name} is eating...`)
        this.interactionOff()
        this.canDoNone()
        this.currentMood = "eating"
        petMood.textContent = `Mood: ${this.currentMood}`
        petState.textContent = `${this.mood.eating}`
        const eating = setInterval( () => {
            if(this.hunger > 1) {
                this.hunger--
                console.log(`${this.name} is still eating... (hunger: ${this.hunger})`)
                petHunger.textContent = `Hunger: ${pet.hunger}`
            }
            else {
                console.log(`${this.name} is full!`)
                clearInterval(eating)
                petHunger.textContent = `Hunger: ${pet.hunger}`
                this.currentMood = "content"
                petMood.textContent = `Mood: ${this.currentMood}`
                petState.textContent = `${this.mood.content}`
                this.interactionOn()
                this.canDoAll()
                return
            }
        }, 1000)
    },
    sleep() {
        console.log(`${this.name} is sleeping...`)
        petContainer.style.backgroundColor = "#222"
        this.interactionOff()
        this.canDoNone()
        this.currentMood = "sleeping"
        petMood.textContent = `Mood: ${this.currentMood}`
        petState.textContent = `${this.mood.sleeping}`
        const sleeping = setInterval( () => {
            if(this.sleepiness > 1) {
                this.sleepiness--
                console.log(`${this.name} is still sleeping... (sleepiness: ${this.sleepiness})`)
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
            }
            else {
                console.log(`${this.name} is awake!`)
                clearInterval(sleeping)
                petContainer.style.backgroundColor = "#CCC"
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
                this.currentMood = "content"
                petMood.textContent = `Mood: ${this.currentMood}`
                petState.textContent = `${this.mood.content}`
                this.interactionOn()
                this.canDoAll()
                return
            }
        }, 1000)
    },
    enableStats() {
        this.canGetOlder = true
        this.canGetBored = true
        this.canGetHungry = true
        this.canGetSleepy = true
    },
    disableStats() {
        this.canGetOlder = false
        this.canGetBored = false
        this.canGetHungry = false
        this.canGetSleepy = false
    },
    interactionOn() {
        this.canGetBored = true
        this.canGetHungry = true
        this.canGetSleepy = true
    },
    interactionOff() {
        this.canGetBored = false
        this.canGetHungry = false
        this.canGetSleepy = false
    },
    canDoAll() {
        this.canPlay = true
        this.canEat = true
        this.canSleep = true
    },
    canDoNone() {
        this.canPlay = false
        this.canEat = false
        this.canSleep = false
    },
}

// EVENT LISTENERS
playBtn.addEventListener("click", () => {
    if(pet.canPlay) {
        pet.play()
    }
})
feedBtn.addEventListener("click", () => {
    if(pet.canEat) {
        pet.eat()
    }
})
sleepBtn.addEventListener("click", () => {
    if(pet.canSleep) {
        pet.sleep()
    }
})
document.querySelector(".refresh").addEventListener("click", () => {
    location.reload()
})

// GAME START
console.log(`Say hello to ${pet.name}!`)
petName.textContent = `Name: ${pet.name}`
petAge.textContent = `Age: ${pet.age}`
petMood.textContent = `Mood: ${pet.currentMood}`
petBoredom.textContent = `Boredom: ${pet.boredom}`
petHunger.textContent = `Hunger: ${pet.hunger}`
petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
pet.enableStats()
pet.canDoAll()
pet.getOlder()
pet.getBored()
pet.getHungry()
pet.getSleepy()