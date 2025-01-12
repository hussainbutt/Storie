import { Client, Account, ID, Avatars, Databases, Query } from "react-native-appwrite"
export const appwriteConfig = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.senisol.storie',
    projectId: '677cf5f20035894b7864',
    databaseId: '677cf84a00272fa391ca',
    userCollectionId: '677cf878000e2ce43118',
    videoColllectionsId: '677cf89e002785f90bc6',
    storageId: '677cfac30024ca34f85c'
}
const {
    endpoint,
    platform,
    projectId,
    databaseId,
    userCollectionId,
    videoColllectionsId,
    storageId
} = appwriteConfig;

const client = new Client();
client
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setPlatform(appwriteConfig.platform);


const account = new Account(client);
const databases = new Databases(client);
const avatars = new Avatars(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username,
        )
        if (!newAccount) throw Error;

        const avatarUrl = avatars.getInitials(username);
        await signIn(email, password);
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar: avatarUrl
            },
        );
        return newUser;
    }
    catch (error) {
        console.log(error);
        throw new Error(error);
    }

}

export const signOut = async () => {
    try {
        await account.deleteSession("current");
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if (!currentUser) throw Error;

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if (!currentUser)
            throw Error;

        return currentUser[0];

    } catch (error) {
        console.log(error);

    }
}

export const getAllPosts = async () => {
    try {
        console.log("getting all posts");

        const posts = await databases.listDocuments(databaseId, videoColllectionsId);
        return posts;

    } catch (error) {
        console.log(error);
    }
}
export const getLatestPosts = async () => {
    try {
        console.log("getting latest posts");

        const posts = await databases.listDocuments(
            databaseId,
            videoColllectionsId,
            [Query.orderDesc("$createdAt", Query.limit(7))]);
        return posts;

    } catch (error) {
        console.log(error);
    }
}