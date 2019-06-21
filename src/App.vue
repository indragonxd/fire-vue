
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
              <form @submit.prevent = 'enviar'>
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
                        <tr v-for="web in websites" :key="web['.key']">
                            <td>
                              <a :ref='web.url' target="_blank">{{web.name}}</a>
                            </td>
                            <td>
                              {{web.autor}} - {{web['.key']}}
                            </td>
                            <td>
                              <div class="container">
                                  <div class="row">
                                    <div class="col-6">
                                      <button class="btn btn-danger" @click ='elimarWeb(web)'>Delete</button>
                                    </div>
                                    <div class="col-6">
                                      <button class="btn btn-danger" @click ='editarWeb(web)'>Update</button>
                                    </div>
                                  </div>
                              </div>
                              
                            </td>

                        </tr>
                      </tbody>
                       
                  </table>
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
        '.key' : '',
        name : '',
        autor : '',
        url : ''
      },
      websites : [],
      editar : false
    }
  },/*
  firebase : {
    //websites es un arreglo de los documentos
      websites:websiteRef
    
  },*/
  created(){
    websiteRef.on('value', snapchat => {
      //console.log(snapchat.val());
     
      //guardar los objetos con sus codigos
      this.websites = [];
      let valores = snapchat.val ();
      for( let val in valores ){
        this.websites.push({
          '.key' :val,
          name : valores[val].name,
          autor : valores[val].autor,
          url : valores[val].url

        });
      }
      
    });
  },
  methods : {
    enviar(){
      if(this.editar){
        console.log('websites/'+this.newWebSite['.key']);
        let actualizado = this.newWebSite;

        db.ref('websites/'+this.newWebSite['.key']).update({
            name : actualizado.name,
            autor : actualizado.autor,
            url  : actualizado.url

        });
      }else{
        console.log('guarde');
        this.addWeb();
      }
      //reiniciar
      this.reiniciar();
    },
    addWeb(){
      let newObject = {
        name : this.newWebSite.name,
        autor : this.newWebSite.autor,
        url : this.newWebSite.url
      }
      console.log(newObject);
      websiteRef.push(newObject);
      this.reiniciar();
    },
    editarWeb(tarea){
      this.editar = true;
      //primero rellanamos los campos
      this.newWebSite['.key'] = tarea['.key'];
      this.newWebSite.name = tarea.name;
      this.newWebSite.autor = tarea.autor;
      this.newWebSite.url = tarea.url;
      console.log(this.newWebSite['.key']);
    },
    elimarWeb(tarea){
      db.ref('websites/'+tarea['.key']).remove();
    },
    reiniciar(){
      this.editar = false;
      this.newWebSite['.key'] = '';
      this.newWebSite.name = '';
      this.newWebSite.autor = '';
      this.newWebSite.url = '';
    }
  }
};
</script>