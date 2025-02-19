const DefaultPrompt = `Analyze the following journal entry and extract subconscious thought chains by identifying key concepts, emotions, and recurring themes. 

Create a structured representation where:
- Each key concept, emotion, or recurring thought is a **node**.
- Meaningful relationships between them are **edges**.

### Output Format:
Return a **JSON object** with two arrays:

1️ **initialNodes** (each node should include):
   - **id**: Unique identifier.
   - **data.label**: The extracted concept or insight.
   - **position.x, position.y**: Placement for visualization.

2️ **initialEdges** (each edge should include):
   - **id**: Unique identifier.
   - **source, target**: IDs of linked nodes.
   - **type**: Set to 'smoothstep'.
   - **animated**: Set to true.


### **Output Rules:**
- do not give any extra text just an object as output with two element nodes and edges as array

### **Output Format:**

{
    "initialNodes": [
        { "id": "1", "data": { "label": "Tiredness" }, "position": { "x": 0, "y": 0 } },
        { "id": "2", "data": { "label": "Frustration" }, "position": { "x": 100, "y": 0 } },
        { "id": "3", "data": { "label": "Disappointment" }, "position": { "x": 200, "y": 0 } },
        { "id": "4", "data": { "label": "Uncertainty" }, "position": { "x": 300, "y": 0 } },
        { "id": "5", "data": { "label": "Helplessness" }, "position": { "x": 400, "y": 0 } },
        { "id": "6", "data": { "label": "Unfulfilling Career" }, "position": { "x": 100, "y": 100 } },
        { "id": "7", "data": { "label": "Lack of Meaning" }, "position": { "x": 300, "y": 100 } },
        { "id": "8", "data": { "label": "Unfulfilling Personal Life" }, "position": { "x": 200, "y": 200 } },
        { "id": "9", "data": { "label": "Desire for Change" }, "position": { "x": 400, "y": 200 } }
    ],
        "initialEdges": [
            { "id": "1-2", "source": "1", "target": "2", "type": "smoothstep", "animated": true },
            { "id": "2-3", "source": "2", "target": "3", "type": "smoothstep", "animated": true },
            { "id": "3-4", "source": "3", "target": "4", "type": "smoothstep", "animated": true },
            { "id": "4-5", "source": "4", "target": "5", "type": "smoothstep", "animated": true },
            { "id": "1-6", "source": "1", "target": "6", "type": "smoothstep", "animated": true },
            { "id": "6-7", "source": "6", "target": "7", "type": "smoothstep", "animated": true },
            { "id": "7-4", "source": "7", "target": "4", "type": "smoothstep", "animated": true },
            { "id": "6-8", "source": "6", "target": "8", "type": "smoothstep", "animated": true },
            { "id": "8-4", "source": "8", "target": "4", "type": "smoothstep", "animated": true },
            { "id": "5-9", "source": "5", "target": "9", "type": "smoothstep", "animated": true },
            { "id": "4-9", "source": "4", "target": "9", "type": "smoothstep", "animated": true }
        ]
}

This is the Journal Entry you need to analyse.only return object dont do \`\`\`json
make sure its in format that i can be used in react flow:`;

export default DefaultPrompt;