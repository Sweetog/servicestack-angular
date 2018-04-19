import { Injectable } from '@angular/core';
import { tokenNotExpired, JwtHelper } from 'angular2-jwt';

/**
 * Singleton service to manage token
 * could use localStorage here instead of cookies but do not know about how far back Trade Service wants to go back with old browser support
 */
@Injectable()
export class TokenService {

    private _token;
    private _jwtHelper = new JwtHelper();
    private readonly _refreshTokenKey = 'refresh_token';
    private readonly _bearerTokenKey = 'bearer_token';

    constructor() {

    }

    public parseTokenExtractKey(token: string, key: string): string {
        var t = this._jwtHelper.decodeToken(token);
        return t[key];
    }

    public get refreshToken(): string {
        return localStorage.getItem(this._refreshTokenKey);
    }

    public set refreshToken(value: string) {
        if (!value) {
            return;
        }
        localStorage.setItem(this._refreshTokenKey, value);
    }

    public get bearerToken(): string {
        return localStorage.getItem(this._bearerTokenKey);
    }

    public set bearerToken(value: string) {
        if (!value) {
            return;
        }
        localStorage.setItem(this._bearerTokenKey, value);
    }

    public isRefreshTokenExpired(): boolean {
        var t = this.refreshToken;
        if (!t) {
            return true;
        }
        //tokenNotExpired reads localStorage for the key name you provide
        //https://github.com/auth0/angular2-jwt/issues/334
        return !tokenNotExpired(this._refreshTokenKey);
    }

    public isBearerTokenExpired(): boolean {
        var t = this.bearerToken;
        if (!t) {
            return true;
        }
        //tokenNotExpired reads localStorage for the key name you provide
        //https://github.com/auth0/angular2-jwt/issues/334
        return !tokenNotExpired(this._bearerTokenKey);
    }

    public decodeRefreshToken(): string {
        var t = this.refreshToken;
        if (!t) {
            return null;
        }
        return this._jwtHelper.decodeToken(this.refreshToken);
    }

    public decodeBearerToken(): string {
        var t = this.bearerToken;
        if (!t) {
            return null;
        }
        return this._jwtHelper.decodeToken(this.bearerToken);
    }

    public clearTokens() {
        this.clearBearerToken();
        this.clearRefreshToken();
    }

    public clearBearerToken() {
        localStorage.removeItem(this._bearerTokenKey);
    }

    private clearRefreshToken() {
        localStorage.removeItem(this._refreshTokenKey);
    }

}
