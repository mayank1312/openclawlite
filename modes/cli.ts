import {select,isCancel} from "@clack/prompts";
import chalk from "chalk";
import { runAgentMode } from "./agents/orchestrator";
import { runAskMode } from "./ask/orchestrator";
import { runPlanMode } from "./plan/orchestrator";

export async function runCliMode(){
    while(true){
        const mode=await select({
    message:"choose cli sub mode",
    options:[
        {value:"agent",label:"Agent Mode"},
        {value:"plan",label:"Plan mode"},
        {value:"ask",label:"Ask mode"},
        {value:"back",label:"<- Back to main menu"}
     ]
    })
    if(isCancel(mode)|| mode==="back") return ;
    if(mode==="agent") {
        await runAgentMode();
    }
    if(mode==="plan") {
        await runPlanMode();
    }
    if(mode==="ask") {
       await runAskMode();
    }
    if(mode !=="agent" && mode !== "ask"  && mode !== "plan"){
        console.log(chalk.yellow("\n that mode is not implemented yet \n"))
    }

    }
}