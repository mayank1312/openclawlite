import {select,isCancel} from "@clack/prompts";
import figlet from "figlet";
import chalk from "chalk";
import { runCliMode } from "../modes/cli";
import { runTelegramMode } from "../modes/telegram";

const BANNER_FONT="ANSI Shadow";
const SHADOW=chalk.hex("#5b4d9e");
const FACE=chalk.hex("#e8dcf8").bold;

function printBannerWithShadow(ascii:string){
   const bannerLines=ascii.replace(/\s+$/,'').split("\n")
   const maxLen=Math.max(...bannerLines.map((l)=>l.length),0);
   const rowWidth=maxLen+2;

   for (const line of bannerLines){
    console.log(SHADOW(("  "+line).padEnd(rowWidth)))
   }
   process.stdout.write(`\x1b[${bannerLines.length}A`);
   for (const line of bannerLines){
     console.log(FACE(line.padEnd(rowWidth)))
   }
   console.log();
}


export async function wakeup(){
   let ascii:string;
   try {
     ascii=figlet.textSync("OpenClawLite",{font:BANNER_FONT})
   } catch (error) {
    ascii=figlet.textSync("OpenClawLite",{font:"Standard"})
   }
   printBannerWithShadow(ascii);

   const mode=await select({
    message:"Which mode you want to proceed with?",
    options:[
        {value:"cli",label:"CLI"},
        {value:"telegram",label:"TELEGRAM"},
        {value:"exit",label:"exit"}
    ]
   })
   if(isCancel(mode) || mode==="exit"){
     console.log(chalk.dim("\n GoodBye🥹 \n"))
     return;
   }
   if(mode==="cli"){
    await runCliMode();
   }
   if(mode==="telegram"){
    await runTelegramMode();
   }
   else{
   console.log(chalk.dim("waiting for other response"))
   }
}