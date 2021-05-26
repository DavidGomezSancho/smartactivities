const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require("./compile");

var accounts;
var inbox;
var activity;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({
      data: bytecode,
      arguments: [""]})
    .send({ from: accounts[0], gas: "1000000" });
});

describe("Inbox", () => {
  it("despliega un contrato", () => {
    assert.ok(inbox.options.address);
  });

  it("anyadir actividad", () => {
    activity = await smartActivities.methods.addActivity("titulo", "Resumen",
          "Descripcion",  "Mi nombre", 1622052392,  1622052992,  1622052092,
          1622052192).send({
        from: accounts[0]
      });
      assert.equal(activity.title, "titulo");
  });

  it("Inscripción a actividad", async () => {
    await smartActivities.methods.inscribeToActivity(activity.id).send({
      from: accounts[0]});
    const inscribed = await smartActivities.methods.getInscribed(activity.id, accounts[0]).call();
    assert.equal(inscribed, true);
  });

  it("Asistir a actividad", async () => {
    await smartActivities.methods.assist(activity.id).send({
      from: accounts[0]});
    const assisted = await smartActivities.methods.getAssisted(activity.id, accounts[0]).call();
    assert.equal(assisted, true);
  });

  it("Votar en actividad", async () => {
    let starsVote = 5;
    await smartActivities.methods.vote(activity.id, starsVote).send({
      from: accounts[0]});
    const voted = await smartActivities.methods.getVoted(activity.id, accounts[0]).call();
    assert.equal(voted, true);
  });

});
