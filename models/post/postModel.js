import PostModel from './postSchema.js'

export const getAllPost = async () => {
    try {

        return await PostModel.find();

    } catch (error) {

        throw error

    }
}

