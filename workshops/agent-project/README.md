# Speedrun-Optimized Text Adventure Agent

This project contains an autonomous agent optimized for solving text adventure games with maximum efficiency and minimal actions. The agent is designed to act as a "speedrunner," leveraging pattern recognition and a streamlined action strategy to complete levels as quickly as possible.

## Core Features

- **Speedrun-Optimized:** The agent is instructed to prioritize completing levels in the fewest possible actions to achieve the highest score.
- **Pattern Recognition:** The agent is primed with a set of common text adventure puzzle patterns (e.g., key & lock, hidden objects, lever puzzles) to solve them instantly.
- **Efficient Action Strategy:** The agent follows a strict, efficient strategy:
    1.  **Quick Recon:** Starts by checking inventory and looking at the room to quickly assess the situation.
    2.  **Pattern-Based Execution:** If a known puzzle pattern is identified, the agent executes the solution immediately without unnecessary exploration.
    3.  **Efficient Navigation:** The agent avoids exploring rooms that are not on the direct path to the goal.
- **Specialized Tools:** The agent is equipped with tools to interact with the game world and solve specific puzzles:
    - **Game Action Tools:** A toolset generated from an OpenAPI spec that allows the agent to `look`, `move`, `take`, `use`, etc.
    - **SHA-256 Hash Solver:** A custom tool (`find_hash_match`) to solve hash-based puzzles automatically.

## How It Works

The agent is a single `google.adk.agents.llm_agent.Agent` that uses the `gemini-2.5-flash` model. The core of the agent's intelligence is a detailed prompt that instructs it to behave like a speedrunner. The prompt includes:

- A description of the available tools.
- A list of common puzzle patterns and how to solve them efficiently.
- A phased strategy for tackling levels (Recon, Execution, Navigation).
- Examples of optimized execution for different puzzle types.
- Level-specific hints and knowledge for certain levels.

The agent does not have a complex multi-agent architecture or persistent memory as described in the previous README. It's a lean, single agent focused on in-the-moment efficient problem-solving based on its instructions.

## Project Structure

```
agent-project/
├── demo-agent/
│   ├── agent.py              # The main agent definition and prompt.
├── sha256_tool.py            # A tool to solve SHA-256 puzzles.
├── openapi.json              # OpenAPI specification for the game API.
├── pyproject.toml            # Project metadata and dependencies.
└── README.md                 # This file.
```

## Installation

### Prerequisites
- Python 3.13+
- `uv` (or `pip`)

### Setup

1. **Install dependencies:**
   ```bash
   # From the agent-project directory
   uv pip install -e .
   ```

2. **Set up environment variables:**
   Create a `.env` file in the `demo-agent` directory with your game API key:
   ```
   # demo-agent/.env
   ADK_API_KEY=your_game_api_key_here
   ```

## Usage

To run the agent, use the following command:

```bash
uv run adk web
```

This will start the ADK web interface, allowing you to interact with the speedrun agent.
