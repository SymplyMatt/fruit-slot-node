import { Router, Request, Response } from 'express';

export default function sendResponse (res : Response, response : number,message : String, data : any = {}){
    if(JSON.stringify(data) == "{}"){
        return  res.status(response).json({
            message,
        })
    }
    return res.status(response).json({
        message,
        data
    })
}