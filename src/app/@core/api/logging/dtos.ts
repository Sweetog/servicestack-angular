/* Options:
Date: 2018-03-09 16:04:19
Version: 5.03
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5015

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

export class DistributorPriceFileSummaryModel
{
    processedOn: string;
    fileName: string;
    src: string;
    branchCode: string;
    status: string;
    itemsTotal: number;
    itemsProcessed: number;
}

export class PriceRequestSummaryModel
{
    companyId: number;
    companyName: string;
    branchCode: string;
    postalCode: string;
    parentCompanyId: number;
    industry: string;
    jobsCount: number;
    totalItemCount: number;
    distributorPriceCount: number;
    distributorPriceCountPct: number;
    noMatchCount: number;
    noMatchCountPct: number;
    noDistributorPricesFound: number;
    noDistributorPricesFoundPct: number;
    alternateFoundWhenNoDistributorPriceFound: number;
    alternateFoundWhenNoDistributorPriceFoundPct: number;
}

export class JobsSummaryModel
{
    createdDateTime: string;
    jobId: number;
    jobName: string;
    priceColumnCode: string;
    includeAlternates: boolean;
    pricingSourceType: string;
    totalItemCount: number;
    distributorPriceCount: number;
    distributorPriceCountPct: number;
    noMatchCount: number;
    noMatchCountPct: number;
    noDistributorPricesFound: number;
    noDistributorPricesFoundPct: number;
    alternateFoundWhenNoDistributorPriceFound: number;
    alternateFoundWhenNoDistributorPriceFoundPct: number;
    alternateOption: string;
}

// @Flags()
export enum ItemMatchStatuses
{
    Match_UPC,
    Match_ManufacturerData,
    NoMatch_UPC_NotFound,
    NoMatch_UPC_NotProvided,
    NoMatch_ManufacturerData_NotFound,
    NoMatch_ManufacturerData_NotProvided,
    AmbiguousMatch_UPC,
    AmbiguousMatch_UPCManufacturerCombo,
    AmbiguousMatch_ManufacturerData,
    Alternate,
    Error,
    Match_VendorCode,
    Match_ItemID,
    Match_TsPik,
    Match_MfrCatalogCode,
    Match_CatalogCode,
    AmbiguousMatch_MfrCatalogCode,
    AmbiguousMatch_CatalogCode,
}

// @Flags()
export enum PriceTypes
{
    Col3,
    Distributor,
    DistributorStock,
    DistributorNonStock,
    Amp,
    Col1,
    Col2,
    Resale,
    List,
    Cost,
    Col3Avg,
    Col3High,
    Col3Low,
    AmpHigh,
    AmpLow,
    AmpAvg,
    AverageBid,
}

export class FullResponseModel
{
    seq: number;
    upc: string;
    manufacturerName: string;
    manufacturerCatalogCode: string;
    quantity: number;
    matchStatus: string;
    matchItemId: number;
    matchUpc: string;
    matchManufacturerName: string;
    matchManufacturerCatalogCode: string;
    priceType: string;
    price: number;
    unitOfMeasureTypeCode: string;
    matchStatusId: ItemMatchStatuses;
    transactionLogId: number;
    priceQueryItemResponseId: number;
    priceTypeId: PriceTypes;
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

// @Route("/pricefilesummary", "GET")
export class GetDistributorPriceFileSummary implements IReturn<Array<DistributorPriceFileSummaryModel>>
{
    createResponse() { return new Array<DistributorPriceFileSummaryModel>(); }
    getTypeName() { return "GetDistributorPriceFileSummary"; }
}

// @Route("/contractorpricerequestsummary", "GET")
export class GetContractorPriceRequestSummary implements IReturn<Array<PriceRequestSummaryModel>>
{
    distributorCompanyId: number;
    byCompanyName: string;
    byCompanyId: string;
    createResponse() { return new Array<PriceRequestSummaryModel>(); }
    getTypeName() { return "GetContractorPriceRequestSummary"; }
}

// @Route("/pricerequestsummary", "GET")
export class GetDistributorPriceRequestSummary implements IReturn<Array<PriceRequestSummaryModel>>
{
    byCompanyName: string;
    byCompanyId: string;
    createResponse() { return new Array<PriceRequestSummaryModel>(); }
    getTypeName() { return "GetDistributorPriceRequestSummary"; }
}

// @Route("/contractorjobsummary", "GET")
export class GetContractorJobSummary implements IReturn<Array<JobsSummaryModel>>
{
    byJobName: string;
    byJobId: string;
    distributorCompanyId: number;
    contractorCompanyId: number;
    createResponse() { return new Array<JobsSummaryModel>(); }
    getTypeName() { return "GetContractorJobSummary"; }
}

export class GetJobFullResponse implements IReturn<Array<FullResponseModel>>
{
    jobId: number;
    byUpc: string;
    byManufacturerName: string;
    byCatalogCode: string;
    createResponse() { return new Array<FullResponseModel>(); }
    getTypeName() { return "GetJobFullResponse"; }
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
