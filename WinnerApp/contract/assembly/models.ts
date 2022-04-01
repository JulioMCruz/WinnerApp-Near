import { PersistentSet, PersistentVector, PersistentMap, u128 } from "near-sdk-as";
import { AccountId, Balance, Duration, Option, OptionCount } from './types'
import { ProposalStatus, VoteOption } from './enums'




@nearBindgen
export class VoteDetail {
    title: string;
    description: string;
}

@nearBindgen
export class VoteTotals {
    title: string;
    description: string;
    count: u64;
    constructor(
        title: string,
        description: string
    ){
        this.title = title;
        this.description = description;
        this.count = 0;
    }
}

@nearBindgen
export class Proposal {
    proposalId: string;
    proposer: AccountId;
    title: string;
    description: string;
    status:  ProposalStatus;
    totalOptions: u16;
    options: PersistentMap<string, VoteTotals>;
    votes: PersistentMap<AccountId, VoteOption>;
    constructor(
        proposalId: string,
        proposer: AccountId,
        title: string,
        description: string,
        status:  ProposalStatus,
        totalOptions: u16
    ){
        this.proposalId = proposalId;
        this.proposer = proposer;
        this.title = title;
        this.description = description;
        this.status = status;
        this.totalOptions = totalOptions;
    }
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


