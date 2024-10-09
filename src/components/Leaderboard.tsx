import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const dummyLeaderboard = [
  { username: "AirTrafficAce", score: 1500 },
  { username: "SkyController", score: 1350 },
  { username: "CloudNavigator", score: 1200 },
  { username: "RadarMaster", score: 1100 },
  { username: "TowerCommander", score: 1000 },
];

export default function Leaderboard() {
  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <Card>
        <CardHeader>
          <CardTitle>Top Performers</CardTitle>
        </CardHeader>
        <CardContent>
          <ul>
            {dummyLeaderboard.map((user, index) => (
              <li key={user.username} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <span>{index + 1}. {user.username}</span>
                <span className="font-bold">{user.score}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}