import { Userr } from "./userr";
import {Shift} from './shift'

export interface Schedulee {
    id: number;
    user: Userr;      
    shift: Shift;    
    date: string;     
  }