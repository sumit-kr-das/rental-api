import NewsLetterSchema from '../../models/NewsLetterSchema.js';

const newsLetterController = {
    async newsLetter(req,res,next){
        const newMail = new NewsLetterSchema({email:req.body.email});
        try{
            await newMail.save();
            res.send({ msg: "Email registered"});
        }catch(err){
            next(err);
        }
    }
}

export default newsLetterController;