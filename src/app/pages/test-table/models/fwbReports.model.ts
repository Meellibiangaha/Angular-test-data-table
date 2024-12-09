export type FwbReportModel = {
  fWB_Details: FwbDetails;
  agent_Details: FwbAgentDetails;
  shipper_Details: FwbShipperDetails;
  consignee_Details: FwbConsigneeDetails;
};

export type FwbDetails = {
  Sequence: number;
  AWBID: number; // обязательное поле
  AWB_Prefix: string; // обязательное поле
  AWB_Serial: string; // обязательное поле
  AWB_Origin: string; // обязательное поле
  AWB_Destination: string; // обязательное поле
  Pieces: number;
  Weight_Actual: number; // обязательное поле
  Weight_Identifier: string; // обязательное поле
  Volume: number;
  Volume_Identifier: string;
  Goods_Description: string;
  AgentId: number;
  ShipperId: number;
  ConsigneeId: number;
  ModifiedTime: Date;
};

export type FwbAgentDetails = {
  Sequence: number;
  Account_Number: string;
  IATA_Code: string;
  IATA_CASS_Adress: string;
  Participant_Identifier: string;
  Name: string;
  Place: string;
};

export type FwbShipperDetails = {
  Sequence: number;
  Account_Number: string;
  Names: string;
  Addresses: string;
  Place: string;
  State: string;
  Country_Code: string;
  Post_Code: string;
};

export type FwbConsigneeDetails = {
  Sequence: number;
  Account_Number: string;
  Names: string;
  Addresses: string;
  Place: string;
  State: string;
  Country_Code: string;
  Post_Code: string;
};
