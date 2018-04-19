import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpEvent, HttpParams, HttpEventType, HttpHeaders } from '@angular/common/http'
import { JsonServiceClientAuth } from '../../../@core/auth/json.service.client.auth'
import { ApiHelper } from '../../../@core/api/api.helper'
import { GetContractorDistributorRelationships, ContractorDistributorRelationshipModel, DenyContractor, ApproveContractor, GetPointOfContacts, PointOfContactModel, PointOfContactsUpdate, GetContractorDistributorRelationship, RelationshipStatusesModel, CompanyModel, GetDistributorBranches, PriceFileNew, PriceFileExisting, DistributorPriceColumnModel, GetDistributorPriceColumns, GetExistingPriceFileForContractor } from './dtos';
import { GetAccessToken } from '../../auth/api/dtos';


@Injectable()
export class DistributorService {
  private baseUrl: string;
  private client: JsonServiceClientAuth;

  constructor(private apiHelper: ApiHelper,
    private http: HttpClient) {
    this.baseUrl = apiHelper.getServiceUrl(apiHelper.ServiceNames.distributor);
    this.client = new JsonServiceClientAuth(this.baseUrl);
  }

  getExistingPriceFileForContractor(contractorDistributorRelationshipId: number): Promise<DistributorPriceColumnModel> {
    let promise = new Promise<DistributorPriceColumnModel>((resolve, reject) => {
      var req = new GetExistingPriceFileForContractor();
      req.contractorDistributorRelationshipId = contractorDistributorRelationshipId;

      this.client.get(req)
        .then(res => {
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }
  

  existingPriceFile(distributorContractorRelationshipIds: Array<number>, priceFileName: string): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      var req = new PriceFileExisting();
      req.contractorDistributorRelationShipIds = distributorContractorRelationshipIds;
      req.priceFileName = priceFileName;

      this.client.put(req)
        .then(res => {
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }

  /**
   * 
   * @param distributorContractorRelationshipId 
   * @param priceFileName 
   * @param file 
   * @param fileName 
   */
  newPriceFile(distributorCompanyId:number, distributorContractorRelationshipIds: Array<number>, priceFileName: string, file: any): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {
      let headers: HttpHeaders = new HttpHeaders({'Authorization':'Bearer ' + this.client.bearerToken});

      let formdata: FormData = new FormData();
      //formdata.append('file', file, fileName);
      formdata.append('file', file);


      //change this object names and you will break api.distributor file upload serialization of this metadata - Ogden 2-15-2018
      const fileMetadata = {
        distributorCompanyId,
        distributorContractorRelationshipIds,
        priceFileName
      };

      const blobFileMetadata = new Blob([JSON.stringify(fileMetadata)], {
        type: 'application/json',
      });

      formdata.append('fileMetadata', blobFileMetadata);
      var url = this.baseUrl + '/file';

      const req = new HttpRequest('POST', url, formdata, {
        headers: headers,
        reportProgress: true,
        responseType: 'json'
      });

      this.http.request(req)
        .subscribe(resp => {
          if(resp.type == HttpEventType.Response){
            if(resp.ok){
              resolve();
            }else{
              reject();
            }
          }
        });
    });

    return promise;
  }

  getDistributorPriceColumns(distributorCompanyId: number): Promise<Array<DistributorPriceColumnModel>> {
    let promise = new Promise<Array<DistributorPriceColumnModel>>((resolve, reject) => {
      var req = new GetDistributorPriceColumns();
      req.distributorCompanyId = distributorCompanyId;

      this.client.get(req)
        .then(res => {
          resolve(res);
        }, msg => {
          reject(msg);
        });
    });

    return promise;
  }

  /**
   * 
   */
  getDistributorBranches(): Promise<Array<CompanyModel>> {
    let promise = new Promise<Array<CompanyModel>>((resolve, reject) => {

      var req = new GetDistributorBranches();
      this.client.get(req)
        .then(res => {
          //console.log('DistributorService.getDistributorBranches.success', res);
          resolve(res);
        }, msg => {
          reject(msg);
        });
    });

    return promise;
  }

  /**
   * 
   * @param relationshipId 
   */
  getContractorDistributorRelationship(relationshipId: number): Promise<ContractorDistributorRelationshipModel> {
    let promise = new Promise<ContractorDistributorRelationshipModel>((resolve, reject) => {

      var req = new GetContractorDistributorRelationship();
      req.distributorContractorRelationshipId = relationshipId;

      this.client.get(req)
        .then(res => {
          //console.log('DistributorService.getContractorDistributorRelationship.success', res);
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }

  /**
 * @method getContractorDistributorRelationships
 * @return {Promise<Array<ContractorDistributorRelationshipModel>>}
 */
  getContractorDistributorRelationships(relationshipStatus: RelationshipStatusesModel): Promise<Array<ContractorDistributorRelationshipModel>> {
    let promise = new Promise<Array<ContractorDistributorRelationshipModel>>((resolve, reject) => {

      var req = new GetContractorDistributorRelationships();
      req.relationshipStatus = relationshipStatus;

      this.client.get(req)
        .then(res => {
          //console.log('DistributorService.getContractorDistributorRelationships.success', res);
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }

  /**
   * optional distributorContractorRelationshipId
   * will always return all point of contracts for a company
   * optional distributorContractorRelationshipId will also include information about any contacts selected for the relationship
   * @param distributorContractorRelationshipId 
   */
  getPointOfContacts(distributorContractorRelationshipId: number = 0): Promise<Array<PointOfContactModel>> {
    let promise = new Promise<Array<PointOfContactModel>>((resolve, reject) => {

      var req = new GetPointOfContacts();
      req.optionalDistributorContractorRelationshipId = distributorContractorRelationshipId;

      this.client.get(req)
        .then(res => {
          //console.log('DistributorService.getPointOfContacts.success', res);
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }

  /**
   * 
   * @param contractorDistributorRelationshipId 
   */
  denyContractor(contractorDistributorRelationshipId: number): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {

      var req = new DenyContractor();
      req.contractorDistributorRelationshipId = contractorDistributorRelationshipId;

      this.client.put(req)
        .then(res => {
          //console.log('DistributorService.denyContractor.success', res);
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }

  /**
   * 
   * @param contractorDistributorRelationshipId 
   */
  approveContractor(contractorDistributorRelationshipId: number): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {

      var req = new ApproveContractor();
      req.contractorDistributorRelationshipId = contractorDistributorRelationshipId;

      this.client.put(req)
        .then(res => {
          //console.log('DistributorService.approveContractor.success', res);
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }


  /**
   * 
   * @param pointOfContacts 
   */
  updatePointOfContacts(pointOfContacts: Array<PointOfContactModel>): Promise<void> {
    let promise = new Promise<void>((resolve, reject) => {

      var req = new PointOfContactsUpdate();
      req.pointOfContacts = pointOfContacts;

      this.client.put(req)
        .then(res => {
          //console.log('DistributorService.updatePointOfContacts.success', res);
          resolve(res);
        }, msg => {
          reject(msg);
        })
    });

    return promise;
  }

}
