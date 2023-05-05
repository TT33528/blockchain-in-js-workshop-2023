import sha256 from 'crypto-js/sha256.js'

export const DIFFICULTY = 2

class Block {
  // 1. 完成构造函数及其参数

  constructor(ructor(timestamp, transactions, previousHash, nonce = 0) {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = nonce;
    this.hash = this._setHash();
  }

  isValid() {}

  setNonce(nonce) {}

  // 根据交易变化更新区块 hash
  _setHash() {
    return sha256(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).toString();
  }

  // 汇总计算交易的 Hash 值
  /**
   * 默克尔树实现
   */
  combinedTransactionsHash() {}

  // 添加交易到区块
  /**
   *
   * 需包含 UTXOPool 的更新与 hash 的更新
   */
  addTransaction() {}

  // 添加签名校验逻辑
  isValidTransaction(transaction) {
    
  }
}

export default Block
