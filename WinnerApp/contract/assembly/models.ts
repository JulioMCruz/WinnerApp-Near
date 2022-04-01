import { PersistentSet, PersistentVector, PersistentMap, u128 } from "near-sdk-as";
import { AccountId, Balance, Duration, Option, OptionCount } from './types'
import { ProposalStatus, VoteOption } from './enums'



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
    rowId: string;
    accountId: AccountId;
    name: string;
    email: string;
    constructor(
        rowId: string,
        accountId: AccountId,
        name: string,
        email: string
    ){
        this.rowId = rowId;
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


