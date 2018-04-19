/* Options:
Date: 2018-04-17 13:08:23
Version: 5.03
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5005

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

export type CompanySubTypes = "LinkVendor" | "Government" | "Complimentary" | "Internal";

export class CompanyModel
{
    companyId: number;
    companyTypeId: CommodityTypes;
    companySubTypeId: CompanySubTypes;
    companyName: string;
    parentCompanyId: number;
    companyBranchCode: string;
}

// @Flags()
export enum RelationshipStatusesModel
{
    Pending = 1,
    Approved = 2,
    Rejected = 3,
    NeedsPriceFile = 4,
}

export class PointOfContactModel
{
    userId: number;
    emailAddress: string;
    firstName: string;
    lastName: string;
    contractorDistributorRelationshipId: number;
    isPointOfContact: boolean;
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

export class DistributorPriceColumnModel
{
    distributorPriceColumnId: number;
    distributorCompanyId: number;
    distributorPriceColumnCode: string;
    isActive: boolean;
    pricingLastUpdatedDateTime: string;
}

export class ContractorDistributorRelationshipModel
{
    contractorDistributorRelationshipId: number;
    contractorCompanyId: number;
    distributorCompanyId: number;
    relationshipStatusId: RelationshipStatusesModel;
    relationshipStatusDateTime: string;
    distributorPriceColumnCode: string;
    contractorUserId: number;
    notifyContractorOfPriceUpdates: boolean;
    notifyDistributorOfPriceRequests: boolean;
    pricingSourceTypeId: number;
    showJobDetailsToDistributor: boolean;
    showQuantitiesToDistributor: boolean;
    attachJobAnalysisToDistributorPriceRequestNotification: boolean;
    createdDateTime: string;
    lastUpdatedDateTime: string;
    contractorCompanyName: string;
    contractorCompanyAddress1: string;
    contractorCompanyAddress2: string;
    contractorCompanyCity: string;
    contractorCompanyStateProvinceCode: string;
    contractorCompanyPostalCode: string;
    contractorCompanyPhoneNumber: string;
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

// @Route("/existingpricefile", "GET")
export class GetExistingPriceFileForContractor implements IReturn<DistributorPriceColumnModel>
{
    contractorDistributorRelationshipId: number;
    createResponse() { return new DistributorPriceColumnModel(); }
    getTypeName() { return "GetExistingPriceFileForContractor"; }
}

export class GetDistributorPriceColumns implements IReturn<Array<DistributorPriceColumnModel>>
{
    distributorCompanyId: number;
    createResponse() { return new Array<DistributorPriceColumnModel>(); }
    getTypeName() { return "GetDistributorPriceColumns"; }
}

// @Route("/branches", "GET")
export class GetDistributorBranches implements IReturn<Array<CompanyModel>>
{
    createResponse() { return new Array<CompanyModel>(); }
    getTypeName() { return "GetDistributorBranches"; }
}

// @Route("/relationships", "GET")
export class GetContractorDistributorRelationships implements IReturn<Array<ContractorDistributorRelationshipModel>>
{
    relationshipStatus: RelationshipStatusesModel;
    createResponse() { return new Array<ContractorDistributorRelationshipModel>(); }
    getTypeName() { return "GetContractorDistributorRelationships"; }
}

// @Route("/relationships", "GET")
export class GetContractorDistributorRelationship implements IReturn<ContractorDistributorRelationshipModel>
{
    distributorContractorRelationshipId: number;
    createResponse() { return new ContractorDistributorRelationshipModel(); }
    getTypeName() { return "GetContractorDistributorRelationship"; }
}

// @Route("/contacts", "GET")
export class GetPointOfContacts implements IReturn<Array<PointOfContactModel>>
{
    optionalDistributorContractorRelationshipId: number;
    createResponse() { return new Array<PointOfContactModel>(); }
    getTypeName() { return "GetPointOfContacts"; }
}

// @Route("/file", "PUT")
export class PriceFileExisting implements IReturnVoid
{
    contractorDistributorRelationShipIds: number[];
    priceFileName: string;
    createResponse() {}
    getTypeName() { return "PriceFileExisting"; }
}

// @Route("/file", "POST")
export class PriceFileNew implements IReturnVoid
{
    createResponse() {}
    getTypeName() { return "PriceFileNew"; }
}

// @Route("/relationships/deny", "GET")
export class DenyContractor implements IReturnVoid
{
    contractorDistributorRelationshipId: number;
    createResponse() {}
    getTypeName() { return "DenyContractor"; }
}

// @Route("/relationships/approve", "GET")
export class ApproveContractor implements IReturnVoid
{
    contractorDistributorRelationshipId: number;
    createResponse() {}
    getTypeName() { return "ApproveContractor"; }
}

// @Route("/relationships", "POST")
export class PointOfContactsUpdate implements IReturnVoid
{
    pointOfContacts: PointOfContactModel[];
    createResponse() {}
    getTypeName() { return "PointOfContactsUpdate"; }
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
