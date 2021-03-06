﻿import { ILanguage, ILicense, IMaintainer, ISyntax, ITag } from "../../interfaces";

export interface IListDetails {
    id: number;
    chatUrl: string;
    description: string;
    descriptionSourceUrl: string;
    donateUrl: string;
    emailAddress: string;
    forumUrl: string;
    homeUrl: string;
    issuesUrl: string;
    languages: ILanguage[];
    license: ILicense;
    maintainers: IMaintainer[];
    name: string;
    policyUrl: string;
    publishedDate: string;
    ruleCount: number;
    submissionUrl: string;
    syntax: ISyntax;
    tags: ITag[];
    updatedDate: string;
    viewUrl: string;
    viewUrlMirrors: string[];
};