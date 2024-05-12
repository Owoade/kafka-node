export class AppError extends Error {
    constructor( error: string, code: number, data?: any  ){

        const payload: ErrorInterfce = {
            code,
            value: error,
            data
        }

        super( JSON.stringify(payload) as any );
        
        Error.captureStackTrace(this, this.constructor);
    }
} 

export interface ErrorInterfce {
    code: number,
    value:  string,
    data?: any
}