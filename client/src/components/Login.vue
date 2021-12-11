<template>
   <transition name="modal">
      <div class="modal-mask">
        <div class="modal-dialog modal-dialog-centered" role="document">
            <div v-if="!completed" class="modal-content">
                <form @submit="reserveSeats">
                <div class="modal-header">
                    <h5 class="modal-title">Login</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label for="exampleInputEmail1">Login</label>
                        <input type="login" v-model="login" class="form-control" aria-describedby="emailHelp" placeholder="Enter login" required>
                    </div>
                    <div class="form-group">
                        <label for="exampleInputEmail1">Password</label>
                        <input type="password" v-model="password" class="form-control" aria-describedby="emailHelp" placeholder="Enter password" required>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal" @click="$emit('close')">Close</button>
                    <button type="submit" class="btn btn-primary">Login</button>
                </div>
                </form>
            </div>
            <div v-else class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Meet you in cinemamagic</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" @click="$emit('close')">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-footer">
                    <router-link :to="{ name: 'movies' }" class="btn btn-link">To movies -></router-link>
                </div>
            </div>
          </div>
        </div>
    </transition> 
</template>

<script>
export default {
    name: 'login-modal',
    props: {
        title: {
            type: String,
            required: true
        },
        time: {
            type: String,
            required: true
        }
    },
    data () {
        return{
            login: '',
            password: '',
            completed: false
        }
    },
    methods: {
        reserveSeats(e) {
            
            this.$store.dispatch('login', {
                login: this.login,
                password: this.password
            }).then( (x) => {
                this.completed = x;
                if (x){
                    this.$emit('logined');
                    this.$emit('close');
                }

            });
            e.preventDefault();
        }
    }/*,
    created () {
        // eslint-disable-next-line
        console.log()
    }*/
}
</script>

<style>
    .res-modal{
        overflow-y: scroll;
        height: 40vh;
    }

    .reservation-container {
        width: 90%;
        margin-top: 20px;
    }

    .modal-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, .5);
        display: table;
        transition: opacity .3s ease;
    }

    .modal-body{
        max-height: 70vh;
        overflow-y: auto;
    }
</style>
