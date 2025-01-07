import { Client, Account } from "react-native-appwrite"
export const appwriteConfig = {
    endpoint: 'https://api.appwrite.io/v1',
    platform: 'com.senisol.storie',
    projectId: '677cf5f20035894b7864',
    databaseId: '677cf84a00272fa391ca',
    userCollectionId: '677cf878000e2ce43118',
    videoColllectionsId: '677cf89e002785f90bc6',
    storageId: '677cfac30024ca34f85c'
}

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setEndpoint(appwriteConfig.endpoint)
    .setPlatform(appwriteConfig.platform);


const account = new Account(client);