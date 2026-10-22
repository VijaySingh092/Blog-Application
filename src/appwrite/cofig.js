import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from "appwrite";

export class Service{
    client = new Client() //new Client() creates an instance of the Appwrite client. It needs configuration before it can communicate with your Appwrite project.
    
    // These are class fields declared without initial values.
    // They will hold the Appwrite database and storage service instances later.
    databases  // databases will handle database operations.
    bucket     // bucket will handle file storage operations.

    constructor(){
        // Configure the client
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases(this.client) // creates a database service and receives the configured client
        this.bucket = new Storage(this.client) // Appwrite Storage instance using the same client
    }


    // create new post in appwrite database
    async createPost({title, slug, content, featuredImage, status, userId}){
        try{
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,  // Identifies the database
                conf.appwriteCollectionId,  // Identifies the collection where the post will be stored
                slug, // Sets the document ID
                {                // Contains the document's data
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch(error){
            console.log("Appwrite service :: createPost :: error",error)
        }
    }

    // updates an existing post in your Appwrite database
    async updatePost(slug, {title, content, featuredImage, status }){
        try{
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        }catch(error){
            console.log("Appwrite serive :: updatePost :: error",error)
        }
    }
   
    // deletes the post from database 
    async deletePost(slug){
        try{
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        }catch(error){
            console.log("Appwrite service :: deletePost :: error ",error)
            return false
        }
    }

    // retrieves a single post from appwrite database
    async getPost(slug){
        try{
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            
            )
        }catch(error){
            console.log("Appwrite serive :: getPost :: error", error)
            return false
        }
    }


    // retrieves multiple posts from appwrite database, with a default filter that returns only posts whose status is "active".
    async getPosts(queries =[Query.equal("status","active")]){
        try{
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        }catch(error){
            console.log("Appwrite serive :: getPost :: error",error)
            return false
        }
    }


    // file upload service

    //  upload file
    async uploadFile(file) {
        try{
            // Remember: createFile() uploads the file; it does not create a database document.
            return await this.bucket.createFile(
                conf.appwriteBucketId, // Identifies the storage bucket where the file will be uploaded
                ID.unique(), // Generates a unique ID for the uploaded file
                file  // The actual file being uploaded
            )

        }catch(error){
            console.log("Appwrite serive :: upload file :: error", error)
            return false
        }
    }

    // deletes an already uploaded file from Appwrite Storage
    async deleteFile(fileId){  
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,  // Identifies the storage bucket containing the file
                fileId
            )
            return true   // to indicate that an operation succeeded.
        }catch(error){
            console.log("Appwrite serive :: delete file :: error", error)
            return false   // The operation failed
        }
    }


    // method is used to get a preview URL for an uploaded file stored in Appwrite Storage, such as an image.
    getFilePreview(fieldId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fieldId
        )
    }
}

const service = new Service()

export default service