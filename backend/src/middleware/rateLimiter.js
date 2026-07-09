import ratelimit from "../config/upstash.js"

const rateLimiter = async(req, res, next) =>{
  try{
    const {success} = await ratelimit.limit(req.ip); //limit is used to limit the number of requests per ip address

    if(!success){ 
      return res.status(429).json({error: "Too many requests"}); //429 is the status code for too many requests
    }

    next();
    
  }
  catch (error) {
    console.error("Error in rateLimiter middleware", error);
    res.status(500).json({message: "Internal server error"});
    next(error);
  }
}

export default rateLimiter