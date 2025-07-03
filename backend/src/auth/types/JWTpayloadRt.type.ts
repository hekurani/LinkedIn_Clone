import { JWTpayload, JWTpayloadCompany } from "./JWTpayload.type";
export type JWTpayloadRt=JWTpayload & {rt:string};
//njejt si JWTpayload

export type JWTpayloadCompRt=JWTpayloadCompany & {rt:string};
//njejt si JWTpayload