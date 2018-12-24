import { Db } from 'mongodb';
import { Express, Request, Response, NextFunction } from 'express';

export namespace Lunarade {
    export interface Application {
        (configurationFilePath: string): void;
        isProduction: boolean;
        configuration: Configuration;
        db: Db;
        app: Express;
        packageFile: any;
        initialized: Promise<Boolean>;
        signingKey: string;
        mandrillApiKey: string;
        initializationResolver(): void;
        createCsrf(token: string): string;
        logAction(req: Request, res: Response, next: NextFunction): void;
        permissions(permissions: string[]): (req: Request, res: Response, next: NextFunction) => void;
    }
    export interface Configuration {
        port: number;
        host: string;
        db: {
            dbName: string;
            host: string;
            port: number;
            auth: {
                user: string;
                password: string;
            },
            ssl: {
                sslCA: (string | Buffer)[];
                sslCRL: (string | Buffer)[];
                sslCert: string | Buffer;
                sslKey: string | Buffer;
                sslPass: string | Buffer;
                sslValidate: boolean;
            },
            ssh: {
                host: string;
                port: number;
                user: string;
                password: string;
                privateKey: string;
                passphrase: string;
            }
        }
    }
}