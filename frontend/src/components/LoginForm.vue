<template id="login-form">
    <div class="login-wrapper">
      <div class="login-left">
        <img height="100" src="../views/images/pom.png">
      </div>
      <form class="login-right" @submit.prevent>
        <p style="color: black">Login</p>
        <div class="form-group">
        <!--
          <input type="text" id="username" placeholder="Username" v-model="username">
          <label for="username">Username</label>    
        </div>
        <div class="form-group">
          <input type="password" id="Password" placeholder="Password" v-model="password">
          <label for="Password">Password</label>    
        </div>
        <div class="checkbox-container">
          <input type="checkbox" v-model="rememberMe">
          <div class="text-checkbox">Remember me</div>
        </div> 
        <div class="button-area">
          <button class="btn btn-primary pull-right" @click="login()" >Login</button>
          -->
            <div id="buttonDiv"></div> 
        </div>
      </form>
    </div>
  </template>
  
  <script>
  //import axios from "axios";
  import { translateAll } from '../js/backend.js'
  import { promptLogin } from '../js/login.js';
  export default {
    name: "LoginForm",
    template: "#login-form",
    data() {
      return {
        rememberMe: false,
        username: "",
        password: ""
      };
    },
    beforeMount() {
      let init = 1000;
      setTimeout(function() {
        document.querySelector(".login-wrapper").classList.toggle("open");
        init = 300;
      }, init);
    },
    async created() {
        await translateAll("es");
    },
    methods: {
      /*isRememberMe() {*/
        /*return this.rememberMe === true;*/
      /*},*/
      /*login() {*/
        /*//we should handle errors in a more scalabe way, but this works for now*/
  
        /*alert(this.username + " " + this.password + " " + this.rememberMe);*/
  
        /*axios*/
          /*.post("http://api2.wisksolution.com/login", {*/
            /*body: {*/
              /*username: this.username,*/
              /*password: this.password*/
            /*}*/
          /*})*/
          /*.then(response => {*/
            /*alert(response);*/
            /*//handle response and save JWT*/
          /*})*/
          /*.catch(err => {*/
            /*alert(err);*/
          /*});*/
      /*},*/
      /*register() {*/
        /*alert("Coming soon ...");*/
      /*}*/
      signedIn(e) {
          this.$router.push("/server/"+e.credential);
      },
    },
    async mounted() {
         await promptLogin(this.signedIn);
    },
  };
  </script>
  
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style>
  * {
    box-sizing: border-box;
  }
  
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }
  
  #sandbox {
    font-family: "Lato", sans-serif;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    flex-direction: row-reverse;
    -webkit-box-pack: center;
    -webkit-justify-content: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    background: linear-gradient(243.87deg, #22bf64 30.6%, #371933 130.6%);
    overflow: hidden;
  }
  
  input {
    font-family: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    border: 0;
    font-size: 16px;
    color: #000;
    border-radius: 0;
    border-botton: 0;
  }
  
  input[type="text"],
  input[type="password"] {
    width: 100%;
    height: 40px;
    border-bottom: 1px solid #aaaaaa;
  }
  
  button,
  input:focus {
    outline: 0;
  }
  
  ::-webkit-input-placeholder {
    font-size: 16px;
    font-weight: 300;
    letter-spacing: -0.00933333em;
  }
  
  .form-group {
    position: relative;
    padding-top: 15px;
    margin-top: 10px;
  }
  
  label {
    position: absolute;
    top: 0;
    opacity: 1;
    -webkit-transform: translateY(5px);
    transform: translateY(5px);
    color: #aaa;
    font-weight: 300;
    font-size: 13px;
    letter-spacing: -0.00933333em;
    transition: all 0.2s ease-out;
  }
  
  input:placeholder-shown + label {
    opacity: 0;
    -webkit-transform: translateY(15px);
    transform: translateY(15px);
  }
  
  
  
  .login-wrapper {
    width: 60vw;
    height: 45vh;
    top: 30vh;
    left: 20vw;
    background-color: #fff;
    box-shadow: 0px 2px 50px rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    overflow: hidden;
    position: fixed;
  }
  
  .login-left {
    width: 30vw;
    height: 45vh;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }
  
  .login-left img {
    display: block;
    object-position: left;
  }
  
  .login-right {
    position: fixed;
    top: 35vh;
    left: 50vw;
    width: 25vw;
    height: 30vh;
  }
  
  .checkbox-container {
    display: flex;
    margin-top: 35px;
  }
  
  .text-checkbox {
    color: #aaa;
    font-size: 16px;
    letter-spacing: -0.00933333em;
    font-weight: 300;
    margin-left: 15px;
  }
  
  input[type="checkbox"] {
    cursor: pointer;
    margin: 0;
    height: 22px;
    position: relative;
    width: 22px;
    -webkit-appearance: none;
    transition: all 180ms linear;
  }
  
  input[type="checkbox"]:before {
    border: 1px solid #aaa;
    background-color: #fff;
    content: "";
    width: 20px;
    height: 20px;
    display: block;
    border-radius: 2px;
    transition: all 180ms linear;
  }
  
  input[type="checkbox"]:checked:before {
    background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
    border: 1px solid #22bf64;
  }
  
  input[type="checkbox"]:after {
    content: "";
    border: 2px solid #fff;
    border-right: 0;
    border-top: 0;
    display: block;
    height: 4px;
    left: 4px;
    opacity: 0;
    position: absolute;
    top: 6px;
    -webkit-transform: rotate(-45deg);
    transform: rotate(-45deg);
    width: 12px;
    transition: all 180ms linear;
  }
  
  input[type="checkbox"]:checked:after {
    opacity: 1;
  }
  
  .button-area {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
  }
  
  .btn {
    font-family: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    background-color: transparent;
    border: none;
    border-radius: 2px;
    height: 40px;
    padding: 0 35px;
    cursor: pointer;
    font-size: 16px;
    text-transform: uppercase;
    letter-spacing: -0.00933333em;
  }
  
  .btn-primary {
    
    color: #fff;
    background: linear-gradient(198.08deg, #22bf64 45.34%, #e281e7 224.21%);
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.1);
    text-align: center;
  }
  
  .btn-primary:hover,
  .btn-primary:focus {
    color: #fff;
    background: linear-gradient(198.08deg, #1b984f 45.34%, #e281e7 224.21%);
  }
  
  .btn-secondary {
    color: #22bf64;
  }
  .btn-secondary:focus,
  .btn-secondary:hover {
    color: #1b984f;
  }
  </style>
  
