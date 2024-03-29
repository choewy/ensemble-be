import { ApiController, ApiPipeException } from '@libs/docs';
import { OAuthPlatform } from '@libs/entity';
import { JwtGuard, ReqJwtUser } from '@libs/jwt';
import { Body, Get, Post, Query, Res, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiCreatedResponse, ApiExcludeEndpoint, ApiOperation } from '@nestjs/swagger';
import { Response } from 'express';

import { CreateOAuthUrlCommand, SignWithGoogleCommand, SignWithKakaoCommand, SignWithNaverCommand } from './commands';
import { CreateOAuthUrlDto } from './dtos';
import { OAuthService } from './oauth.service';

@ApiController('oauth', 'OAuth')
export class OAuthController {
  constructor(private readonly oauthService: OAuthService) {}

  @Post()
  @ApiOperation({ summary: 'OAuth 인증 URL 생성' })
  @ApiCreatedResponse({ type: CreateOAuthUrlDto })
  @ApiPipeException()
  async createOAuthUrl(@Body() command: CreateOAuthUrlCommand) {
    return this.oauthService.createOAuthUrl(command);
  }

  @Post('connect')
  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'OAuth 계정 추가 연동' })
  @ApiCreatedResponse()
  async connecOtherOAuth(@ReqJwtUser() userId: number, @Body() command: CreateOAuthUrlCommand) {
    return this.oauthService.createOAuthUrl(command, userId);
  }

  @Get('google')
  @ApiExcludeEndpoint()
  async signWithGoogle(@Res({ passthrough: true }) res: Response, @Query() command: SignWithGoogleCommand) {
    return this.oauthService.signWithOAuth(res, OAuthPlatform.Google, command);
  }

  @Get('kakao')
  @ApiExcludeEndpoint()
  async signWithKakao(@Res({ passthrough: true }) res: Response, @Query() command: SignWithKakaoCommand) {
    return this.oauthService.signWithOAuth(res, OAuthPlatform.Kakao, command);
  }

  @Get('naver')
  @ApiExcludeEndpoint()
  async signWithNaver(@Res({ passthrough: true }) res: Response, @Query() command: SignWithNaverCommand) {
    return this.oauthService.signWithOAuth(res, OAuthPlatform.Naver, command);
  }
}
