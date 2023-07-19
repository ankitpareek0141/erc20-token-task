// test/tokenContract.test.js
const { expect } = require('chai');

describe('TokenContract', () => {
  let TokenContract;
  let tokenContract;
  let owner;
  let recipient;
  let spender;

  beforeEach(async () => {
    // Deploy the TokenContract before each test
    TokenContract = await ethers.getContractFactory('TokenContract');
    [owner, recipient, spender] = await ethers.getSigners();

    tokenContract = await TokenContract.deploy('Demo Token', 'DEMO', 18, 1000);
    await tokenContract.deployed();
  });

  it('Should set the correct initial values', async () => {

    let initialSupply = (await ethers.utils.parseUnits("1000", 18)).toString()
    expect(await tokenContract.name()).to.equal('Demo Token');
    expect(await tokenContract.symbol()).to.equal('DEMO');
    expect(await tokenContract.decimals()).to.equal(18);
    expect(await tokenContract.totalSupply()).to.equal(initialSupply);

    const ownerBalance = await tokenContract.balanceOf(owner.address);
    expect(ownerBalance).to.equal(initialSupply);
  });

  it('Should transfer tokens between accounts', async () => {

    const tokensToSend = ethers.utils.parseUnits("100", 18);

    // Transfer 100 tokens from owner to recipient
    await tokenContract.transfer(recipient.address, tokensToSend.toString());
    expect(await tokenContract.balanceOf(recipient.address)).to.equal(tokensToSend);

    const senderAfterBalance = ethers.utils.parseUnits("900", 18);
    expect(await tokenContract.balanceOf(owner.address)).to.equal(senderAfterBalance.toString());
  });

  it('Should emit Transfer event when tokens are transferred', async () => {
    const amount = 100;

    // Transfer tokens from owner to recipient
    await expect(tokenContract.transfer(recipient.address, amount))
      .to.emit(tokenContract, 'Transfer')
      .withArgs(owner.address, recipient.address, amount);
  });

  it('Should approve and transferFrom tokens', async () => {
    const amountToApprove = 200;
    const amountToTransfer = 100;

    // Approve spender to spend 200 tokens from owner
    await tokenContract.approve(spender.address, amountToApprove);
    expect(await tokenContract.allowance(owner.address, spender.address)).to.equal(amountToApprove);

    // spender transfers 100 tokens from owner to recipient
    await tokenContract.connect(spender).transferFrom(owner.address, recipient.address, amountToTransfer);

    expect(await tokenContract.balanceOf(recipient.address)).to.equal(amountToTransfer);
  });

  it('Should emit Approval event when approve is called', async () => {
    const amount = 200;

    // Approve spender to spend 200 tokens from owner
    await expect(tokenContract.approve(spender.address, amount))
      .to.emit(tokenContract, 'Approval')
      .withArgs(owner.address, spender.address, amount);
  });

  it('Should not allow transferring more tokens than the balance', async () => {
    const balance = await tokenContract.balanceOf(owner.address);
    const amountToTransfer = balance + 1;

    // Attempt to transfer more tokens than the balance
    await expect(tokenContract.transfer(recipient.address, amountToTransfer)).to.be.revertedWith('Insufficient balance');
  });

  it('Should not allow transferring from an invalid address', async () => {
    const amountToTransfer = 100;

    // Attempt to transfer from an invalid address
    await expect(tokenContract.transfer('0x0000000000000000000000000000000000000000', amountToTransfer)).to.be.revertedWith('Invalid address');
  });

  it('Should not allow transferring more tokens than approved', async () => {
    const amountToApprove = 100;
    const amountToTransfer = amountToApprove + 1;

    // Approve spender to spend 100 tokens from owner
    await tokenContract.approve(spender.address, amountToApprove);

    // Attempt to transfer more tokens than approved
    await expect(tokenContract.connect(spender).transferFrom(owner.address, recipient.address, amountToTransfer)).to.be.revertedWith('Allowance exceeded');
  });
});
