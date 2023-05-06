import UTXOPool from './UTXOPool.js'

class Blockchain {
  // 1. 完成构造函数及其参数
  /* 构造函数需要包含
      - 名字
      - 创世区块
      - 存储区块的映射
  */
  constructor(name, genesisBlock) {
    this.name = name;
    this.blocks = new Map();
    this.blocks.set(genesisBlock.hash, genesisBlock);
  }

  // 2. 定义 longestChain 函数
  /*
    返回当前链中最长的区块信息列表
  */
  longestChain() {
    let currentBlock = this.maxHeightBlock();
    let chain = [];
    while (currentBlock) {
      chain.unshift(currentBlock);
      let previousBlock = this.blocks.get(currentBlock.previousHash);
      currentBlock = previousBlock;
    }
    return chain;
  }

  // 判断当前区块链是否包含
  containsBlock(block) {
    // 添加判断方法
    return this.blocks.has(block.hash);
  }

  // 获得区块高度最高的区块
  maxHeightBlock() {
    let maxHeightBlock = null;
    let maxHeight = -1;
    for (let block of this.blocks.values()) {
      if (block.height > maxHeight) {
        maxHeightBlock = block;
        maxHeight = block.height;
      }
    }
    return maxHeightBlock;
  }

  // 添加区块
  /*
  */
  _addBlock(block) {
    if (!block.isValid()) return;
    if (this.containsBlock(block)) return;
    let parentBlock = this.blocks.get(block.previousHash);
    if (!parentBlock) return; // 没有找到父区块

    let uPool = new UTXOPool(parentBlock.uPool.getAllUTXO());
    let isValidTransactions = true;
    for (let transaction of block.transactions) {
      if (!transaction.isValid(uPool)) {
        isValidTransactions = false;
        break;
      }
      transaction.updateUTXOPool(uPool);
    }
    if (isValidTransactions) {
      block.uPool = uPool;
      block.height = parentBlock.height + 1;
      this.blocks.set(block.hash, block);
    }
  }
}

export default Blockchain
