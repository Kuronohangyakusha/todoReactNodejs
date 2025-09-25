export interface payloadToken {
    id: number;
    login: string;
}
export declare class AuthService {
    private userRepository;
    constructor();
    authenticate(login: string, password: string): Promise<{
        token: string;
        id: number;
    }>;
}
//# sourceMappingURL=AuthService.d.ts.map