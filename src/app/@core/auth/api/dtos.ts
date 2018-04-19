/* Options:
Date: 2018-03-06 10:23:54
Version: 5.03
Tip: To override a DTO option, remove "//" prefix before updating
BaseUrl: http://localhost:5006

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
export enum UserRoleTypes
{
    StandardUserInternal=0,
    AdministratorInternal=1,
    StandardUserContractor=2,
    AdministratorContractor=3,
    StandardUserDistributor=4,
    PriceColumnMaintenance=5,
    PriceColumnAssignment=6,
    ContractorStatusing=7,
    AdministratorDistributor=8,
    StandardUserManufacturer=9,
    AdministratorManufacturer=10,
    Sales=11,
    WebContentEditor=12,
    System=13,
    GlobalCrossReferenceAdmin=14,
    CustomerSupport=15,
}
/**
 * 
        
       
        
        
        
        
        [Description("System - Internal")]
        Internal_System = 13,
        [Description("Distributor - Global Cross-Reference Admin")]
        Distributor_GlobalXRefAdmin = 14,
        [Description("Customer Support")]
        Internal_CustomerSupport = 15
 */
// @Flags()
export enum Products
{
    SupplierXchange = 0,
    TraserSx = 1,
    LinkUpdate = 2,
    TradeLeads = 3,
    LinkUpdateElectrical = 6,
    LinkUpdatePlumbing = 7,
    EDataFlex = 9,
    MarginOptimizer = 11,
    Analytics = 12,
    Automotive = 13,
    PurchaseManager = 14,
    SubmittalsManager = 15,
    PimLite = 16,
}

// @Flags()
export enum ProductFeatures
{
    SupplierXchange_GetAccountData = 0,
    SupplierXchange_UpdateAccountData = 1,
    SupplierXchange_GetCompaniesNearPostalCode = 2,
    SupplierXchange_RequestDistributorRelationship = 3,
    SupplierXchange_RequestNewDistributor = 4,
    SupplierXchange_RequestPriceMatch = 5,
    SupplierXchange_LoadDistributorFile = 6,
    TraserSX_TargetPrice = 7,
    TraserSX_DistributorPrice = 8,
    TraserSX_CostPrice = 9,
    TraserSX_CrossReferences = 10,
    TraserSX_NECAMLU = 12,
    TraserSX_NECALaborRateAssignments = 13,
    TraserSX_SupplierExchange = 14,
    TraserSX_Lists = 15,
    TraserSX_UserAddedItems = 17,
    TraserSX_CustomPriceFormulas = 18,
    TraserSX_ExportToExcel = 20,
    TraserSX_ExportToQuickbooks = 21,
    TraserSX_LinkExport = 22,
    TraserSX_Country_US = 23,
    TraserSX_Country_Canada = 24,
    TraserSX_MfrFilterList = 25,
    TraserSX_PrimaryItemDatabase = 26,
    SupplierXchange_HomePage = 35,
    SupplierXchange_ContractorManagement = 36,
    SupplierXchange_JobAnalysis = 37,
    SupplierXchange_DistributorManagement = 38,
    TraserSX_NECAIconIsVisible = 39,
    LinkUpdates_NECALaborRateAssignments = 40,
    TraserSX_ResalePrice = 41,
    TraserSX_LookupTabs_Generic = 42,
    TraserSX_UserFields = 43,
    TraserSX_Downloads = 44,
    TraserSX_UseMfrDescription = 45,
    TradeLeads_Region1 = 100,
    TradeLeads_Region2 = 101,
    TradeLeads_Region3 = 102,
    TradeLeads_Region4 = 103,
    TradeLeads_Region5 = 104,
    TradeLeads_Region6 = 105,
    TradeLeads_Region7 = 106,
    TradeLeads_Region8 = 107,
    TradeLeads_Region9 = 108,
    TradeLeads_Region10 = 109,
    TradeLeads_Region11 = 110,
    TradeLeads_Region12 = 111,
    TradeLeads_Region13 = 112,
    TradeLeads_Region14 = 113,
    TradeLeads_Region15 = 114,
    TradeLeads_Region16 = 115,
    TradeLeads_Region17 = 116,
    TradeLeads_Region18 = 117,
    TradeLeads_Region19 = 118,
    TradeLeads_Region20 = 119,
    TradeLeads_Region21 = 120,
    TradeLeads_Region22 = 121,
    TradeLeads_Region23 = 122,
    TradeLeads_Region24 = 123,
    TradeLeads_Region25 = 124,
    TradeLeads_Region26 = 125,
    TradeLeads_Region27 = 126,
    TradeLeads_Region28 = 127,
    TradeLeads_Region29 = 128,
    TradeLeads_Region30 = 129,
    TradeLeads_Region31 = 130,
    TradeLeads_Region32 = 131,
    TradeLeads_Region33 = 132,
    TradeLeads_Region34 = 133,
    TradeLeads_Region35 = 134,
    TradeLeads_Region36 = 135,
    TradeLeads_Region37 = 136,
    TradeLeads_Region38 = 137,
    TradeLeads_Region39 = 138,
    TradeLeads_Region40 = 139,
    TradeLeads_Region41 = 140,
    TradeLeads_Region42 = 141,
    TradeLeads_Region43 = 142,
    TradeLeads_Region44 = 143,
    TradeLeads_Region45 = 144,
    TradeLeads_Region46 = 145,
    TradeLeads_Region47 = 146,
    TradeLeads_Region48 = 147,
    TradeLeads_Region49 = 148,
    TradeLeads_Region50 = 149,
    TradeLeads_Region51 = 150,
    TradeLeads_Region52 = 151,
    TradeLeads_Region53 = 152,
    TradeLeads_Region54 = 153,
    TradeLeads_Region55 = 154,
    TradeLeads_Region56 = 155,
    TradeLeads_Region57 = 156,
    TradeLeads_Region58 = 157,
    TradeLeads_Region59 = 158,
    TradeLeads_Region60 = 159,
    TradeLeads_Region61 = 160,
    TradeLeads_Region62 = 161,
    TradeLeads_Region63 = 162,
    TradeLeads_Region64 = 163,
    TradeLeads_Region65 = 164,
    TradeLeads_Region66 = 165,
    TradeLeads_Region67 = 166,
    TradeLeads_Region68 = 167,
    TradeLeads_Region69 = 168,
    TradeLeads_Region70 = 169,
    TradeLeads_Region71 = 170,
    TradeLeads_Region72 = 171,
    TradeLeads_Region73 = 172,
    TradeLeads_Region74 = 173,
    TradeLeads_Region75 = 174,
    TradeLeads_Region76 = 175,
    TradeLeads_Region77 = 176,
    TradeLeads_Region78 = 177,
    TradeLeads_Region79 = 178,
    TradeLeads_Region80 = 179,
    TradeLeads_Region81 = 180,
    TradeLeads_Region82 = 181,
    TradeLeads_Region83 = 182,
    TradeLeads_Region84 = 183,
    TradeLeads_Region85 = 184,
    TradeLeads_Region86 = 185,
    TradeLeads_Region87 = 186,
    TradeLeads_Region88 = 187,
    TradeLeads_Region89 = 188,
    TradeLeads_Region90 = 189,
    TradeLeads_Region91 = 190,
    TradeLeads_Region92 = 191,
    TradeLeads_Region93 = 192,
    TradeLeads_Region94 = 193,
    TradeLeads_Region95 = 194,
    TradeLeads_Region96 = 195,
    TradeLeads_Region97 = 196,
    TradeLeads_Region98 = 197,
    TradeLeads_Region99 = 198,
    TraserSX_SearchAssist = 199,
    TraserSX_TrainingVideo = 200,
    SupplierXchange_DistributorItemManagement = 201,
    TraserSX_Reports = 202,
    SubmittalManager_MfrFilterList = 203,
    eDataFlex_BulletinSummary = 205,
    eDataFlex_UploadDownload = 206,
    eDataFlex_AuthorizedDistributors = 207,
    SupplierXchange_Electrical = 208,
    SupplierXchange_Plumbing = 209,
    Submittals_Electrical = 210,
    Submittals_Plumbing = 211,
    TraserSX_LinkVendorItemFilterRestriction = 212,
    LinkUpdate_LinkVendorItemFilterRestriction = 213,
    Analytics_QuoteReports_CompetitorItemsReturned = 214,
    Analytics_QuoteReports_ShowDistributorInfo = 215,
    Analytics_SimpleSearchTermsReports = 216,
    TraserSX_MCAALaborRate = 217,
    LinkUpdate_MCAALaborRate = 218,
    TraserSX_Electrical = 219,
    TraserSX_ICT = 220,
    TraserSX_Plumbing = 221,
    TraserSX_HVACR = 222,
    Submittals_ITS = 223,
    Submittals_HVACR = 224,
    TraserSX_Restrict_CommCodes_08000_And_57000 = 225,
    Submittals_Restrict_CommCodes_08000_And_57000 = 226,
    TraserSX_Electrical_Bim = 227,
    TraserSX_ITS_Bim = 228,
    TraserSX_Plumbing_Bim = 229,
    LinkUpdate_Restrict_CommCodes_08000_And_57000 = 230,
    TraserSX_TechnicalDocs = 231,
    TraserSX_StandardMfrSuppliedPrices = 232,
    PimLiveDataProcessAdministrator = 233,
    PimLive = 234,
    PimProLive = 235,
    EStoreLive = 236,
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

// @DataContract
export class AssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class UnAssignRolesResponse
{
    // @DataMember(Order=1)
    allRoles: string[];

    // @DataMember(Order=2)
    allPermissions: string[];

    // @DataMember(Order=3)
    responseStatus: ResponseStatus;
}

// @DataContract
export class ConvertSessionToTokenResponse
{
    // @DataMember(Order=1)
    meta: { [index:string]: string; };

    // @DataMember(Order=2)
    responseStatus: ResponseStatus;
}

// @DataContract
export class GetAccessTokenResponse
{
    // @DataMember(Order=1)
    accessToken: string;

    // @DataMember(Order=2)
    responseStatus: ResponseStatus;
}

// @Route("/stub", "GET")
export class GetStub
{
    userRoleTypes: UserRoleTypes;
    products: Products;
    productFeatures: ProductFeatures;
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

// @Route("/assignroles")
// @DataContract
export class AssignRoles implements IReturn<AssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new AssignRolesResponse(); }
    getTypeName() { return "AssignRoles"; }
}

// @Route("/unassignroles")
// @DataContract
export class UnAssignRoles implements IReturn<UnAssignRolesResponse>, IPost
{
    // @DataMember(Order=1)
    userName: string;

    // @DataMember(Order=2)
    permissions: string[];

    // @DataMember(Order=3)
    roles: string[];
    createResponse() { return new UnAssignRolesResponse(); }
    getTypeName() { return "UnAssignRoles"; }
}

// @Route("/session-to-token")
// @DataContract
export class ConvertSessionToToken implements IReturn<ConvertSessionToTokenResponse>, IPost
{
    // @DataMember(Order=1)
    preserveSession: boolean;
    createResponse() { return new ConvertSessionToTokenResponse(); }
    getTypeName() { return "ConvertSessionToToken"; }
}

// @Route("/access-token")
// @DataContract
export class GetAccessToken implements IReturn<GetAccessTokenResponse>, IPost
{
    // @DataMember(Order=1)
    refreshToken: string;
    createResponse() { return new GetAccessTokenResponse(); }
    getTypeName() { return "GetAccessToken"; }
}
