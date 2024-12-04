import {    Shift } from './shift';
import { Userr } from './userr';

export interface Schedule {
  date: string;
  shifts: {
    [shiftName: string]: string[];
  };
}
