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
const statusMsg = document.querySelector("h3")
const petName = document.querySelector(".pet-name")
const petAge = document.querySelector(".pet-age")
const petStatus = document.querySelector(".pet-status")
const petBoredom = document.querySelector(".pet-boredom")
const petHunger = document.querySelector(".pet-hunger")
const petSleepiness = document.querySelector(".pet-sleepiness")
const playBtn = document.querySelector(".pet-play")
const feedBtn = document.querySelector(".pet-feed")
const sleepBtn = document.querySelector(".pet-sleep")
const petButtons = document.querySelector(".pet-interactions")

// PET DATA AND METHODS
const pet = {
    // name: prompt("What is your pet's name?"),
    name: "Yaboi",
    age: 0,
    alive: true,
    currentStatus: "content",
    mood: {
        content: "🙂️",
        bored: "😮‍💨️",
        hungry: "🤤️",
        sleepy: "🥱️",
        playing: "😄️",
        eating: "😋️",
        sleeping: "😴️",
        sad: "😭️",
        dead: "😵️",
    },
    canGetOlder: false,
    canGetBored: false,
    canGetHungry: false,
    canGetSleepy: false,
    canPlay: false,
    canEat: false,
    canSleep: false,
    boredom: 1,
    hunger: 1,
    sleepiness: 1,
    getOlder() {
        const aging = setInterval( () => {
            if(this.canGetOlder) {
                this.age++
                statusMsg.style.color = "#EE0"
                statusMsg.textContent = `${this.name} just had a birthday!`
                petAge.textContent = `Age: ${pet.age}`
            }
        }, 60000)
    },
    getBored() {
        const bored = setInterval( () => {
            if(this.canGetBored) {
                if(this.boredom <= 0) {
                    this.boredom = 0
                }
                this.boredom++
                petBoredom.textContent = `Boredom: ${pet.boredom}`
                if(this.boredom >= 12) {
                    statusMsg.style.color = "#E00"
                    statusMsg.textContent = `${this.name} got bored to death at age ${this.age}.`
                    this.die()
                    clearInterval(bored)
                    return
                }
                if(this.boredom >= 6) {
                    this.bored()
                }
            }
        }, 3750)
    },
    getHungry() {
        const hungry = setInterval( () => {
            if(this.canGetHungry) {
                if(this.hunger <= 0) {
                    this.hunger = 0
                }
                this.hunger++
                petHunger.textContent = `Hunger: ${pet.hunger}`
                if(this.hunger >= 12) {
                    statusMsg.style.color = "#E00"
                    statusMsg.textContent = `${this.name} has died of starvation at age ${this.age}.`
                    this.die()
                    clearInterval(hungry)
                    return
                }
                if(this.hunger >= 6) {
                    this.hungry()
                }
            }
        }, 7500)
    },
    getSleepy() {
        const sleepy = setInterval( () => {
            if(this.canGetSleepy) {
                if(this.sleepiness <= 0) {
                    this.sleepiness = 0
                }
                this.sleepiness++
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
                if(this.sleepiness >= 12) {
                    statusMsg.style.color = "#E00"
                    statusMsg.textContent = `${this.name} has died of exhaustion at age ${this.age}.`
                    this.die()
                    clearInterval(sleepy)
                    return
                }
                if(this.sleepiness >= 6) {
                    this.sleepy()
                }
            }
        }, 15000)
    },
    die() {
        petButtons.style.display = "none"
        this.disableStats()
        this.canDoNone()
        this.currentStatus = "dead"
        this.alive = false
        petStatus.textContent = `Status: ${this.currentStatus}`
        petState.textContent = `${this.mood.dead}`
    },
    bored() {
        this.currentStatus = "bored"
        petStatus.style.color = "#E00"
        petBoredom.style.color = "#E00"
        petStatus.textContent = `Status: ${this.currentStatus}`
        petState.textContent = `${this.mood.bored}`
        if(this.boredom >= 6) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} is feeling a little bored.`
        }
        if(this.boredom >= 8) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} wants you to play with them!`
        }
        if(this.boredom >= 10) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} is bored to tears...`
            petState.textContent = `${this.mood.sad}`
        }
    },
    hungry() {
        this.currentStatus = "hungry"
        petStatus.style.color = "#E00"
        petHunger.style.color = "#E00"
        petStatus.textContent = `Status: ${this.currentStatus}`
        petState.textContent = `${this.mood.hungry}`
        if(this.hunger >= 6) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} is feeling hungry.`
        }
        if(this.hunger >= 8) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} wants to eat something!`
        }
        if(this.hunger >= 10) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} is starving...`
            petState.textContent = `${this.mood.sad}`
        }
    },
    sleepy() {
        this.currentStatus = "sleepy"
        petStatus.style.color = "#E00"
        petSleepiness.style.color = "#E00"
        petStatus.textContent = `Status: ${this.currentStatus}`
        petState.textContent = `${this.mood.sleepy}`
        if(this.sleepiness >= 6) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} is getting a little tired.`
        }
        if(this.sleepiness >= 8) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} wants to take a nap!`
        }
        if(this.sleepiness >= 10) {
            statusMsg.style.color = "#EEE"
            statusMsg.textContent = `${this.name} is feeling exhausted...`
            petState.textContent = `${this.mood.sad}`
        }
    },
    play() {
        petButtons.style.display = "none"
        petStatus.style.color = "#EEE"
        petBoredom.style.color = "#EEE"
        statusMsg.style.color = "#EEE"
        statusMsg.textContent = `${this.name} is playing with you.`
        this.interactionOff()
        this.canDoNone()
        this.currentStatus = "playing"
        petStatus.textContent = `Status: ${this.currentStatus}`
        petState.textContent = `${this.mood.playing}`
        const playing = setInterval( () => {
            if(this.boredom > 1) {
                this.boredom--
                petBoredom.textContent = `Boredom: ${pet.boredom}`
            }
            else {
                statusMsg.style.color = "#EEE"
                statusMsg.textContent = `${this.name} is happy!`
                clearInterval(playing)
                petButtons.style.display = "block"
                petBoredom.textContent = `Boredom: ${pet.boredom}`
                this.currentStatus = "content"
                petStatus.textContent = `Status: ${this.currentStatus}`
                petState.textContent = `${this.mood.content}`
                this.interactionOn()
                this.canDoAll()
                return
            }
        }, 1000)
    },
    eat() {
        petButtons.style.display = "none"
        petStatus.style.color = "#EEE"
        petHunger.style.color = "#EEE"
        statusMsg.style.color = "#EEE"
        statusMsg.textContent = `${this.name} is having a snack.`
        this.interactionOff()
        this.canDoNone()
        this.currentStatus = "eating"
        petStatus.textContent = `Status: ${this.currentStatus}`
        petState.textContent = `${this.mood.eating}`
        const eating = setInterval( () => {
            if(this.hunger > 1) {
                this.hunger--
                petHunger.textContent = `Hunger: ${pet.hunger}`
            }
            else {
                statusMsg.style.color = "#EEE"
                statusMsg.textContent = `${this.name} is full!`
                clearInterval(eating)
                petButtons.style.display = "block"
                petHunger.textContent = `Hunger: ${pet.hunger}`
                this.currentStatus = "content"
                petStatus.textContent = `Status: ${this.currentStatus}`
                petState.textContent = `${this.mood.content}`
                this.interactionOn()
                this.canDoAll()
                return
            }
        }, 1000)
    },
    sleep() {
        petButtons.style.display = "none"
        petStatus.style.color = "#EEE"
        petSleepiness.style.color = "#EEE"
        statusMsg.style.color = "#EEE"
        statusMsg.textContent = `${this.name} is taking a nap.`
        petContainer.style.backgroundColor = "#222"
        this.interactionOff()
        this.canDoNone()
        this.currentStatus = "sleeping"
        petStatus.textContent = `Status: ${this.currentStatus}`
        petState.textContent = `${this.mood.sleeping}`
        const sleeping = setInterval( () => {
            if(this.sleepiness > 1) {
                this.sleepiness--
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
            }
            else {
                statusMsg.style.color = "#EEE"
                statusMsg.textContent = `${this.name} woke up!`
                clearInterval(sleeping)
                petButtons.style.display = "block"
                petContainer.style.backgroundColor = "#CCC"
                petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
                this.currentStatus = "content"
                petStatus.textContent = `Status: ${this.currentStatus}`
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

// GAME START
statusMsg.textContent = `Say hello to ${pet.name}!`
petName.textContent = `Name: ${pet.name}`
petAge.textContent = `Age: ${pet.age}`
petStatus.textContent = `Status: ${pet.currentStatus}`
petBoredom.textContent = `Boredom: ${pet.boredom}`
petHunger.textContent = `Hunger: ${pet.hunger}`
petSleepiness.textContent = `Sleepiness: ${pet.sleepiness}`
petButtons.style.display = "block"
pet.enableStats()
pet.canDoAll()
pet.getOlder()
pet.getBored()
pet.getHungry()
pet.getSleepy()