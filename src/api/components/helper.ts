import { Router } from 'express';

export interface IComponentRoutes<T> {
	readonly name: string;
	readonly controller: T;
	readonly router: Router;

	initRoutes(): void;
	initChildRoutes?(): void;
}


export enum DomainErrorCode{
    EnderecoNaoLocalizado = "EnderecoNaoLocalizado",
}

export class  DomainError {
	public Code : DomainErrorCode;
	public Message : string;

	constructor(code: DomainErrorCode, message: string){
		this.Code = code;
		this.Message = message;
	}
}