
import AddListBtn from "./add-list-btn";
import DelayNodeCard from "./delay-node";
import EmailNodeCard from "./email-node";
import LeadNodeCard from "./node-card";
import SequenceNode from "./sequence-node";


export const nodeTypes = {
  "node-card": LeadNodeCard,
  "sequence-node": SequenceNode,
  "last-add-node-btn": AddListBtn,
  "email-node": EmailNodeCard,
  "delay-node": DelayNodeCard,

};
