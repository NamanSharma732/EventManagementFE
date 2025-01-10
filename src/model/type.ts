export interface UpdateDataType {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    remark1: string;
    remark2: string;
  }
  
  export interface CreateDataType {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
  }
  
  export interface ErrorsType {
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    remark1: string;
    remark2: string;
  }
  export interface fetchDataType {
    _id: string;
    role: string;
    firstName: string;
    lastName: string;
    email: string;
    mobile: string;
    password: string;
    remark1: string;
    remark2: string;
    active: boolean;
    jwtTokens: string[];
    createdBy: string;
    updatedBy: string;
    createdOn: string;
    updatedOn: string;
  }
  export interface GameDataType {
    _id: string;
    gameName: string;
    gameId: string;
    tableName: string | null;
    tableId: string | null;
    gameUrl: string;
    active: boolean;
    createdBy: string;
    updatedBy: string;
    location: string | null;
    scanners: number;
    shufflerStyle: string | null;
    timer: number;
    dealer: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    game_type:string;
}
