
import hashlib
from google.adk.tools.tool import Tool
from google.adk.tools.tool_result import ToolResult

def find_hash_match_implementation(options: list[str], hash_prefix: str) -> str:
    """Find which option matches a SHA-256 hash prefix."""
    for option in options:
        if hashlib.sha256(option.encode()).hexdigest().startswith(hash_prefix):
            return f"Match found: {option}"
    return "No match found"

find_hash_match = Tool(
    name="find_hash_match",
    description="Find which option matches a SHA-256 hash prefix. Example: find_hash_match(['tunnel1', 'tunnel2'], '9d42')",
    func=find_hash_match_implementation,
)

if __name__ == "__main__":
    # Example usage:
    options = ["tunnel1", "tunnel2", "data_line_junction_box"]
    hash_prefix = "9d42"
    result = find_hash_match.func(options, hash_prefix)
    print(result)
