
import { Context, logging, PersistentUnorderedMap, storage , PersistentSet, PersistentMap} from 'near-sdk-as'
import { Proposal, User, Organization , VoteDetail, VoteTotals} from './models'
import { AccountId } from './types'
import { Common } from './common'
import { ProposalStatus } from './enums';

const users = new PersistentUnorderedMap<AccountId, User>("u");
const proposals = new PersistentUnorderedMap<AccountId, Proposal>("p");
const organizations = new PersistentUnorderedMap<AccountId, Organization>("o");

const MAX_DESCRIPTION_LENGTH: u32 = 280

let tools = new Common();

/*
********************
Organization Methods
********************
*/
export function addOrganization (
  accountId: AccountId, 
  name: string, 
  description: string ): string 
{
  assert(!tools.isNullOrEmpty(accountId), "AccountId is required.");
  assert(!tools.isNullOrEmpty(name), "Name is required.");
  assert(<u32>(description.length) < MAX_DESCRIPTION_LENGTH, 'Description length is too long.');

  let organizationId = Context.blockIndex.toString();
  let organization = new Organization(organizationId,name,description,[accountId],[accountId]);
  organizations.set(organizationId,organization);
  logging.log("Organization : " + name + " Created with Id: " + organizationId);
  return organizationId;
}

export function deleteOrganization(
  organizationId: AccountId, 
): void {
  assert(!tools.isNullOrEmpty(organizationId), "AccountId is required.");
  assert(organizations.contains(organizationId), 'Organization not exist.');
  // needs more implementation
  organizations.delete(organizationId);
  logging.log("OrganizationId : " + organizationId + " deleted.");
}

export function addOrganizationUser(
  organizationId: AccountId,
  userId: AccountId
) : void {
  assert(!tools.isNullOrEmpty(organizationId), "OrganizationId is required.");
  assert(!tools.isNullOrEmpty(userId), "UserId is required.");
  assert(organizations.contains(organizationId), 'Organization not exist.');
  assert(users.contains(userId), 'User not exist.');

  let org = organizations.getSome(organizationId);
  assert(!(org.members.indexOf(userId)>0), 'User Already in the Organization.');
  org.members.push(userId);
}

export function getOrganizationList(): Array<Organization> {
  return organizations.values();
}

export function getOrganization(
  accountId: AccountId
): Organization {
  assert(!tools.isNullOrEmpty(accountId), "AccountId is required.");
  assert(organizations.contains(accountId), 'Organization not exist.');
  return organizations.getSome(accountId);
}

/*
************
User Methods
************
*/
export function addUser(
  accountId: AccountId,
  name: string,
  email: string  
): User {
  assert(!tools.isNullOrEmpty(accountId), "AccountId is required.");
  assert(!tools.isNullOrEmpty(name), "Name is required.");
  assert(<u32>(name.length) < MAX_DESCRIPTION_LENGTH, 'name length is too long.');
  assert(!users.contains(accountId), 'User already exist.');
  let rowId = Context.blockIndex.toString();
  let user = new User(rowId,accountId,name,email);
  users.set(accountId,user);
  logging.log("User with account " + accountId + " was added to the system.");
  return user;
}

export function deleteUser(
  accountId: AccountId, 
): void {
  assert(!tools.isNullOrEmpty(accountId), "AccountId is required.");
  assert(users.contains(accountId), 'AccountId not exist.');
  // needs more implementation
  users.delete(accountId);
  logging.log("AccountId : " + accountId + " deleted.");
}

export function getUserList(): Array<User> {
  return users.values();
}

/*
****************
Proposal Methods
****************
*/

export function addProposal(
  proposerId: AccountId,
  title: string,
  description: string,
  options: Array<VoteDetail>
): Proposal {
  
  assert(!tools.isNullOrEmpty(proposerId), "ProposerId is required.");
  assert(!tools.isNullOrEmpty(title), "Title is required.");
  assert(<u32>(description.length) < MAX_DESCRIPTION_LENGTH, 'Description length is too long.');
  assert(<u16>(options.length) < 10, 'A max of 10 options is allowed.');

  let proposalId = Context.blockIndex.toString();
  let proposal = new Proposal(proposalId, proposerId, title, description, ProposalStatus.Draft, (u16)(options.length));
  let num_proposals = options.length;
  proposal.options = new PersistentMap<string, VoteTotals>('v-proposalId')
  for (let i = 0; i < num_proposals; i ++) {

    let element = options[i];
    //logging.log("Title " + element.title);
    let pos = (i + 1).toString();
    let vote = new VoteTotals(element.title, element.description);
    logging.log("Title " + vote.title);
    proposal.options.set(pos,vote);
  }
  proposals.set(proposalId, proposal);
  return proposal;
}

export function deleteProposal(
  proposalId: AccountId, 
): void {
  assert(!tools.isNullOrEmpty(proposalId), "ProposalId is required.");
  assert(proposals.contains(proposalId), 'ProposalId not exist.');
  // needs more implementation
  proposals.delete(proposalId);
  logging.log("ProposalId : " + proposalId + " deleted.");
}

export function getProposal(
  proposalId: AccountId
): Proposal {
  assert(!tools.isNullOrEmpty(proposalId), "ProposalId is required.");
  assert(proposals.contains(proposalId), 'Proposal not exist.');
  return proposals.getSome(proposalId);
}

export function getProposalOptions(
  proposalId: AccountId
): VoteTotals {
  assert(!tools.isNullOrEmpty(proposalId), "ProposalId is required.");
  assert(proposals.contains(proposalId), 'Proposal not exist.');
  let resultOptions = new Array<VoteTotals>();
  let proposal = proposals.getSome(proposalId);
  //let num_proposals =  proposal.options.;
  // for (let i = 0; i < proposal.options.length; i ++) {
  //   let pos = (i+1).toString();
  //   resultOptions.push(proposal.options.getSome(pos))
  // }
  let value= proposal.options.getSome("1");
  return value;
  //return resultOptions;
}

export function getProposalList(): Array<Proposal> {
  return proposals.values();
}


