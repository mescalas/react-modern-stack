import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import "./App.css";

import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

const getTotalSpent = async () => {
  const res = await api.expenses["total-spent"].$get();
  if (!res.ok) {
    throw new Error("Failed to fetch total spent");
  }
  const data = await res.json();
  return data.total;
};

function App() {
  const { data, isPending, error } = useQuery({
    queryKey: ["get-total-spent"],
    queryFn: getTotalSpent,
  });

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Card className="w-[350px] m-auto">
        <CardHeader>
          <CardTitle>Total Spent</CardTitle>
          <CardDescription>The total amount you've spent</CardDescription>
        </CardHeader>
        <CardContent>{isPending ? "..." : data}</CardContent>
      </Card>
    </>
  );
}

export default App;
