import { Change } from "diff";
export interface IJotTag {
  time: number;
  text: string;
}

export interface IJotDiff {
  diff: Change[];
  time: number;
}

export interface IJotTagDiff {
  text: string;
  added: boolean;
  time: number;
}

export interface IJot {
  _id: string;
  time: number;
  text: string;
  tags: IJotTag[];
  diffs: IJotDiff[];
  tagDiffs: IJotTagDiff[];
}


export type ISmallJot = Pick<IJot, "tags" | "diffs" | "tagDiffs">;
export type ISmallDiff = Pick<IJotDiff, "time">;

export type IGetAllJotsResponse = ISmallJot[];

// TODO find out how to make this based upon the IJot interface
export interface IGetJotResponse {
  time: number;
  text: string;
  tags: IJotTag[];
  diffs: ISmallDiff[];
  tagDiffs: IJotTagDiff[];
}

export type IGetJotDiffResponse = Change[];
console.log("Sending frame");