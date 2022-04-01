import { PersistentSet, PersistentVector, PersistentMap, u128 } from "near-sdk-as";
import { AccountId, Balance, Duration, Option, OptionCount } from './types'
import { ProposalStatus, VoteOption } from './enums'


@nearBindgen
export class WinnerFactory {
    proposals: PersistentSet<AccountId>;
    organizations: PersistentSet<AccountId>;
    users: PersistentSet<AccountId>;

    constructor(
        proposals: PersistentSet<AccountId>,
        organizations: PersistentSet<AccountId>,
        users: PersistentSet<AccountId>    
        ) {
        proposals = this.proposals
        organizations = this.organizations
        users = this.users
    }
}

@nearBindgen
export class VoteDetail {
    title: string;
    description: string;
    count: u64;
}

@nearBindgen
export class Proposal {
    proposalId: string;
    proposer: AccountId;
    title: string;
    description: string;
    status:  ProposalStatus;
    maxOptions: u16;
    currentOptions: u16;
    maxVotes: u16;
    options: PersistentMap<VoteOption, VoteDetail>;
    votes: PersistentMap<AccountId, VoteOption>;
}

@nearBindgen
export class User {
    accountId: AccountId;
    name: string;
    email: string;
    constructor(
        accountId: AccountId,
        name: string,
        email: string
    ){
        this.accountId = accountId;
        this.name = name;
        this.email = email;
    }
}

@nearBindgen
export class Organization {
    organizacionId: AccountId;
    name: string;
    description: string;
    council: Array<AccountId>;
    members: Array<AccountId>;

    constructor(
        organizacionId: AccountId,
        name: string,
        description: string,
        council: Array<AccountId>,
        members: Array<AccountId>,
    ){
        this.organizacionId = organizacionId;
        this.name = name;
        this.description = description;
        this.council = council;
        this.members = members;
    }
}


