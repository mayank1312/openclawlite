#!/usr/bin/env bun
import { Command } from "commander";
import { wakeup } from "./tui/wakeup";
const program=  new Command();

program
.name("OpenClawLite-Build")
.description("openclawlite is a powerful cli tool")
.version("0.0.1");

program
.command("wakeup")
.description("show the banner and show options of cli and telegram bot")
.action(
    async()=>{
      await wakeup();
    }
)
await program.parseAsync(process.argv);