import { Product } from "@/models/product.model";

export const GET = async (req , context) => {
    try {

        const { params : {id : spaceName} } = context;
        if(!id) return 

        // session logic

        const product = await Product.findOne({
            name : spaceName
        });

        if(!product) {
            return
        }

        return 
        
    } catch (error) {
        
    }
}