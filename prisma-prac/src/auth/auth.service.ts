import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  CognitoIdentityProviderClient, SignUpCommand, InitiateAuthCommand, ConfirmSignUpCommand, GetUserCommand,
  GetUserCommandInput,
  GetUserCommandOutput,
  InitiateAuthCommandInput
} from "@aws-sdk/client-cognito-identity-provider";

@Injectable()
export class AuthService {

  private cognitoClient: CognitoIdentityProviderClient;
  private userPoolId: string;
  private clientId: string;

  constructor(
    private readonly configService: ConfigService,
  ) {

    this.userPoolId = configService.get('userPoolId');
    this.clientId = configService.get('clientId');

    this.cognitoClient = new CognitoIdentityProviderClient({
      region: configService.get('region'),
      credentials: {
        accessKeyId: configService.get('accessKeyId'),
        secretAccessKey: configService.get('secretAccessKey')
      }
    });
  }

  async login(email: string, password: string): Promise<any> {
    const params = {
      AuthFlow: 'USER_PASSWORD_AUTH',
      ClientId: this.clientId,
      AuthParameters: {
        USERNAME: email,
        PASSWORD: password,
      },
    };

    const command = new InitiateAuthCommand(params as any);

    try {
      const result = await this.cognitoClient.send(command);

      console.log("login result", result)
      let value = await this.getUserInfo(result.AuthenticationResult.AccessToken)
      console.log('this.getUserInfo -->', value)
      return {
        accessToken: result.AuthenticationResult.AccessToken,
        refreshToken: result.AuthenticationResult.RefreshToken,
        idToken: result.AuthenticationResult.IdToken,
      };
    } catch (error) {
      throw new Error(`Login error: ${error.message}`);
    }
  }

  async signUp(email: string, password: string): Promise<any> {
    const params = {
      ClientId: this.clientId,
      Username: email,
      Password: password,
      UserAttributes: [
        {
          Name: 'email',
          Value: email,
        },
      ],
    };

    const command = new SignUpCommand(params);

    try {
      const result = await this.cognitoClient.send(command);
      console.log("Result signUP", result);
      return result;
    } catch (error) {
      throw new Error(`Signup error: ${error.message}`);
    }
  }

  async confirmSignUp(email: string, code: string): Promise<any> {
    const params = {
      ClientId: this.clientId,
      Username: email,
      ConfirmationCode: code,
    };

    const command = new ConfirmSignUpCommand(params);

    try {
      const result = await this.cognitoClient.send(command);
      console.log("Result confirmSignUp", result);
      return result;
    } catch (error) {
      throw new Error(`Confirmation error: ${error.message}`);
    }
  }


  async refreshToken(refreshToken: string) {
    const params: InitiateAuthCommandInput = {
      AuthFlow: 'REFRESH_TOKEN_AUTH',
      ClientId: this.clientId, // Replace with your Cognito App Client ID
      AuthParameters: {
        REFRESH_TOKEN: refreshToken,
      },
    };

    try {
      const command = new InitiateAuthCommand(params);
      const response = await this.cognitoClient.send(command);
      return response.AuthenticationResult;
    } catch (error) {
      console.error('Error during token refresh:', error.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  async getUserInfo(accessToken: string) {
    const params: GetUserCommandInput = {
      AccessToken: accessToken,
    };

    try {
      const command = new GetUserCommand(params);
      const userData = await this.cognitoClient.send(command);
      return userData;
    } catch (error) {
      console.error('Error fetching user info:', error.message);
      throw new Error('Failed to fetch user information');
    }

  }
}
