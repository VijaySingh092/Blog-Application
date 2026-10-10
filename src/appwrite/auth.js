import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";
// These are the classes imported from the Appwrite SDK.
// Client - Establishes a connection with your Appwrite server.
// Account - Provides authentication-related methods, such as creating an account and logging in.
// ID - Helps generate unique IDs, such as IDs for new users.


// Create the class - AuthService will manage authentication-related operations.
export class AuthService{ 
    client= new Client()  // Create the client
    // Client is the class provided by Appwrite.
    // new Client() creates an instance of that class.
    // client stores that instance.

    account //declares a class field named account. It will later store an instance of Appwrite's Account class.


    // A constructor() is a special method that runs automatically when you create an object from the class using new.
    constructor(){
        // this refers to the current AuthService object.
        this.client  // this.client refers to the client created earlier.
            .setEndpoint(conf.appwriteUrl)  //setEndpoint() tells the client which Appwrite server URL to use.
            .setProject(conf.appwriteProjectId) //This tells the client which Appwrite project your application will use.

            this.account = new Account(this.client)
            // new Account() creates an Appwrite Account instance.
            // this.client passes the configured client into it.
            // this.account stores the instance for later use.
    }

    // We need this. when you want to access a property belonging to the current class instance.
    // account is a property of the current AuthService object.
    // this.account means the account property belonging to the current object.
    // this.client means the client property belonging to the current object.


    async createAccount({email, password, name}){
        try{
            // this.account.create()  -  Calls Appwrite's account-creation method
            // ID.unique() - Generates a unique ID for the new user.
            // userAccount - Stores the returned account information.
         const userAccount = await this.account.create(ID.unique(),email, password, name)

         if(userAccount){  //Check whether the account was created
            // call another method
            return this.login({email, password}) //call the login() method of the current AuthService object and pass it an object containing email and password
            // this refers to the current AuthService instance.
         } else{
              return userAccount  //send the value stored in userAccount
         }
        }catch(error){
            throw error
        }
    }


// logs a user into application using their email and password through Appwrite.
    async login({email, password}){
        try{
        await this.account.createEmailSession(email, password) //createEmailSession() authenticates the user using their email and password and creates a session.
        // A session represents the user's authenticated state after successful login. It allows Appwrite to recognize the user in subsequent requests.
    }catch(error){
        throw error
    }
}


// checks whether a user is currently authenticated in Appwrite application and returns their account information if available.
    async getCurrentUser(){
        try{
         return await this.account.get()
        //  this.account is your Appwrite Account service.
        // .get() retrieves information about the currently authenticated user.
        }catch(error){
           console.log("Appwrite service :: getCurrentUser :: error", error)
        }
        return null
    }


    // method is used to log out the currently authenticated user
    async logout(){
        try{
            await this.account.deleteSessions('all') //deleteSessions() is an Appwrite method that deletes authentication sessions.
        }catch(error){
            console.log("Appwrite service :: logout :: error", error)
        }
    }

}

const authService = new AuthService()  // creates one instance of your AuthService class
// authService stores that instance

export default authService  // makes the instance available for import in other files.