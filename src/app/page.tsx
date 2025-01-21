import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, ArrowUpRight, Trophy, Users, Calendar, Upload, DollarSign, Video, Image as ImageIcon } from "lucide-react";

// Mock user data - In real app, this would come from auth context
const userData = {
  name: "John Doe",
  role: "manager", // or "fighter"
  stats: {
    watchedFighters: 24,
    upcomingEvents: 8,
    accuracy: 75,
    rankingChanges: 12,
    earnings: "$150,000",
    mediaPending: 5,
  }
};

export default function Dashboard() {
  return (
    <div className="space-y-8 animate-in fade-in-50">
      {/* Welcome Section with Role-specific greeting */}
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Welcome back, {userData.name}!
          </h2>
          <p className="text-muted-foreground">
            {userData.role === "manager" 
              ? "Here's an overview of your fighters and upcoming events"
              : "Here's your latest updates and opportunities"}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Activity className="h-4 w-4" />
          Last updated: Just now
        </div>
      </div>

      {/* Quick Stats - Role-specific metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {userData.role === "manager" ? "Managed Fighters" : "Fight Record"}
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stats.watchedFighters}</div>
            <div className="flex items-center text-xs text-muted-foreground mt-1">
              <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+2</span>
              <span className="ml-1">from last month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stats.upcomingEvents}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Next event in 3 days
            </p>
          </CardContent>
        </Card>

        {userData.role === "manager" ? (
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userData.stats.earnings}</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+12.5%</span>
                <span className="ml-1">from last quarter</span>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Current Ranking</CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">#5</div>
              <div className="flex items-center text-xs text-muted-foreground mt-1">
                <ArrowUpRight className="h-4 w-4 text-emerald-500 mr-1" />
                <span className="text-emerald-500 font-medium">+2</span>
                <span className="ml-1">positions up</span>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Media Pending</CardTitle>
            <Upload className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{userData.stats.mediaPending}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Needs review
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content - Role-specific sections */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-7">
        {/* Upcoming Events */}
        <Card className="col-span-4 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              {userData.role === "manager" 
                ? "Events featuring your fighters"
                : "Your upcoming fights and appearances"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  event: "UFC 300",
                  date: "Apr 13, 2024",
                  fighters: "3 watched fighters",
                  location: "Las Vegas, NV",
                  mainEvent: "Jones vs Aspinall",
                  type: "Main Card"
                },
                {
                  event: "Bellator 301",
                  date: "Mar 22, 2024",
                  fighters: "1 watched fighter",
                  location: "Chicago, IL",
                  mainEvent: "McKee vs Pitbull",
                  type: "Co-Main Event"
                },
                {
                  event: "ONE Championship",
                  date: "Mar 15, 2024",
                  fighters: "2 watched fighters",
                  location: "Singapore",
                  mainEvent: "Johnson vs Moraes III",
                  type: "Preliminary Card"
                },
              ].map((event, i) => (
                <div 
                  key={i} 
                  className="group relative flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-all duration-300 cursor-pointer hover:border-primary"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg" />
                  <div className="space-y-1 relative">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold group-hover:text-primary transition-colors">
                        {event.event}
                      </h4>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {event.type}
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1" />
                    </div>
                    <p className="text-sm text-muted-foreground">{event.mainEvent}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                  <span className="relative text-sm font-medium bg-primary/10 text-primary px-2 py-1 rounded-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {event.fighters}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Gallery */}
        <Card className="col-span-3 hover:shadow-lg transition-all duration-300">
          <CardHeader>
            <CardTitle>Recent Media</CardTitle>
            <CardDescription>Latest uploads and content</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: "image", title: "Training Session", time: "2 hours ago" },
                { type: "video", title: "Fight Highlights", time: "1 day ago" },
                { type: "image", title: "Press Conference", time: "2 days ago" },
                { type: "video", title: "Interview", time: "3 days ago" },
              ].map((media, i) => (
                <div 
                  key={i}
                  className="group relative aspect-square rounded-lg border bg-card hover:bg-accent/50 transition-all duration-300 cursor-pointer hover:border-primary overflow-hidden"
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    {media.type === "video" ? (
                      <Video className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    ) : (
                      <ImageIcon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                    )}
                  </div>
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-4">
                    <p className="text-xs font-medium text-white">{media.title}</p>
                    <p className="text-xs text-white/70">{media.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
