"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts"
import { MapPin, Bus, Clock, AlertTriangle, Users, Search, Filter } from "lucide-react"

// Mock data for the dashboard
const busData = [
  {
    id: "BUS001",
    route: "Route 15",
    status: "On Time",
    passengers: 24,
    speed: 45,
    lat: 40.7128,
    lng: -74.006,
    eta: "3 min",
  },
  {
    id: "BUS002",
    route: "Route 22",
    status: "Delayed",
    passengers: 18,
    speed: 32,
    lat: 40.7589,
    lng: -73.9851,
    eta: "8 min",
  },
  {
    id: "BUS003",
    route: "Route 8",
    status: "On Time",
    passengers: 31,
    speed: 38,
    lat: 40.7505,
    lng: -73.9934,
    eta: "5 min",
  },
  {
    id: "BUS004",
    route: "Route 33",
    status: "Alert",
    passengers: 12,
    speed: 0,
    lat: 40.7282,
    lng: -73.7949,
    eta: "N/A",
  },
  {
    id: "BUS005",
    route: "Route 15",
    status: "On Time",
    passengers: 27,
    speed: 42,
    lat: 40.7614,
    lng: -73.9776,
    eta: "2 min",
  },
]

const performanceData = [
  { time: "00:00", onTime: 85, delayed: 12, alerts: 3 },
  { time: "04:00", onTime: 92, delayed: 6, alerts: 2 },
  { time: "08:00", onTime: 78, delayed: 18, alerts: 4 },
  { time: "12:00", onTime: 88, delayed: 10, alerts: 2 },
  { time: "16:00", onTime: 82, delayed: 15, alerts: 3 },
  { time: "20:00", onTime: 90, delayed: 8, alerts: 2 },
]

const ridership = [
  { hour: "06", passengers: 120 },
  { hour: "07", passengers: 280 },
  { hour: "08", passengers: 450 },
  { hour: "09", passengers: 320 },
  { hour: "10", passengers: 180 },
  { hour: "11", passengers: 220 },
  { hour: "12", passengers: 380 },
  { hour: "13", passengers: 340 },
  { hour: "14", passengers: 290 },
  { hour: "15", passengers: 410 },
  { hour: "16", passengers: 520 },
  { hour: "17", passengers: 480 },
  { hour: "18", passengers: 380 },
]

export default function BusTrackingDashboard() {
  const [selectedRoute, setSelectedRoute] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const filteredBuses = busData.filter(
    (bus) =>
      (selectedRoute === "all" || bus.route.includes(selectedRoute)) &&
      (bus.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bus.route.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const getStatusColor = (status: string) => {
    switch (status) {
      case "On Time":
        return "bg-green-500/20 text-green-400 border-green-500/30"
      case "Delayed":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30"
      case "Alert":
        return "bg-red-500/20 text-red-400 border-red-500/30"
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30"
    }
  }

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Bus Fleet Monitor</h1>
            <p className="text-muted-foreground">Real-time GPS tracking and fleet management</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-mono text-primary">{currentTime.toLocaleTimeString()}</div>
            <div className="text-sm text-muted-foreground">{currentTime.toLocaleDateString()}</div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search buses or routes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedRoute} onValueChange={setSelectedRoute}>
          <SelectTrigger className="w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by route" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Routes</SelectItem>
            <SelectItem value="15">Route 15</SelectItem>
            <SelectItem value="22">Route 22</SelectItem>
            <SelectItem value="8">Route 8</SelectItem>
            <SelectItem value="33">Route 33</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Buses</CardTitle>
            <Bus className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{busData.length}</div>
            <p className="text-xs text-muted-foreground">+2 from yesterday</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Time Performance</CardTitle>
            <Clock className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">87%</div>
            <p className="text-xs text-muted-foreground">+5% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Passengers</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {busData.reduce((sum, bus) => sum + bus.passengers, 0)}
            </div>
            <p className="text-xs text-muted-foreground">Current capacity</p>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1</div>
            <p className="text-xs text-muted-foreground">Requires attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Fleet Performance</CardTitle>
            <CardDescription>On-time performance throughout the day</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="time" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="onTime"
                  stroke="hsl(var(--chart-3))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-3))", strokeWidth: 2 }}
                />
                <Line
                  type="monotone"
                  dataKey="delayed"
                  stroke="hsl(var(--chart-4))"
                  strokeWidth={2}
                  dot={{ fill: "hsl(var(--chart-4))", strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-border bg-card">
          <CardHeader>
            <CardTitle className="text-foreground">Ridership Trends</CardTitle>
            <CardDescription>Passenger count by hour</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={ridership}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="hour" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "8px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="passengers"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Bus Fleet Table */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-foreground">Live Bus Status</CardTitle>
          <CardDescription>Real-time location and status of all buses</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredBuses.map((bus) => (
              <div
                key={bus.id}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/30 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <Bus className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-semibold text-foreground">{bus.id}</div>
                      <div className="text-sm text-muted-foreground">{bus.route}</div>
                    </div>
                  </div>

                  <Badge className={`${getStatusColor(bus.status)} border`}>{bus.status}</Badge>
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center">
                    <div className="text-foreground font-medium">{bus.passengers}</div>
                    <div className="text-muted-foreground">Passengers</div>
                  </div>

                  <div className="text-center">
                    <div className="text-foreground font-medium">{bus.speed} km/h</div>
                    <div className="text-muted-foreground">Speed</div>
                  </div>

                  <div className="text-center">
                    <div className="text-foreground font-medium">{bus.eta}</div>
                    <div className="text-muted-foreground">Next Stop</div>
                  </div>

                  <Button variant="outline" size="sm" className="border-border bg-transparent">
                    <MapPin className="h-4 w-4 mr-1" />
                    Track
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
