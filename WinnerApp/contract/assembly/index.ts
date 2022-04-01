
import { Context, logging, PersistentUnorderedMap, storage , PersistentSet} from 'near-sdk-as'
import { WinnerFactory, Proposal, User, Organization } from './models'
import { AccountId } from './types'

const users = new PersistentUnorderedMap<AccountId, User>("u");
const proposals = new PersistentUnorderedMap<AccountId, Proposal>("p");
const organizations = new PersistentUnorderedMap<AccountId, Organization>("o");

const MAX_DESCRIPTION_LENGTH: u32 = 280

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
  assert(!isNullOrEmpty(accountId), "AccountId is required.");
  assert(!isNullOrEmpty(name), "Name is required.");
  assert(<u32>(description.length) < MAX_DESCRIPTION_LENGTH, 'Description length is too long.');

  let organizationId = Context.blockIndex.toString();
  let organization = new Organization(organizationId,name,description,[accountId],[accountId]);
  organizations.set(organizationId,organization);
  logging.log("Organization : " + name + " Created with Id: " + organizationId);
  return organizationId;
}

export function addOrganizationUser(
  organizationId: AccountId,
  userId: AccountId
) : void {
  assert(!isNullOrEmpty(organizationId), "OrganizationId is required.");
  assert(!isNullOrEmpty(userId), "UserId is required.");
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
  assert(!isNullOrEmpty(accountId), "AccountId is required.");
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
  assert(!isNullOrEmpty(accountId), "AccountId is required.");
  assert(!isNullOrEmpty(name), "Name is required.");
  assert(<u32>(name.length) < MAX_DESCRIPTION_LENGTH, 'name length is too long.');
  assert(!users.contains(accountId), 'User already exist.');
  let user = new User(accountId,name,email);
  users.set(accountId,user);
  logging.log("User with account " + accountId + " was added to the system.");
  return user;
}


/*
***************
Private Methods
***************
*/

function isNullOrEmpty(value: string): boolean {
  if (!value) {
    return true;
  } else {
    return false;
  }
}
