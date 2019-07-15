export interface IResponse {
    data?: string;
    message?: string;
    messages?: IMessages;
    success?: boolean;
}
export interface IMessages {
    warning?: [];
    info?: [];
    success?: [];
}
