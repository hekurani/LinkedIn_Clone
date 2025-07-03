export type JWTpayload = {
    userId: number;
    roleId: number;
    email: string;
    role: string;
}

export type JWTpayloadCompany = {
    companyId: number;
    roleId: number;
    email: string;
    role: string;
}