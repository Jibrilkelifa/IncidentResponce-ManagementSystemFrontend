export interface ToolHealthCheckDTO {
  analystName: string;
  shiftTime: string;
  items: ToolCheckItemDTO[];
}

export interface ToolCheckItemDTO {
  toolName: string;
  checkItem: string;
  response: string;
}
