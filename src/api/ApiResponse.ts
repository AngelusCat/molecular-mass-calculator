import { Status } from "./Status"

export class ApiResponse {
    private status: Status;
    private data: Record<string, any>|{};
    private message: string;
    private errors: Record<string, any>|{};
    
    constructor(status: Status, data: Record<string, any>|{}, message: string, errors: Record<string, any>|{}) {
        this.status = status;
        this.data = data;
        this.message = message;
        this.errors = errors;
    }
    
    getAll(): {status: string, data: Record<string, any>|{}, message: string, errors: Record<string, any>|{}} {
        return {
            status: this.status,
            data: this.data,
            message: this.message,
            errors: this.errors
        }
    }
}