<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <router-link :to="{ name: 'home' }" class="navbar-brand">
            <img src="./assets/icon.jpg" width="30" height="30" class="d-inline-block align-top" alt="">
            Cinemamagic
        </router-link>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item">
                    <router-link :to="{ name: 'home' }" class="nav-link">Home</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to="{ name: 'movies' }" class="nav-link">Movies</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to=" { name: 'schedule' } " class="nav-link">Schedule</router-link>
                </li>
                <li class="nav-item">
                    <router-link :to=" { name: 'about' } " class="nav-link">About</router-link>
                </li>
                <li v-if="logined" class="nav-item">
                    <router-link :to=" { name: 'booking' } " class="nav-link">Bookings</router-link>
                </li>
            </ul>
        </div>
        <button v-if="stateOfAssistant.visible" type="button" class="btn btn-secondary brrr" @click="hideAssistant()">Hide assistant</button>
        <button type="button" class="btn btn-success brrr" @click="activateVoice()">Ask assistant</button>
        <button v-if="!logined" class="btn btn-link" type="button" @click="register = true">Register</button>
        <button v-if="!logined" class="btn btn-link" type="button" @click="login = true">Login</button>
                
    </nav>
    <div v-if="stateOfAssistant.visible" class="sticky-top box">
    <!-- stuff -->
        <img v-if="stateOfAssistant.success1" class="bet_time" src="./assets/success_1.gif">
        <img v-if="stateOfAssistant.standing" class="bet_time" src="./assets/standing.gif">
        <img v-if="stateOfAssistant.success2" class="bet_time" src="./assets/success_2.gif">
        <img v-if="stateOfAssistant.failure" class="bet_time" src="./assets/failure.gif">
        <img v-if="stateOfAssistant.falling" class="bet_time" src="./assets/falling.gif">
        <img v-if="stateOfAssistant.listening" class="bet_time" src="./assets/listening.gif">
        <img v-if="stateOfAssistant.movingEars" class="bet_time" src="./assets/moving_ears.gif">
    </div>
    <router-view></router-view>
    <login-modal v-if="login" @logined="logined = true" @close="login = false" :title="'ddddd'" :time="'time'" />
    <register-modal v-if="register" @registered="logined = true" @close="register = false" :title="'ddddd23123123'" :time="'time'" />
    
    <!-- <link href="/your-path-to-fontawesome/css/fontawesome.css" rel="stylesheet">
    <link href="/your-path-to-fontawesome/css/brands.css" rel="stylesheet">
    <link href="/your-path-to-fontawesome/css/solid.css" rel="stylesheet"> -->
  </div>
</template>

<script>
/* eslint-disable no-undef */
import login from './components/Login.vue'
import register from './components/Register.vue'

function speak(text) {
// eslint-disable-next-line no-console
console.log(text);

    const synth = window.speechSynthesis;

    if (synth.speaking) {
        // eslint-disable-next-line no-console
        console.error('speechSynthesis.speaking');
        return;
    }
    var utterThis = new SpeechSynthesisUtterance(text);
    // eslint-disable-next-line no-unused-vars
    utterThis.onend = function (event) {
        // eslint-disable-next-line no-console
        console.log('SpeechSynthesisUtterance.onend');
    }
    // eslint-disable-next-line no-unused-vars
    utterThis.onerror = function (event) {
        // eslint-disable-next-line no-console
        console.error('SpeechSynthesisUtterance.onerror');
    }
    let voices = synth.getVoices().sort(function (a, b) {
        const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
        if (aname < bname) return -1;
        else if (aname == bname) return 0;
        else return +1;
    });
    utterThis.voice = voices[10];
    utterThis.pitch = 1;
    utterThis.rate = 1;
    synth.speak(utterThis);
}

var Small = {
    'zero': 0,
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9,
    'ten': 10,
    'eleven': 11,
    'twelve': 12,
    'thirteen': 13,
    'fourteen': 14,
    'fifteen': 15,
    'sixteen': 16,
    'seventeen': 17,
    'eighteen': 18,
    'nineteen': 19,
    'twenty': 20,
    'thirty': 30,
    'forty': 40,
    'fifty': 50,
    'sixty': 60,
    'seventy': 70,
    'eighty': 80,
    'ninety': 90
};

var Magnitude = {
    'thousand':     1000,
    'million':      1000000,
    'billion':      1000000000,
    'trillion':     1000000000000,
    'quadrillion':  1000000000000000,
    'quintillion':  1000000000000000000,
    'sextillion':   1000000000000000000000,
    'septillion':   1000000000000000000000000,
    'octillion':    1000000000000000000000000000,
    'nonillion':    1000000000000000000000000000000,
    'decillion':    1000000000000000000000000000000000,
};

var a, n, g;

function text2num(s) {
    a = s.toString().split(/[\s-]+/);
    n = 0;
    g = 0;
    a.forEach(feach);
    return n + g;
}

function feach(w) {
    var x = Small[w];
    if (x != null) {
        g = g + x;
    }
    else if (w == "hundred") {
        g = g * 100;
    }
    else {
        x = Magnitude[w];
        if (x != null) {
            n = n + g * x
            g = 0;
        }
        else { 
            alert("Unknown number: "+w); 
        }
    }
}

export default {
    name: 'Layout',
    components: {
        'login-modal': login,
        'register-modal': register
    },
    data: () => {
      return {
          logined: false,
          login: false,
          register: false,
          stateOfAssistant: {
              visible: false,
              success1: false,
              success2: false,
              failure: false,
              falling: false,
              listening: false,
              movingEars: false,
              standing: true
          },
          timeout: undefined
      }
    },
    methods: {
        hideAssistant() {
            this.stateOfAssistant.visible = false;
        },
        hideAll() {
            
            this.stateOfAssistant.visible = true,
            this.stateOfAssistant.success1 = false,
            this.stateOfAssistant.success2 = false,
            this.stateOfAssistant.failure = false,
            this.stateOfAssistant.falling = false,
            this.stateOfAssistant.listening = false,
            this.stateOfAssistant.movingEars = false,
            this.stateOfAssistant.standing = false
            
        },
        activateVoice() {
            const r = this.$router;

            this.stateOfAssistant.visible = true;

            var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
            var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList;
            var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

            var grammar = '#JSGF V1.0; grammar phrase;';
            var recognition = new SpeechRecognition();
            var speechRecognitionList = new SpeechGrammarList();
            speechRecognitionList.addFromString(grammar, 1);
            recognition.grammars = speechRecognitionList;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;

            const hide = this.hideAll;

            hide();
            this.stateOfAssistant.listening = true;

            recognition.start();

            const store = this.$store;

            let stat = this.stateOfAssistant;

            recognition.onresult = function (event) {

            var speechResult = event.results[0][0].transcript.toLowerCase();

            // eslint-disable-next-line no-console
            console.log(`Speech result: ${speechResult}`);

            let tt;

            if (speechResult.includes('delete order number')){
                tt = speechResult.slice(20);
                // eslint-disable-next-line no-console
                console.log(tt);

                speechResult = 'delete order number';
            }

            switch (speechResult) {
                case 'hello':
                    speak('Hello. I\'m your voice assistant. Welcome to our site.');
                    hide();
                    stat.standing = true;
                    break;
                case 'please hide':
                    hide();
                    stat.visible = false;
                    speak("you are welcome");
                    break;
                case 'delete order number':
                    
                    // eslint-disable-next-line no-case-declarations
                    let z = text2num(tt);
                    // eslint-disable-next-line no-case-declarations
                    const booking = store.state.bookings.find(x => x.index === z);

                    store.dispatch('cancelReservation', {
                        id: booking.id
                    })
                    .then(() => {
                        setTimeout(() => {
                            
                            speak(`The system is removing booking number ${tt}. Be carefull, you won't be able to visit this event.`);
                        }, 1000);

                        hide();
                        stat.failure = true;
                        stat.visible = true;

                        setTimeout(function () {
                            hide();
                            stat.standing = true;
                        }, 7500);
                    })
                    .then(() => r.push({name: 'home'}))
                    .then(() => r.push({name: 'booking'}));
                    break;
                case 'open bookings':
                    setTimeout( () => {
                        r.push({name: 'booking'});
                        speak('I\'m opening bookings page. Here you can see events that you want to visit.');

                    }, 1000 );
                    hide();
                    stat.success2 = true;
                    setTimeout(function () {
                        hide();
                        stat.standing = true;
                    }, 6000);
                    
                    break;
                case 'open schedule':
                    setTimeout( () => {
                        r.push({name: 'schedule'});
                        speak('I\'m opening the schedule page. Information at this page represents available events for booking.');

                    }, 1000 );

                    hide();
                    stat.success1 = true;
                    setTimeout(function () {
                        hide();
                        stat.standing = true;
                    }, 10000);

                    break;
                case 'buy tickets':
                    
                    
                    store.dispatch('reserveSeats', {
                        sessionId: store.state.sessionId,
                        tickets: store.state.chosenSeats.map(s => { return { row: s.row, seat: s.seat };})
                    })
                    .then(() => {
                        setTimeout(() => {
                            speak('Thank you for order. I\'m booking a tickets for you.');
                        }, 1000);

                        hide();
                        stat.success1 = true;

                        setTimeout(function () {
                            hide();
                            stat.standing = true;
                        }, 10000);
                    })
                    .then( () => r.push({name: 'booking'}));

                    
                    break;
                
                case 'open movies':
                    setTimeout( () => {
                        r.push({name: 'movies'});
                        speak('I\'m opening movies page. Here you can see the necessary information about different movies. Enjoy it.');

                    }, 1000 );

                    hide();
                    stat.success2 = true;
                    setTimeout(function () {
                        hide();
                        stat.standing = true;
                    }, 6000);

                    break;
                default:
                    hide();
                    stat.movingEars = true;
                    speak(`Sorry, I can't understand what you said. The phrase I have heard is ${speechResult}`);
            }

            if (stat.timeout){
                clearTimeout(stat.timeout);
            }

            stat.timeout = setTimeout( () => {
                hide();
                stat.falling = true;
                speak('I am waiting for your request.')
            }, 30000 );
        }
    }
    }
}
</script>

<style scoped>
#app {
    margin-bottom: 20px;
}

.bttt {
    margin: 5px;
    margin-left: 10px;
    color: #9a9da0;
}

.brrr {
    margin-left: 10px;
}

.box {
    /* position:relative; */
    background-color: #dad8db;
}
.bet_time {
    display: block;
    margin: auto;
    height: 30vh;
    
    /* position:absolute;
    bottom:0;
    right:0; */
}
</style>
