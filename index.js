import "babel-polyfill"
const axios = require('axios')
const Mustache = require("mustache")
const apiContent = 'https://chartwell-applications.netlify.com/.netlify/functions/content-get-all'
const cacheName = 'chartwell-cache'

class Storage {
    constructor(name) {
      this.cacheName = name
      this.cachePromise = caches.open(name);
    }
  
    async getContent(req) {

      const cache = await this.cachePromise;
      console.log('cache',cache)
      return cache.match(req)
    }

    async cacheAddItem(req, response) {
        const cache = await this.cachePromise
        return cache.add(req, response)
    }

    async deleteContent(req) {
        const cache = await this.cachePromise
        return cache.delete(req)
    }

    async deleteCache() {
        const deleted = await caches.delete(this.cacheName);
        return deleted
    }

    async getCaches() {
        const cacheNames = await caches.keys();
        return cacheNames
    }
}

class Webcontent {
    constructor(lang) {
        this.lang = lang
        this.content = []
        this.template = $('#template').html()
        this.rendered = ''
        this.target = $('#target')
    }
    getKeysContent() {
        let templateVars = {}
        for (let i = 0; i < this.content.length; i++){
            if(this.content[i].data.language === this.lang){
                templateVars[this.content[i].data.id] = this.content[i].data.value
            }
        }
        return templateVars
    }

    render(data) {
        this.content = data.webcontent
        const keys = this.getKeysContent()  
        this.rendered = Mustache.render(this.template, keys)
        this.target.html(this.rendered)
    }
    async getAllTranslationsHttp () {
        let data = await fetch(apiContent)
        return data
    }
}


const content = new Webcontent('en_GB');
const storage = new Storage(cacheName);
Mustache.parse(content.template)

if ('caches' in window) {    
    storage.getContent(apiContent).then(function(response) {

        if(response){
            console.log(response)
            const date = new Date(response.headers.get('date'))
            console.log('date',response.headers.get('Date'))
            //Data is in template
            response.json().then(function(result) {
                //Render in template
                content.render(result)
        });
        }else{
            content.getAllTranslationsHttp().then(function(response) {
                //Render in template
                response.json().then(function(result) {
                    content.render(result)
                });
                //Add item to cache
                storage.cacheAddItem(apiContent, response)
            })
        }
    });
}else{

}


  



  

