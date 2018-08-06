import axios from 'axios'

export default class api {
  static get base(){
    return 'http://localhost:8081'
  }

  static get apiVer(){
    return `${this.base}/api/v1`
  }

  static async getMzTemplate({template}){
    axios.get(`${this.apiVer}/json-example`, {params: {template}} )
  }

  static async uploadTemplate(data){
    return axios.get(`${this.apiVer}/json-example`, data )
  }
}