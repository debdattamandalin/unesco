import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-6xl font-bold tracking-tighter text-foreground mb-4">EDITORIAL</h1>
          <p className="text-xl text-muted-foreground">Investigative Newsroom Simulator</p>
        </div>

        <Card className="bg-card/50 backdrop-blur-xl border-border/50 shadow-2xl">
          <CardContent className="p-6 flex flex-col space-y-4">
            <Link href="/continue" className="w-full">
              <Button className="w-full text-lg h-14" variant="default">
                Continue
              </Button>
            </Link>
            <Link href="/new-game" className="w-full">
              <Button className="w-full text-lg h-14" variant="secondary">
                New Game
              </Button>
            </Link>
            <Link href="/settings" className="w-full">
              <Button className="w-full text-lg h-14" variant="outline">
                Settings
              </Button>
            </Link>
            <Link href="/credits" className="w-full">
              <Button className="w-full text-lg h-14" variant="ghost">
                Credits
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
