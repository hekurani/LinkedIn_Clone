//si dto i JWTpayload qe duhet me pas keto variabla
export type JWTpayload ={
    userId:number,
    roles: { id:number,role: string }[],  // Inline object definition for roles:,
    email:string
}
