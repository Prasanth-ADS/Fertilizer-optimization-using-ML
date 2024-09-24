'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { BarChart, PieChart, Users, CloudRain, History, Home, LogIn, UserPlus, LogOut, Wind, Leaf, Droplet, Sun, Loader } from 'lucide-react'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { motion } from 'framer-motion'

interface HistoryItem {
  cropName: string;
  recommendation: string;
  date: Date;
}

interface NavButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

interface SoilDataCardProps {
  title: string;
  value: number;
}

interface LoginSignupProps {
  onLogin: () => void;
}

interface AccountDashboardProps {
  onLogout: () => void;
}

const indianCrops = [
  "Rice", "Wheat", "Maize", "Bajra", "Jowar", "Ragi",
  "Chickpea", "Pigeon Pea", "Lentil", "Black Gram", "Green Gram",
  "Soybean", "Groundnut", "Mustard", "Sesame", "Sunflower",
  "Cotton", "Jute", "Sugarcane", "Potato", "Onion", "Tomato",
  "Cauliflower", "Cabbage", "Brinjal", "Okra", "Peas", "Carrot",
  "Mango", "Banana", "Papaya", "Guava", "Lemon", "Orange"
]

export default function Component() {
  const [selectedTab, setSelectedTab] = useState('home')
  const [cropName, setCropName] = useState('')
  const [recommendation, setRecommendation] = useState('')
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [aiSuggestion, setAiSuggestion] = useState('')

  const handleRecommendation = async () => {
    if (!cropName) {
      toast.error('Please select a crop first')
      return
    }

    setLoading(true)
    setError('')
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000))
      const newRecommendation = `Recommended fertilizer for ${cropName}: NPK 14-14-14`
      setRecommendation(newRecommendation)
      setHistory(prevHistory => [...prevHistory, { cropName, recommendation: newRecommendation, date: new Date() }])
      toast.success('Recommendation generated successfully')
      
      const aiSuggestion = `Based on recent climate data and soil analysis, consider adjusting nitrogen levels slightly. For ${cropName}, a 15-13-14 NPK ratio might be more optimal this season.`
      setAiSuggestion(aiSuggestion)
    } catch (err) {
      setError('Failed to get recommendation. Please try again later.')
      toast.error('Failed to get recommendation')
    } finally {
      setLoading(false)
    }
  }

  const renderContent = () => {
    switch (selectedTab) {
      case 'dashboard':
        return <SoilDataDashboard />
      case 'recommend':
        return (
          <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="flex items-center space-x-4 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-6 text-white">
              <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
                <PieChart className="w-12 h-12 text-green-600" />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold">Smart Fertilizer Recommendation</CardTitle>
                <CardDescription className="text-green-100">Get AI-powered recommendations for your crops</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Select onValueChange={setCropName}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a crop" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianCrops.map((crop) => (
                      <SelectItem key={crop} value={crop}>{crop}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button 
                  onClick={handleRecommendation} 
                  className="bg-green-600 hover:bg-green-700 text-white transition-all duration-300 transform hover:scale-105"
                  disabled={loading}
                >
                  {loading ? <Loader className="w-6 h-6 animate-spin" /> : <PieChart className="w-6 h-6 mr-2" />}
                  {loading ? 'Analyzing...' : 'Get Smart Recommendation'}
                </Button>
              </div>
              {error && <p className="text-red-500 mt-2">{error}</p>}
            </CardContent>
            <CardFooter className="bg-gradient-to-r from-green-100 to-blue-100 p-6 flex flex-col items-start">
              {recommendation && (
                <div className="flex items-center space-x-4 w-full bg-white p-4 rounded-lg shadow-inner mb-4">
                  <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                    <PieChart className="w-8 h-8 text-white" />
                  </div>
                  <p className="text-green-800 font-semibold text-lg flex-grow">{recommendation}</p>
                </div>
              )}
              {aiSuggestion && (
                <div className="w-full bg-blue-50 p-4 rounded-lg shadow-inner">
                  <h4 className="text-blue-800 font-semibold mb-2">AI Insight:</h4>
                  <p className="text-blue-700">{aiSuggestion}</p>
                </div>
              )}
            </CardFooter>
          </Card>
        )
      case 'community':
        return <CommunityForum />
      case 'weather':
        return <WeatherForecast />
      case 'history':
        return <HistoryDashboard history={history} />
      case 'account':
        return isLoggedIn ? <AccountDashboard onLogout={() => setIsLoggedIn(false)} /> : <LoginSignup onLogin={() => setIsLoggedIn(true)} />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-100">
      <header className="relative h-64 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 animate-gradient-x"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white text-center z-10 shadow-sm">Edith Fert Pro</h1>
        </div>
        <div className="absolute inset-0 flex items-center justify-around opacity-30">
          <Leaf className="w-24 h-24 text-white animate-float" />
          <Droplet className="w-20 h-20 text-white animate-float animation-delay-2000" />
          <Sun className="w-32 h-32 text-white animate-float animation-delay-4000" />
        </div>
      </header>
      <div className="max-w-7xl mx-auto p-6">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-1/4">
            <Card className="sticky top-6 bg-white shadow-lg">
              <CardHeader className="bg-green-600 text-white">
                <CardTitle>Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-2">
                  <NavButton icon={<Home />} label="Home" onClick={() => setSelectedTab('home')} />
                  <NavButton icon={<BarChart />} label="Dashboard" onClick={() => setSelectedTab('dashboard')} />
                  <NavButton icon={<PieChart />} label="Smart Recommendation" onClick={() => setSelectedTab('recommend')} />
                  <NavButton icon={<Users />} label="Community" onClick={() => setSelectedTab('community')} />
                  <NavButton icon={<CloudRain />} label="Weather" onClick={() => setSelectedTab('weather')} />
                  <NavButton icon={<History />} label="History" onClick={() => setSelectedTab('history')} />
                  <NavButton icon={isLoggedIn ? <LogOut /> : <LogIn />} label={isLoggedIn ? "Account" : "Login/Signup"} onClick={() => setSelectedTab('account')} />
                </nav>
              </CardContent>
            </Card>
          </div>
          <div className="md:w-3/4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              {renderContent()}
            </motion.div>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  )
}

function NavButton({ icon, label, onClick }: NavButtonProps) {
  return (
    <Button variant="ghost" className="w-full justify-start hover:bg-green-100 text-green-800 transition-colors duration-300" onClick={onClick}>
      {icon}
      <span className="ml-2">{label}</span>
    </Button>
  )
}

function HomePage() {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-6 text-white">
        <CardTitle className="text-3xl font-bold">Welcome to Edith Fert Pro</CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <p className="text-lg text-gray-800 mb-4">Edith Fert Pro is your AI-powered assistant for precision agriculture. Our smart system helps you optimize fertilizer use, increase crop yields, and promote sustainable farming practices.</p>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          <li>Get AI-driven fertilizer recommendations</li>
          <li>Monitor real-time soil and weather data</li>
          <li>Connect with a community of innovative farmers</li>
          <li>Access personalized climate-smart farming advice</li>
          <li>Track your farm&apos;s performance over time</li>
        </ul>
      </CardContent>
    </Card>
  )
}

function SoilDataDashboard() {
  const [soilData, setSoilData] = useState({
    moisture: 65,
    pH: 6.5,
    nitrogen: 40,
    phosphorus: 30,
    potassium: 35
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setSoilData(prevData => ({
        moisture: Math.max(0, Math.min(100, prevData.moisture + (Math.random() - 0.5) * 5)),
        pH: Math.max(0, Math.min(14, prevData.pH + (Math.random() - 0.5) * 0.2)),
        nitrogen: Math.max(0, Math.min(100, prevData.nitrogen + (Math.random() - 0.5) * 3)),
        phosphorus: Math.max(0, Math.min(100, prevData.phosphorus + (Math.random() - 0.5) * 3)),
        potassium: Math.max(0, Math.min(100, prevData.potassium + (Math.random() - 0.5) * 3))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-green-600 to-yellow-500 p-6 text-white">
        <CardTitle className="text-2xl font-bold">Smart Soil Monitor</CardTitle>
        <CardDescription className="text-blue-100">Real-time soil condition monitoring with AI insights</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Object.entries(soilData).map(([key, value]) => (
            <SoilDataCard key={key} title={key} value={value} />
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-blue-800 font-semibold mb-2">AI Insight:</h4>
          <p className="text-blue-700">Based on current soil conditions, consider increasing potassium levels slightly. This may improve overall plant health and yield potential.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function SoilDataCard({ title, value }: SoilDataCardProps) {
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'moisture': return '💧';
      case 'ph': return '🧪';
      case 'nitrogen': return '🌱';
      case 'phosphorus': return '🦴';
      case 'potassium': return '🍌';
      default: return '🌿';
    }
  }

  return (
    <Card className="bg-white shadow-md rounded-lg overflow-hidden transform transition-all duration-300 hover:scale-105">
      <CardHeader className="bg-gradient-to-r from-green-100 to-blue-100 p-4 flex items-center space-x-2">
        <span className="text-2xl">{getIcon(title)}</span>
        <CardTitle className="text-lg capitalize">{title}</CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <motion.p 
          className="text-3xl font-bold text-green-700 text-center"
          key={value}
          initial={{ scale: 1.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 100 }}
        >
          {typeof value === 'number' ? value.toFixed(1) : value}
        </motion.p>
        <p className="text-sm text-gray-500 text-center mt-2">
          {title === 'pH' ? 'pH level' : title === 'moisture' ? '%' : 'mg/kg'}
        </p>
      </CardContent>
    </Card>
  )
}

function CommunityForum() {
  const forumPosts = [
    { id: 1, title: "Innovative organic farming techniques", author: "GreenThumb", replies: 23 },
    { id: 2, title: "AI-powered solutions for soil erosion", author: "TechFarmer", replies: 15 },
    { id: 3, title: "Smart irrigation systems for water conservation", author: "WaterWise", replies: 31 },
  ]

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 p-6 text-white">
        <CardTitle className="text-2xl font-bold">Innovators&apos; Forum</CardTitle>
        <CardDescription className="text-yellow-100">Connect with forward-thinking farmers and ag-tech experts</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {forumPosts.map(post => (
            <motion.div 
              key={post.id} 
              className="bg-white shadow rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-md"
              whileHover={{ scale: 1.03 }}
            >
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{post.title}</h3>
                <p className="text-sm text-gray-500">Posted by {post.author}</p>
              </div>
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
                {post.replies} replies
              </div>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <Button className="bg-yellow-500 hover:bg-yellow-600 text-white transition-all duration-300 transform hover:scale-105">Start a New Discussion</Button>
        </div>
      </CardContent>
    </Card>
  )
}

function WeatherForecast() {
  const weatherData = {
    current: { temp: 22, humidity: 60, windSpeed: 5 },
    forecast: [
      { day: 'Mon', temp: 23, icon: '☀️' },
      { day: 'Tue', temp: 25, icon: '🌤️' },
      { day: 'Wed', temp: 21, icon: '🌧️' },
      { day: 'Thu', temp: 20, icon: '⛈️' },
      { day: 'Fri', temp: 22, icon: '🌤️' },
    ]
  }

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 p-6 text-white">
        <CardTitle className="text-2xl font-bold">Smart Weather Insights</CardTitle>
        <CardDescription className="text-blue-100">AI-powered weather analysis for optimal farming decisions</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="flex justify-between items-center mb-6 bg-gradient-to-r from-blue-100 to-indigo-100 p-4 rounded-lg">
          <div>
            <h3 className="text-3xl font-bold text-blue-800">{weatherData.current.temp}°C</h3>
            <p className="text-gray-600">Current Temperature</p>
          </div>
          <div className="flex space-x-4">
            <div className="flex items-center">
              <CloudRain className="w-6 h-6 mr-2 text-blue-600" />
              <span>{weatherData.current.humidity}% Humidity</span>
            </div>
            <div className="flex items-center">
              <Wind className="w-6 h-6 mr-2 text-blue-600" />
              <span>{weatherData.current.windSpeed} m/s Wind</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {weatherData.forecast.map((day, index) => (
            <motion.div 
              key={index} 
              className="text-center bg-white p-4 rounded-lg shadow-md transition-all duration-300 hover:shadow-lg"
              whileHover={{ scale: 1.05 }}
            >
              <p className="font-semibold text-gray-700">{day.day}</p>
              <p className="text-3xl my-2">{day.icon}</p>
              <p className="text-blue-600 font-bold">{day.temp}°C</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <h4 className="text-blue-800 font-semibold mb-2">AI Weather Insight:</h4>
          <p className="text-blue-700">Based on the forecast, Wednesday&apos;s rain may provide optimal conditions for fertilizer application. Consider scheduling your next application then for maximum efficiency.</p>
        </div>
      </CardContent>
    </Card>
  )
}

function HistoryDashboard({ history }: { history: HistoryItem[] }) {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 p-6 text-white">
        <CardTitle className="text-2xl font-bold">Smart Farming History</CardTitle>
        <CardDescription className="text-purple-100">Track your farm&apos;s progress and AI-powered insights over time</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {history.length > 0 ? (
            history.map((item, index) => (
              <motion.div 
                key={index} 
                className="bg-white shadow rounded-lg p-4 flex items-center justify-between transition-all duration-300 hover:shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{item.cropName}</h3>
                  <p className="text-sm text-gray-500">{item.date.toLocaleDateString()}</p>
                </div>
                <p className="text-green-700 font-semibold">{item.recommendation}</p>
              </motion.div>
            ))
          ) : (
            <p className="text-center text-gray-500">No history available. Start by getting a recommendation!</p>
          )}
        </div>
        {history.length > 0 && (
          <div className="mt-6 p-4 bg-purple-50 rounded-lg">
            <h4 className="text-purple-800 font-semibold mb-2">AI Trend Analysis:</h4>
            <p className="text-purple-700">Based on your history, we&apos;ve noticed a trend towards increased nitrogen needs. This could be due to changing soil conditions or crop rotation patterns. Consider soil testing to confirm and adjust your fertilization strategy accordingly.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function LoginSignup({ onLogin }: LoginSignupProps) {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error('Please fill in all fields')
      return
    }
    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match')
      return
    }
    // Simulate login/signup
    setTimeout(() => {
      onLogin()
      toast.success(isLogin ? 'Logged in successfully' : 'Signed up successfully')
    }, 1000)
  }

  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-6 text-white">
        <CardTitle className="text-2xl font-bold">{isLogin ? 'Login' : 'Sign Up'}</CardTitle>
        <CardDescription className="text-green-100">
          {isLogin ? 'Access your smart farming dashboard' : 'Join our community of innovative farmers'}
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700">Email</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Enter your email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gray-300"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-gray-700">Password</Label>
            <Input 
              id="password" 
              type="password" 
              placeholder="Enter your password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border-gray-300"
            />
          </div>
          {!isLogin && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
              <Input 
                id="confirmPassword" 
                type="password" 
                placeholder="Confirm your password" 
                required 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="border-gray-300"
              />
            </div>
          )}
          <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white transition-all duration-300">
            {isLogin ? 'Login' : 'Sign Up'}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <Button variant="link" onClick={() => setIsLogin(!isLogin)} className="text-blue-600 hover:text-blue-700">
            {isLogin ? "Don&apos;t have an account? Sign up" : "Already have an account? Login"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AccountDashboard({ onLogout }: AccountDashboardProps) {
  return (
    <Card className="bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 p-6 text-white">
        <CardTitle className="text-2xl font-bold">Smart Farmer Dashboard</CardTitle>
        <CardDescription className="text-green-100">Manage your account and view personalized insights</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
              <UserPlus className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-gray-500">john.doe@example.com</p>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="font-semibold">Account Details</h4>
            <p>Member since: January 1, 2023</p>
            <p>Last login: Today at 9:00 AM</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-lg">
            <h4 className="text-blue-800 font-semibold mb-2">AI Farming Insight:</h4>
            <p className="text-blue-700">Based on your recent activity, we recommend exploring our new precision irrigation feature. It could help you reduce water usage by up to 20% while maintaining crop health.</p>
          </div>
          <Button onClick={onLogout} className="w-full bg-red-500 hover:bg-red-600 text-white transition-all duration-300">
            Logout
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}