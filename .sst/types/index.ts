import "sst/node/config";
declare module "sst/node/config" {
  export interface ConfigTypes {
    APP: string;
    STAGE: string;
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "Users": {
      tableName: string;
    }
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "Desks": {
      tableName: string;
    }
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "OrderCodes": {
      tableName: string;
    }
  }
}

import "sst/node/table";
declare module "sst/node/table" {
  export interface TableResources {
    "Orders": {
      tableName: string;
    }
  }
}

import "sst/node/api";
declare module "sst/node/api" {
  export interface AppSyncApiResources {
    "AppSyncApi": {
      url: string;
    }
  }
}

import "sst/node/site";
declare module "sst/node/site" {
  export interface NextjsSiteResources {
    "site": {
      url: string;
    }
  }
}
