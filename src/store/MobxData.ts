import { makeAutoObservable } from "mobx"
import { PersonalDetails } from "../models/PersonalDetails";

export default class MobxData {
    token:string='';
    personalDetails?:PersonalDetails;

    constructor() {
        makeAutoObservable(this)
    }
    setToken(token:string){
        this.token=token;
    }
    setPersonalDetails(details:PersonalDetails){
        this.personalDetails=details;
    }
}