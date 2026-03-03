import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context
      .switchToHttp()
      .getRequest<Request & { userId?: string }>();
    const userId = request.headers['x-user-id'] as string | undefined;

    if (!userId) {
      throw new UnauthorizedException('x-user-id header is required');
    }

    if (typeof userId !== 'string' || userId.trim() === '') {
      throw new UnauthorizedException(
        'x-user-id header must be a non-empty string',
      );
    }

    request.userId = userId;
    return true;
  }
}
