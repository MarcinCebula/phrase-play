import { useEffect } from "react";
import { api } from "~/utils/api";

const Test = () => {
  const mutation = api.example.createAnki.useMutation();

  useEffect(() => {
    mutation.mutate({
      sentence: "Hello, World",
      translationDirection: "EnglishToChinese",
    });
  }, []);

  console.log(mutation.data);

  return <span>Hello, World:</span>;
};

export default Test;
