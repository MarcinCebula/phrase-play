import { api } from "~/utils/api";

const Test = () => {
  const query = api.example.postMessage.useQuery({
    sentence: "Hello, do you know what time the train will come?",
  });

  console.log(query);

  return <span>Hello, World:</span>;
};

export default Test;
