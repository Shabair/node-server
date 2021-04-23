import AuthModel from './authSchema.js'

export const getAllPost = async () => {
    try {

        return await AuthModel.find();

    } catch (error) {

        throw error

    }
}

export const createUser = async (user) => {
    try {

        const newUser = new AuthModel(user);
        return await newUser.save();
    } catch (error) {

        throw error

    }
}

export const checkEmail = async (email) => {
    try {

        return await AuthModel.find({email});

    } catch (error) {

        throw error

    }
}
