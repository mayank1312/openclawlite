# Ask Mode

## Question

what is inside /modes/agent explain everything to me use code examples

## Answer

The `/modes/agents` directory contains several TypeScript files that define a framework for managing actions in a codebase through an "agent" architecture. Below is a summary of the contents and their functionalities, along with code examples.

### 1. **ActionTracker (action-tracker.ts)**

This class is responsible for tracking actions, storing action logs, and updating their statuses.

- **Log actions**: Records actions taken on files or directories.
- **Get actions**: Retrieves the list of actions logged.
- **Pending mutations**: Filters actions that are pending approval.

#### Code Example:
```typescript
export class ActionTracker {
    private actions: ActionLog[] = [];

    log(entry: Omit<ActionLog, "id" | "timestamp"> & { id?: string; timestamp?: Date }): ActionLog {
        const action: ActionLog = {
            id: entry.id ?? `action_${this.actions.length}`,
            timestamp: entry.timestamp ?? new Date(),
            type: entry.type,
            path: entry.path,
            details: { ...entry.details },
            status: entry.status,
            userApproved: entry.userApproved
        };

        this.actions.push(action);
        return action;
    }

    getActions(): readonly ActionLog[] {
        return this.actions;
    }

    getPendingMutations(): ActionLog[] {
        return this.actions.filter(a => isMutationType(a.type) && a.status === "pending");
    }

    updateStatus(id: string, status: ActionStatus, userApproved?: boolean): void {
        const action = this.actions.find(x => x.id === id);
        if (!action) return;
        action.status = status;
        if (userApproved !== undefined) action.userApproved = userApproved;
    }
}
```

### 2. **Agent Tools (agent-tools.ts)**

This module provides tools for file and folder operations, defining how these operations should be executed and what schemas are applicable for inputs.

- **Read, create, modify, delete files and folders**.
- **List files** and **search files** in the workspace.

#### Code Example:
```typescript
export function createAgentTools(executor: ToolExecutor) {
    return {
        read_file: tool({
            description: "Read a text file from the workspace.",
            inputSchema: z.object({ path: z.string().describe("Relative File path") }),
            execute: async ({ path: p }) => executor.readFile(p)
        }),
        // ... More tools like create_file, modify_file, etc.
    };
}
```

### 3. **Approval Flow (approval.ts)**

This module handles the approval flow for the actions logged. Users can approve or reject pending actions.

It uses the `ActionTracker` to manage the state of actions and their approval statuses.

#### Code Example:
```typescript
export async function runApprovalFlow(tracker: ActionTracker): Promise<boolean> {
    const pending = tracker.getPendingMutations();
    if (pending.length === 0) {
        console.log(chalk.dim("\nNo staged changes to review.\n"));
        return false;
    }
    // Review selection logic goes here
}
```

### 4. **Diff View and Formatting (diff-view.ts)**

This module is responsible for formatting the changes in a manner that resembles a diff view, assisting users in reviewing changes.

#### Code Example:
```typescript
export function formatPatch(filePath: string, before: string, after: string): string {
    return createTwoFilesPatch(filePath, filePath, before, after, "", "", {
        context: 3,
    });
}
```

### 5. **Orchestrator (orchestrator.ts)**

This module manages the orchestration of the agent's tasks, including initiating the agent and processing the setup.

#### Code Example:
```typescript
export async function runAgentMode() {
    const goal = await text({ message: "What would you like the agent to do?" });
    if (isCancel(goal) || !goal.trim()) return;

    const tracker = new ActionTracker();
    const executor = new ToolExecutor(tracker, defaultAgentConfig());
    const tools = createAgentTools(executor);
    
    const agent = new ToolLoopAgent({
        model: getModel(),
        stopWhen: stepCountIs(40),
        instructions: [
            `Workspace root: ${config.codebasePath}`,
            "All mutations are staged until approval.",
        ].join("\n"),
        tools,
    });
    // ... Continue with agent task execution
}
```

### 6. **Tool Executor (tool-executor.ts)**

This class defines methods for the actual execution of file operations, managing overlays for modifications, deleted files, and enforcing policies defined in the configuration.

#### Code Example:
```typescript
export class ToolExecutor {
    private overlay = new Map<string, string>();
    private deleted = new Set<string>();
    
    readFile(rel: string): string {
        this.assertNotExcluded(rel, "read_file");
        const abs = this.resolveSafe(rel);
        // File existence checks and reading logic
    }

    createFile(rel: string, content: string): string {
        // Logic for staging a new file
    }
    // ... More methods for modifyFile, deleteFile, etc.
}
```

### 7. **Types and Interfaces (types.ts)**

This file defines various types and interfaces used throughout the modules: `ActionType`, `ActionStatus`, `ActionLog`, `AgentConfig`, and the default agent configuration.

#### Code Example:
```typescript
export type ActionType = "file_create" | "file_modify" | "file_delete" | "folder_create" | "tool_execute";
export type ActionStatus = 'pending' | 'executed' | 'approved' | 'rejected';

export interface ActionLog {
    id: string;
    timestamp: Date;
    type: ActionType; 
    path: string;
    details: {
        before?: string; 
        after?: string; 
        command?: string; 
    };
    status: ActionStatus;
}
export interface AgentConfig {
    codebasePath: string; 
    maxFileSizeToRead: number; 
    excludePatterns: string[];
}
```

### Summary

This architecture is designed for managing a flexible system where an agent can interact with a codebase, ensuring that changes are staged and need user approval before being finalized. Each component has a defined role, keeping the system clean and modular. The `ActionTracker` keeps track of operations, while `ToolExecutor` carries out the actual file manipulations based on user-initiated tasks.
