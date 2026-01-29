import { Client, Account, Avatars, Databases } from "react-native-appwrite"

export const client = new Client()

client
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('67c5d24d000f9172f860')
  .setPlatform('dev.netninja.sheflie')

export const account = new Account(client)
export const avatars = new Avatars(client)
export const databases = new Databases(client)
//MONGO_URI=mongodb+srv://bonheu404:Arabizi4@drone-project.qxbwvbw.mongodb.net/shelfie
//GEMINI_API_KEY=AIzaSyDbYhKc8_cxnfr_tefBDaT5_24c_IrswyU