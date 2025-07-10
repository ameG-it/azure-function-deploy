import {
  app,
  HttpRequest,
  HttpResponseInit,
  InvocationContext,
} from "@azure/functions";

export async function sum(
  request: HttpRequest,
  context: InvocationContext
): Promise<HttpResponseInit> {
  context.log(`Http function processed request for url "${request.url}"`);

  const sum1 = request.query.get("sum1") as string;
  const sum2 = request.query.get("sum2") as string;

  if (!sum1 || !sum2) {
    return {
      status: 400,
      body: "Please provide both sum1 and sum2 query parameters.",
    };
  }
  const num1 = parseFloat(sum1);
  const num2 = parseFloat(sum2);

  if (isNaN(num1) || isNaN(num2)) {
    return {
      status: 400,
      body: "Both sum1 and sum2 must be valid numbers.",
    };
  }

  const result = num1 + num2 * 10;

  context.log(`Sum of ${num1} and ${num2} is ${result}`);
  return {
    status: 200,
    body: `The sum of ${num1} and ${num2} is ${result}.`,
  };
}

app.http("sum", {
  methods: ["GET", "POST"],
  authLevel: "anonymous",
  handler: sum,
});
