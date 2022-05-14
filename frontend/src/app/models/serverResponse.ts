export interface ApiResponse{
    message?: string;
    /**
     * additional data from the api
     */
    [prop: string]: any;
}