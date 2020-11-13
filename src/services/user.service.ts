import {injectable, /* inject, */ BindingScope, BindingKey} from '@loopback/core';

@injectable({scope: BindingScope.TRANSIENT})
export class UserService {
  constructor(/* Add @inject to inject parameters */) {}

  /*
   * Add service methods here
   */
}

export const MY_SERVICE = BindingKey.create<UserService>('service.UserService');

export class LogParam {
  // Here we import the File System module of node
  private fs = require('fs');

  constructor() { }

  createFile() {

      this.fs.writeFile('file.txt', 'I am cool!',  function(err: any) {
          if (err) {
              return console.error(err);
          }
          console.log("File created!");
      });
  }

  showFile() {

      this.fs.readFile('file.txt', function (err: any, data: { toString: () => string; }) {
          if (err) {
              return console.error(err);
          }
          console.log("Asynchronous read: " + data.toString());
      });
  }
}