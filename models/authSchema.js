import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const authSchema = mongoose.Schema(
    {

        name: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32
        },
        email: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            maxlength: 50

        },
        phone: {
            type: Number,
            trim: true,
            required: true,
            maxlength: 25,
            unique: true
        },
        work: {
            type: String,
            trim: true,
            maxlength: 100,
        },
        password: {
            type: String,
            required: true
        },
        tokens: [
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]

    }, { timestamps: true }
);

authSchema.pre('save',async function(next){

    if(this.isModified('password')){
        
        this.password = await bcrypt.hash(this.password,12);
    }

    next()
});

//Auth Token Generation
authSchema.methods.generateAuthToken = async function(){
    try {
        let tokenGen = jwt.sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token:tokenGen});
        await this.save();
        return tokenGen;
    } catch (error) {
        
    }
}


const authModel = mongoose.model('user', authSchema);

export default authModel;