
<template>
  <div id="app">
    <nav class="navbar navbar-dark bg-primary">
      <a href="/" class="navbar-brand">VueJS - Firebase</a>
    </nav>
    <div class="container">
      <div class="row mt-5">
        <div class="col-4">
          <div class="card">
            <div class="card-header">
              <h3>Add a new Website</h3>
            </div>
            <div class="card-body">
              <form @submit.prevent = 'addWeb'>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newWebSite.name" placeholder="Name">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newWebSite.autor" placeholder="Autor">
                </div>
                <div class="form-group">
                  <input type="text" class="form-control" v-model="newWebSite.url" placeholder="Url">
                </div>
                <button class="btn btn-primary" type="submit">Enviar</button>
              </form>
            </div>
          </div>
        </div>
        <div class="col-8 text-center">
            <img alt="Vue logo" src="./assets/logo.png">
            <div class="card">
              <div class="card-header">
                <h1>Websites</h1>
              </div>
              <div class="card-body">
                  <table class="table table-striped table-bordered">
                      <thead>
                        <tr>
                          <th>Name</th>
                          <th>Autor</th>
                          <th>Operacion</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="web of websites" :key="web['.key']">
                            <td>
                              <a :ref='web.url' target="_blank">{{web.name}}</a>
                            </td>
                            <td>
                              {{web.autor}}
                            </td>
                            <td>
                              <button class="btn btn-danger">Delete</button>
                            </td>

                        </tr>
                      </tbody>
                       
                  </table>
                  <button @click="mostrar"> asda</button>
              </div>
            </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import firebase from 'firebase';
import config from '@/config.js';

let app = firebase.initializeApp(config);
let db = app.database();
let websiteRef = db.ref('websites');

export default {
  name: "app",
  data(){
    return {
      newWebSite : {
        name : '',
        autor : '',
        url : ''
      },
    }
  },
  firebase : {
    //websites es un arreglo de los documentos
      websites:websiteRef
    
  },
  methods : {
    addWeb(){
      websiteRef.push(this.newWebSite);
      this.newWebSite.name = '';
      this.newWebSite.autor = '';
      this.newWebSite.url = '';
    },
    mostrar(){
      console.log(this.websitess);
    }
  }
};
</script>