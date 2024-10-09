import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useUserStore } from "@/store/userStore";

export default function Profile() {
  const { username, level, experience } = useUserStore();

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">User Profile</h1>
      <Card>
        <CardHeader>
          <CardTitle>{username}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-2">Level: {level}</p>
          <p className="mb-2">Experience: {experience} XP</p>
          <Progress value={(experience % 100)} className="mt-2" />
          <p className="text-sm text-muted-foreground mt-1">
            {100 - (experience % 100)} XP to next level
          </p>
        </CardContent>
      </Card>
    </div>
  );
}