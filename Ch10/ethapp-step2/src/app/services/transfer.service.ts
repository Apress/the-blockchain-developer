import { Injectable } from '@angular/core';
const Web3 = require('web3');
import * as TruffleContract from 'truffle-contract';

declare let require: any;
declare let window: any;

const tokenAbi = require('../../../truffle/build/contracts/Transfer.json');

@Injectable({
  providedIn: 'root'
})

export class TransferService {
  private _account: any = null;
  private readonly _web3: any;
  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = window.web3.currentProvider;
    } else {
      this._web3 = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    window.web3 = new Web3(this._web3);
    console.log('transfer.service :: this._web3');
    console.log(this._web3);
  }

  private async getAccount(): Promise<any> {
    console.log('transfer.service :: getAccount :: start');
    if (this._account == null) {
      this._account = await new Promise((resolve, reject) => {
        console.log('transfer.service :: getAccount :: eth');
        console.log(window.web3.eth);
        window.web3.eth.getAccounts((err, retAccount) => {
          console.log('transfer.service :: getAccount: retAccount');
          console.log(retAccount);
          if (retAccount.length > 0) {
            this._account = retAccount[0];
            resolve(this._account);
          } else {
            alert('transfer.service :: getAccount :: no accounts found.');
            reject('No accounts found.');
          }
          if (err != null) {
            alert('transfer.service :: getAccount :: error retrieving account');
            reject('Error retrieving account');
          }
        });
      }) as Promise<any>;
    }
    return Promise.resolve(this._account);
  }

  public async getUserBalance(): Promise<any> {
    const account = await this.getAccount();

    console.log('transfer.service :: getUserBalance :: account');
    console.log(account);

    return new Promise((resolve, reject) => {
      window.web3.eth.getBalance(account, function(err, balance) {
        console.log('transfer.service :: getUserBalance :: getBalance');
        console.log(balance);
        if (!err) {
          const retVal = {account: account, balance: balance};
          console.log('transfer.service :: getUserBalance :: getBalance :: retVal');
          console.log(retVal);
          resolve(retVal);
        } else {
          reject({account: 'error', balance: 0});
        }
      });
    }) as Promise<any>;
  }

  transferEther(value) {
    const that = this;
    console.log('transfer.service :: transferEther to: ' + value.transferAddress + ', from: ' + that._account + ', amount: ' + value.amount);
    return new Promise((resolve, reject) => {
      console.log('transfer.service :: transferEther :: tokenAbi');
      console.log(tokenAbi);
      const transferContract = TruffleContract(tokenAbi);
      transferContract.setProvider(that._web3);
      console.log('transfer.service :: transferEther :: transferContract');
      console.log(transferContract);
      transferContract.deployed().then(function(instance) {
        return instance.pay(
          value.transferAddress,
          {
            from: that._account,
            value: value.amount
          });
      }).then(function(status) {
        if (status) {
          return resolve({status: true});
        }
      }).catch(function(error) {
        console.log(error);
        return reject('transfer.service error');
      });
    });
  }
}
