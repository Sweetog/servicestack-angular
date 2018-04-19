/* Options:
Date: 2018-03-29 07:43:56
Version: 5.03
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5012

//GlobalNamespace: 
//MakePropertiesOptional: True
//AddServiceStackTypes: True
//AddResponseStatus: False
//AddImplicitVersion: 
//AddDescriptionAsComments: True
//IncludeTypes: 
//ExcludeTypes: 
//DefaultImports: 
*/


export interface IReturn<T>
{
    createResponse() : T;
}

export interface IReturnVoid
{
    createResponse() : void;
}

export interface IPost
{
}

export interface IMeta
{
    meta?: { [index:string]: string; };
}

// @Flags()
export enum CommodityTypes
{
    Standard = 0,
    Generic = 1,
    QuickMenu = 3,
    Csi1995 = 4,
    Csi2010 = 5,
    Csi2014 = 6,
    Csi2016 = 7,
}

// @Flags()
export enum IndustryTypes
{
    Electrical = 0,
    Plumbing = 1,
    Hvacr = 3,
    Ict = 6,
}

export class CommodityModel
{
    commodityId: number;
    commodityTypeId: number;
    commodityCode: string;
    commodityDescription: string;
    parentCommodityId: number;
    commodityImageUrl: string;
    displayIndex: number;
    objectCount: number;
}

// @DataContract
export class ResponseError
{
    // @DataMember(Order=1, EmitDefaultValue=false)
    errorCode: string;

    // @DataMember(Order=2, EmitDefaultValue=false)
    fieldName: string;

    // @DataMember(Order=3, EmitDefaultValue=false)
    message: string;

    // @DataMember(Order=4, EmitDefaultValue=false)
    meta: { [index:string]: string; };
}

// @DataContract
export class ResponseStatus
{
    // @DataMember(Order=1)
    errorCode: string;

    // @DataMember(Order=2)
    message: string;

    // @DataMember(Order=3)
    stackTrace: string;

    // @DataMember(Order=4)
    errors: ResponseError[];

    // @DataMember(Order=5)
    meta: { [index:string]: string; };
}

// @DataContract
export class AuthenticateResponse
{
    // @DataMember(Order=1)
    userId: string;

    // @DataMember(Order=2)
    sessionId: string;

    // @DataMember(Order=3)
    userName: string;

    // @DataMember(Order=4)
    displayName: string;

    // @DataMember(Order=5)
    referrerUrl: string;

    // @DataMember(Order=6)
    bearerToken: string;

    // @DataMember(Order=7)
    refreshToken: string;

    // @DataMember(Order=8)
    responseStatus: ResponseStatus;

    // @DataMember(Order=9)
    meta: { [index:string]: string; };
}

// @Route("/commodity/{IndustryId}", "GET")
export class GetCommodities implements IReturn<Array<CommodityModel>>
{
    commodityType: CommodityTypes;
    industryId: IndustryTypes;
    includeCounts: boolean;
    countryCode: string;
    createResponse() { return new Array<CommodityModel>(); }
    getTypeName() { return "GetCommodities"; }
}

// @Route("/commodity/{IndustryId}/{CompanyId", "GET")
export class GetCommoditiesForManufacturerForDisplay implements IReturn<Array<CommodityModel>>
{
    industryId: IndustryTypes;
    companyId: number;
    includeCounts: boolean;
    countryCode: string;
    createResponse() { return new Array<CommodityModel>(); }
    getTypeName() { return "GetCommoditiesForManufacturerForDisplay"; }
}

// @Route("/auth")
// @Route("/auth/{provider}")
// @Route("/authenticate")
// @Route("/authenticate/{provider}")
// @DataContract
export class Authenticate implements IReturn<AuthenticateResponse>, IPost, IMeta
{
    // @DataMember(Order=1)
    provider: string;

    // @DataMember(Order=2)
    state: string;

    // @DataMember(Order=3)
    oauth_token: string;

    // @DataMember(Order=4)
    oauth_verifier: string;

    // @DataMember(Order=5)
    userName: string;

    // @DataMember(Order=6)
    password: string;

    // @DataMember(Order=7)
    rememberMe: boolean;

    // @DataMember(Order=8)
    continue: string;

    // @DataMember(Order=9)
    nonce: string;

    // @DataMember(Order=10)
    uri: string;

    // @DataMember(Order=11)
    response: string;

    // @DataMember(Order=12)
    qop: string;

    // @DataMember(Order=13)
    nc: string;

    // @DataMember(Order=14)
    cnonce: string;

    // @DataMember(Order=15)
    useTokenCookie: boolean;

    // @DataMember(Order=16)
    accessToken: string;

    // @DataMember(Order=17)
    accessTokenSecret: string;

    // @DataMember(Order=18)
    meta: { [index:string]: string; };
    createResponse() { return new AuthenticateResponse(); }
    getTypeName() { return "Authenticate"; }
}