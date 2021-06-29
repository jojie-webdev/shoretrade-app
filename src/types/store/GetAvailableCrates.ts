import { GenericResponse } from 'types/GenericResponse';

export interface Polystyrene {
  id: string;
  airline_approved: boolean;
  created_at: string;
  updated_at: string;
  label: string;
  type: string;
  length: string;
  width: string;
  height: string;
  unit: string;
  company_id?: any;
}

export interface Sfm {
  id: string;
  airline_approved: boolean;
  created_at: string;
  updated_at: string;
  label: string;
  type: string;
  length: string;
  width: string;
  height: string;
  unit: string;
  company_id?: any;
}

export interface Custom {
  id: string;
  airline_approved: boolean;
  created_at: string;
  updated_at: string;
  label: string;
  type: string;
  length: string;
  width: string;
  height: string;
  unit: string;
  company_id?: any;
}

export type GetAvailableCratesMeta = {
  companyId: string;
};

export type GetAvailableCratesPayload = GenericResponse<{
  token: string;
  polystyrene: Polystyrene[];
  sfm: Sfm[];
  custom: Custom[];
}>;
