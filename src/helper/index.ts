import Cookies from 'js-cookie';
import { IToken } from '../model/Token.model';
import { AES, enc } from 'crypto-js';
import { IUser } from '../model/User.model';
// const key = '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';
export interface JwtPayload {
   credential: string;
   sub: string;
   name: string;
   given_name: string;
   family_name: string;
   picture: string;
   email: string;
}
class Helper {
   keyTk = 'tk';
   key = 'your-secret-key';
   userKey = 'user';

   isValidEmail(email: string): boolean {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
   }

   saveToken(token: IToken) {
      const stringEnToken = this.encrypt(token);
      Cookies.set(this.keyTk, stringEnToken);
   }

   getRefreshToken(): string | null {
      const myCookieValue = Cookies.get(this.keyTk);
      if (!myCookieValue) return null;
      const data: IToken = JSON.parse(myCookieValue);
      return data.refreshToken || null;
   }

   getToken(): string | null {
      const myCookieValue = Cookies.get(this.keyTk);
      if (!myCookieValue) return null;
      const strToken = this.decrypt(myCookieValue);
      if (!strToken) return null;
      const data: IToken = JSON.parse(strToken);
      return data.accessToken || null;
   }

   getFullToken(): IToken | null {
      const myCookieValue = Cookies.get(this.keyTk);
      if (!myCookieValue) return null;
      const strToken = this.decrypt(myCookieValue);
      if (!strToken) return null;
      const data: IToken = JSON.parse(strToken);
      return data || null;
   }

   login(token: IToken) {
      this.saveToken(token);
   }

   logout() {
      Cookies.remove(this.keyTk);
      Cookies.remove(this.userKey);
   }

   encrypt(data: object): string {
      const stringData = JSON.stringify(data);
      return AES.encrypt(stringData, this.key).toString();
   }

   decrypt(encryptedData: string): string | null {
      try {
         const decrypted = AES.decrypt(encryptedData, this.key).toString(enc.Utf8);
         return decrypted || null;
      } catch (error) {
         console.error('Error during decryption:', error);
         return null;
      }
   }

   saveUserData(user: IUser) {
      const userString = this.encrypt(user);
      Cookies.set(this.userKey, userString);
   }
   getUserData() {
      const myCookieValue = Cookies.get(this.userKey);
      if (!myCookieValue) return null;
      const strToken = this.decrypt(myCookieValue);
      if (!strToken) return null;
      const data: IUser = JSON.parse(strToken);
      return data || null;
   }

   /// get embeded link from link youtub
   getVideoYTId(linkYT: string = 'https://www.youtube.com/watch?v=4DEK3cia8cI') {
      const exampleFindLink = 'watch?v=';
      const index = linkYT.indexOf(exampleFindLink);
      const idVideo = linkYT.substring(index + exampleFindLink.length);
      return idVideo;
   }
}

export default new Helper();
