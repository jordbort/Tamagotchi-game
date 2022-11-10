# Tamagotchi-game
NOTES

Webpage should feature:<br/>
    - the pet on screen<br/>
    - visible metrics (name, hunger, sleepiness, boredom, age)<br/>
    - Button to feed your pet (decreases hunger)<br/>
    - Button to turn the lights off and on (character sleeps)<br/>
    - Button to play with your pet (decreases boredom)

Functionality:<br/>
    - Game should start with naming your pet<br/>
    - Age should start at 0 and increase every x minutes<br/>
    - Hunger, sleepiness and boredom are on a scale of 1-10<br/>
    - If any one stat hits 10, the character dies<br/>
    - Values should lower when interacted with in a respective way<br/>
    - Values shouldn't go lower than 1<br/>
    - Values should not be increasing before naming the character, while eating/sleeping/playing, or after dying<br/>
    - Interaction buttons also should not be available during the above states

Game states:<br/>
    - Initial "name your pet" state<br/>
    - Idle, watching your character's state deteriorate lol (only state with interation buttons and rising stat values)<br/>
    - Letting your pet sleep<br/>
    - Playing with your pet<br/>
    - Dead/game over screen<br/>
    - (Optional: evolution screen)

USER STORY<br/>
    - User should start by seeing the pet and entering a name in a text field<br/>
    - User should be able to submit a name by hitting Enter or clicking a Submit button<br/>
    - User should notice the game switching to the main "idle" state<br/>
    - User should see the stats and numbers rising if they don't interact<br/>
    - User should be able to click on one of three buttons to care for their pet<br/>
    - User should see the image of their pet change to reflect whichever interaction is happening<br/>
    - User should see their character die with "game over" text if a stat hits 10<br/>
    - User should then see a message to refresh their page, or there'll be a button to do it