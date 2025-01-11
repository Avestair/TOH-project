import { useState } from "react";

const App = () => {
  const [states, setStates] = useState("");
  const [inputSymbols, setInputSymbols] = useState("");
  const [stackSymbols, setStackSymbols] = useState("");
  const [transitions, setTransitions] = useState("");
  const [initialState, setInitialState] = useState("");
  const [acceptStates, setAcceptStates] = useState("");
  const [initialStackSymbol, setInitialStackSymbol] = useState("");
  const [inputString, setInputString] = useState("");
  const [result, setResult] = useState("");

  const parseTransitions = (input) => {
    const rules = input.split("\n");
    return rules.map((rule) => {
      const [currentState, inputSymbol, stackTop, newState, newStack] =
        rule.split(",");
      return { currentState, inputSymbol, stackTop, newState, newStack };
    });
  };

  const checkString = () => {
    const acceptStateArray = acceptStates.split(",");
    const transitionRules = parseTransitions(transitions);

    console.log(transitionRules);

    const simulateNPDA = (currentState, input, stack) => {
      console.log("Stack:", stack);
      console.log("input:", input);
      console.log("currenetState:", currentState);

      if (input.length === 0) {
        return (
          acceptStateArray.includes(currentState) ||
          transitionRules.some(
            (rule) =>
              rule.currentState === currentState &&
              rule.inputSymbol === "" &&
              rule.stackTop === stack[stack.length - 1]
          )
        );
      }

      const nextRules = transitionRules.filter(
        (rule) =>
          rule.currentState === currentState &&
          (rule.inputSymbol === input[0] || rule.inputSymbol === "") &&
          rule.stackTop === stack[stack.length - 1]
      );

      console.log("current input", input[0]);
      console.log("current stack", stack[stack.length - 1]);
      console.log("rule applyed", nextRules);

      for (let rule of nextRules) {
        const nextStack = [...stack];
        nextStack.pop(); // Pop stack
        if (rule.newStack !== "") {
          nextStack.push(...rule.newStack.split("").reverse());
        }

        const isAccepted = simulateNPDA(
          rule.newState,
          rule.inputSymbol === "" ? input : input.slice(1),
          nextStack
        );
        if (isAccepted) return true;
      }

      return false;
    };

    const initialStack = [initialStackSymbol];
    const isAccepted = simulateNPDA(initialState, inputString, initialStack);
    setResult(isAccepted ? "Accepted" : "Rejected");
  };

  return (
    <div className="font-Vazirmatn grid justify-items-center p-12 ">
      <h1 className="text-3xl">پروژه شماره یک</h1>

      <div className="grid grid-cols-3 gap-20 mt-10">
        <div className="form-control">
          <textarea
            value={states}
            onChange={(e) => setStates(e.target.value)}
            className="input input-alt"
            placeholder="states (comma-separated)"
            required=""
            type="text"
          />
          <span className="input-border input-border-alt"></span>
        </div>

        <div className="form-control">
          <textarea
            value={inputSymbols}
            onChange={(e) => setInputSymbols(e.target.value)}
            className="input input-alt"
            placeholder="Input Symbols (comma-separated)"
            required=""
            type="text"
          />
          <span className="input-border input-border-alt"></span>
        </div>

        <div className="form-control">
          <textarea
            value={stackSymbols}
            onChange={(e) => setStackSymbols(e.target.value)}
            className="input input-alt"
            placeholder="Stack Symbols (comma-separated)"
            required=""
            type="text"
          />
          <span className="input-border input-border-alt"></span>
        </div>

        <div className="form-control">
          <textarea
            value={transitions}
            onChange={(e) => setTransitions(e.target.value)}
            className="input input-alt"
            placeholder={`Transitions (one per line, format: 
              currentState,inputSymbol,stackTop,newState,newStack)`}
            required=""
            type="text"
          />
          <span className="input-border input-border-alt"></span>
        </div>

        <div className="form-control">
          <textarea
            value={initialState}
            onChange={(e) => setInitialState(e.target.value)}
            className="input input-alt"
            placeholder="Initial State"
            required=""
            type="text"
          />
          <span className="input-border input-border-alt"></span>
        </div>

        <div className="form-control">
          <textarea
            value={acceptStates}
            onChange={(e) => setAcceptStates(e.target.value)}
            className="input input-alt"
            placeholder="Accept States (comma-separated)"
            required=""
            type="text"
          />
          <span className="input-border input-border-alt"></span>
        </div>

        <div className="form-control">
          <textarea
            value={initialStackSymbol}
            onChange={(e) => setInitialStackSymbol(e.target.value)}
            className="input input-alt"
            placeholder="Initial Stack Symbol"
            required=""
            type="text"
          />
          <span className="input-border input-border-alt"></span>
        </div>
      </div>

      <div className="grid mt-20 gap-8 w-[300px]">
        <div>
          <h2>Check String</h2>

          <div className="form-control">
            <textarea
              value={inputString}
              onChange={(e) => setInputString(e.target.value)}
              className="input input-alt"
              placeholder="Input String"
              required=""
              type="text"
            />
            <span className="input-border input-border-alt"></span>
          </div>
        </div>

        <div className="flex justify-between">
          <button onClick={checkString} className="button-with-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon"
              id="Play"
              width="28"
              height="28"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 12H5m14 0l-4 4m4-4l-4-4"
              />
            </svg>
            <span className="text">check</span>
          </button>

          {result && (
            <h3
              className={`mt-3 ${
                result === "Rejected" ? "text-red-600" : "text-green-600"
              }`}
            >
              Result: {result}
            </h3>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
