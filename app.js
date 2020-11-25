/*
 * Message Generator Program
 *
 * Requeriments
 *
 * Every time a user runs a program, they should get a new, randomized output.
 * You’re welcome to take the project in a couple of different forms.
 * To make your program truly random, the message that it outputs should be made up of at least three different pieces of data.
 *
 * You’re welcome to expand your program beyond and get creative! In addition to doing random messages, you could add random ASCII art.
 *
 */

/****************
* HTML Controls *
*****************/

const btnRandomMixedGreeting = document.getElementById("btnRandomMixedGreeting")
const btnRandomGreeting = document.getElementById("btnRandomGreeting")
const btnRandomAsciiArt = document.getElementById("btnRandomAsciiArt")
const btnClear = document.getElementById("btnClear")
const txtMessages = document.getElementById("txtMessages")

function init() {
  btnRandomMixedGreeting.addEventListener("click", showRandomMixedMessage)
  btnRandomGreeting.addEventListener("click", showRandomMessage)
  btnRandomAsciiArt.addEventListener("click", showRandomAsciiArt)
  btnClear.addEventListener("click", clear)
}


/*********
* Common *
**********/

const msgPart1 = ["Hola.", "Hi.", "Hallo.", "Hola."]
const msgPart2 = ["¿Cómo estás?", "How are you?", "Wie gehts?", "Com estàs?"]
const msgPart3 = ["¡Tanto tiempo!", "So long!", "So lange!", "Tant de temps!"]

const maxMsgParts = msgPart1.length

const rdnIndex = (max) => Math.floor(Math.random() * max)



/*******************************
* Random Mixed Greeting Button *
********************************/

const getRandomMixedGreeting = (maxLength) =>
  `${msgPart1[rdnIndex(maxLength)]} ${msgPart2[rdnIndex(maxLength)]} ${msgPart3[rdnIndex(maxLength)]}\n`

const showRandomMixedMessage = () => (txtMessages.textContent += getRandomMixedGreeting(maxMsgParts))


/*********************************************
* Random Greeting and ACII Art, common parts *
**********************************************/

/*
   I need to do sampling without replacement because I want to show a random greeting
   when the user click the "Random Greeting" button, but avoiding unnecessary repetition of
   greetings in the same language.

   In order to do that, I need "maxMsgParts" and "lastRandIndexes[]" to know which indexes
   where used already, until every single index will be used: in that case I want to clean
   the array to start again.

   Of course, it can be easily done by setting up arrays to be full greetings in just one
   language, but the goal is to show how to use Math.random
*/

/*
  Necesito hacer un muestreo sin reposición porque quiero mostrar un saludo aleatorio cuando
  el usuario hace clic en el botón "Saludo aleatorio", pero evitando la repetición innecesaria
  de los saludos en un mismo idioma.

  Para hacer eso, necesito "maxMsgParts" y "lastRandIndexes []" para saber qué índices ya se
  usaron, hasta que se use cada índice: en ese caso, quiero limpiar la matriz para comenzar de
  nuevo.

  Por supuesto, se puede hacer fácilmente configurando arreglos para que sean saludos completos
  en solo un idioma, pero el objetivo es mostrar cómo usar Math.random.
*/

/*
  Necessito fer mostreig sense substitució perquè vull mostrar una salutació aleatòria quan
  l'usuari faci clic al botó "Salutació aleatòria", però evitant repeticions innecessàries de
  les salutacions en una mateixa llengua.

  Per fer-ho, necessito "maxMsgParts" i "lastRandIndexes []" per saber quins índexs ja s'utilitzaven,
  fins que es facin servir tots els índexs: en aquest cas vull netejar la matriu per tornar a començar.

  Per descomptat, es pot fer fàcilment configurant arranjaments perquè siguin salutacions complets en
  només un idioma, però l'objectiu és mostrar com utilitzar Math.random
*/

const indexAlreadyUsed = (index, usedIndexes) => usedIndexes.includes(index)

const allIndexesUsedAlready = (maxLength, usedIndexes) => usedIndexes.length === maxLength

const getAvailableIndex = (maxLength, usedIndexes) => {
  //WTF!! usedIndexes = [] doesn't modify the array passed as a parameter!!!
  if (allIndexesUsedAlready(maxLength, usedIndexes)) usedIndexes.length = 0

  let index

  do {
    index = rdnIndex(maxLength)
  } while (indexAlreadyUsed(index, usedIndexes))

  usedIndexes.push(index)

  return index
}



/*************************
* Random Greeting Button *
**************************/

let usedGreetingsIndexes = []

function getRandomGreeting(maxLength, usedIndexes) {
  const index = getAvailableIndex(maxLength, usedIndexes)

  return `${msgPart1[index]} ${msgPart2[index]} ${msgPart3[index]}\n`
}

const showRandomMessage = () => (txtMessages.textContent += getRandomGreeting(maxMsgParts, usedGreetingsIndexes))


/**************************
* Random ASCII Art Button *
***************************/

const fig1 = `
   __
  \\  \\      _ 
   \\**\\ ____\\ \\
  X*#####*___\\_\\
   o/\\**\\
      \\__\\\n`

const fig2 = `
 ---------------+---------------
          ___ /^^[___              _
         /|^+----+   |#___________//
       ( -+ |____|   _______-----+/
        ==_________--'            
          ~_|___|__ -wh\n`

const fig3 = `
                                      (@@@)     (@@@@@)
                               (@@)     (@@@@@@@)        (@@@@@@@)
                         (@@@@@@@)   (@@@@@)       (@@@@@@@@@@@)
                    (@@@)     (@@@@@@@)   (@@@@@@)             (@@@)
               (@@@@@@)    (@@@@@@)                (@)
           (@@@)  (@@@@)           (@@)
        (@@)              (@@@)
       .-.               
       ] [    .-.      _    .-----.
     ."   """"   """""" """"| .--
    (:--:--:--:--:--:--:--:-| [___    .------------------------.
     |C&O  :  :  :  :  :  : [_9_] |'='|.----------------------.|
    /|.___________________________|___|'--.___.--.___.--.___.-'| 
   / ||_.--.______.--.______.--._ |---\\'--\\-.-/==\\-.-/==\\-.-/-'/--
  /__;^=(==)======(==)======(==)=^~^^^ ^^^^(-)^^^^(-)^^^^(-)^^^ jgs
~~~^~~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~^~~~\n`

const asciiFigures = [fig1, fig2, fig3]

let usedAsciiArtIndexes = []

function getRandomAsciiArt(maxLength, usedIndexes) {
  const index = getAvailableIndex(maxLength, usedIndexes)

  return asciiFigures[index]
}

const maxExcludedAsciiIndex = asciiFigures.length

const showRandomAsciiArt = () =>
  (txtMessages.textContent += getRandomAsciiArt(maxExcludedAsciiIndex, usedAsciiArtIndexes))


/***************
* Clear Button *
****************/

const clear = () => (txtMessages.textContent = "")



init()
