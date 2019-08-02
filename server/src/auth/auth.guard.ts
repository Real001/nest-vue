import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from  '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean {
		const ctx = GqlExecutionContext.create(context);
		const token = ctx.getContext().req.header('authorization');
		// console.log((this.jwtService.decode(token)));
		// if (this.jwtService.decode(token)) {
		// 	return true
		// }
		return true;
	}
}