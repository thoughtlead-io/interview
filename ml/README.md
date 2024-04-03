# Thoughtly ML Engineering Interview

Feel free to use any language or framework you are comfortable with. We are not looking for a perfect solution, but we are looking for a solution that is well thought out. Feel free to use any resources you need to complete the challenge.

## Instructions

1. Fork this repository and clone it to your local machine.
2. Navigate to the project directory.
3. Implement the following tasks– it should take you no more than an hour.
4. You may use whatever resources you want to complete the challenge, but you should be able to explain your solution.
5. You may use any programming language or framework you are comfortable with.

## Part A

As you know, Thoughtly allows users to build visual workflows, represented as [directed acyclic graphs](https://en.wikipedia.org/wiki/Directed_acyclic_graph) or sometimes cyclic graphs, that are used to prompt large language models. Our system refers to each step in a workflow as a "node," and the connection between these nodes as "edges." This was a fun, real-world problem we had to solve when building our platform– so hopefully you'll enjoy it too!

The file `workflow.json` contains a JSON representation of a workflow. The file `workflow.png` is also provided to show you what the workflow looks like visually on the Thoughtly platform.

Write a function that reads `workflow.json` and transforms the JSON into a textual **system prompt** for a language model. The zero-shot prompt should be a single string that is ready to be sent to a model for completion. When prompting a language model of your choice, the conversation message array should be similar to the following:

```json
{
	"messages": [
		{
			"role": "system",
			"content": "... your prompt ..."
		},
		{
			"role": "ai",
			"content": "Hi, this is Tessa, calling from Thoughtly Real Estate, am I speaking with Dave?" // model output
		},
		{
			"role": "user",
			"content": "Yes, this is Dave." // your response
		},
		... the conversation continues ...
	]
}
```

To test your function, you should print the output of the function to the console and use it to prompt a language model of your choice. Software like [Ollama](https://ollama.com/) is great for this. You can also use an API like OpenAI's GPT-3, but you will need to have an API key.

The first output from the language model should be nothing but the text in the start node of the workflow, the user (you) should then be able to continue by responding naturally to the model's output. Continue until the workflow is complete without skipping, repeating, or incorrectly following any steps from the JSON workflow.

## Part B

Zero-shot prompting is great for writing college essays, but repetitive prompts with similar structures can be more efficiently handled with a fine-tuned model. Based on your system prompt and message array from Part A, write a short response on how you would fine-tune a language model to complete the workflow more efficiently, with higher accuracy, and while decreasing latency (time to first byte).
