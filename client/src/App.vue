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
        <button type="button" class="btn btn-success" @click="activateVoice()">Ask assistant</button>
        <button v-if="!logined" class="btn btn-link" type="button" @click="register = true">Register</button>
        <button v-if="!logined" class="btn btn-link" type="button" @click="login = true">Login</button>
                
    </nav>
    <div v-if="stateOfAssistant.visible" class="sticky-top box">
    <!-- stuff -->
        <img v-if="stateOfAssistant.success1" class="bet_time" src="./assets/success_1.gif">
        <img v-if="stateOfAssistant.standing" class="bet_time" src="./assets/standing.gif">
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
              visible: true,
              success1: false,
              standing: true
          }
      }
    },
    methods: {
        activateVoice() {
            const r = this.$router;

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
                    speak('hello');
                    break;
                case 'who are you':
                    speak('i am you but better');
                    break;

                
                case 'delete order number':
                    speak(`removing booking number ${tt}`);
                    r.push({name: 'booking'});
                    // eslint-disable-next-line no-console
                    console.log(store.state.bookings);

                    // eslint-disable-next-line no-case-declarations
                    let z = text2num(tt);

                    // eslint-disable-next-line no-console
                    console.log(z);

                    // eslint-disable-next-line no-case-declarations
                    const booking = store.state.bookings.find(x => x.index === z);

                    store.dispatch('cancelReservation', {
                        id: booking.id
                    }).then(() => r.push({name: 'home'}))
                    .then(() => r.push({name: 'booking'}));
                    
                    
                    
                    break;
                case 'open bookings':
                    speak('open bookings');
                    r.push({name: 'booking'});
                    break;
                case 'open schedule':
                    setTimeout( () => {
                        r.push({name: 'schedule'});
                        speak('opening schedule');

                    }, 1000 );

                    
                    
                    stat.success1 = true;
                    stat.standing = false;
                    setTimeout(function () {
                        stat.success1 = false;
                        stat.standing = true;
                    }, 10000);

                    break;
                case 'buy tickets':
                    speak('buying tickets blyat');
                    // window.location.href = 'movies';
                    // eslint-disable-next-line no-console
                    console.log(r);
                    store.dispatch('reserveSeats', {
                        sessionId: store.state.sessionId,
                        tickets: store.state.chosenSeats.map(s => { return { row: s.row, seat: s.seat };})
                    }).then( () => r.push({name: 'booking'}));

                    // r.push({name: 'booking'});
                    // router.push({name: 'movies'});
                    break;
                
                case 'open movies':
                    speak('opening movies');
                    // window.location.href = 'movies';
                    // eslint-disable-next-line no-console
                    console.log(r);
                    r.push({name: 'movies'});
                    // router.push({name: 'movies'});
                    break;
                default:
                    speak('Sorry, I don\'t understand you');
            }
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
