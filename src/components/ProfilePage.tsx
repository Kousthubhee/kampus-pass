import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Settings, Award, Calendar, BookOpen, Target } from 'lucide-react';
import { useState } from 'react';

export const ProfilePage = () => {
  const [isVFSPopupOpen, setIsVFSPopupOpen] = useState(false);

  const userStats = [
    { label: 'Modules Completed', value: '3/7', icon: Target },
    { label: 'Keys Earned', value: '3', icon: Award },
    { label: 'Days Active', value: '15', icon: Calendar },
    { label: 'Lessons Learned', value: '12', icon: BookOpen }
  ];

  const achievements = [
    { title: 'First Steps', description: 'Completed your first module', icon: '🎯', earned: true },
    { title: 'Key Collector', description: 'Earned 5 keys', icon: '🗝️', earned: false },
    { title: 'French Speaker', description: 'Completed 10 language lessons', icon: '🇫🇷', earned: false },
    { title: 'Community Helper', description: 'Helped 5 fellow students', icon: '🤝', earned: false }
  ];

  const recentActivity = [
    { action: 'Completed School module', time: '2 hours ago', type: 'completion' },
    { action: 'Earned a key 🗝️', time: '2 hours ago', type: 'achievement' },
    { action: 'Started Pre-Arrival Checklist (Part 1)', time: '1 day ago', type: 'start' },
    { action: 'Joined Community Hub', time: '3 days ago', type: 'join' }
  ];

  const modules = [
    {
      category: 'Pre-Arrival',
      items: [
        {
          name: 'VFS Visa Application',
          progress: 50,
          details: {
            documents: [
              'Valid passport (valid for at least 3 months after return)',
              'Campus France authorization letter',
              'Two recent passport-sized photos',
              'Acceptance letter from French institution',
              'Proof of financial resources (€615/month or bank statement)',
              'Proof of accommodation in France',
              'Health insurance coverage',
              'Academic transcripts and certificates',
              'Visa application form (completed)',
              'Proof of payment for Campus France fee'
            ],
            process: [
              'Complete Campus France procedure online',
              'Schedule VFS Global appointment',
              'Submit documents at VFS center',
              'Attend biometric data collection',
              'Track application status online',
              'Collect visa from VFS center'
            ],
            fees: [
              'Campus France fee: €50-€100 (varies by country)',
              'VFS service fee: €40 (approx.)',
              'Visa fee: €80 for long-stay student visa'
            ]
          }
        },
        { name: 'Campus France Procedure', progress: 30 },
        { name: 'Travel Arrangements', progress: 10 }
      ]
    },
    {
      category: 'Post-Arrival',
      items: [
        { name: 'OFII Registration', progress: 0 },
        { name: 'Bank Account Setup', progress: 0 },
        { name: 'Housing Registration', progress: 0 }
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <User className="h-8 w-8 mr-3 text-blue-600" />
          Profile
        </h1>
        <p className="text-lg text-gray-600">
          Track your progress and manage your learning journey
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl mr-4">
                    👨‍🎓
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Student Name</h2>
                    <p className="text-gray-600">Future student in France</p>
                    <div className="text-sm text-gray-500 mt-1">
                      Member since December 2024
                    </div>
                  </div>
                </div>
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Edit Profile
                </Button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {userStats.map((stat, index) => {
                  const Icon = stat.icon;
                  return (
                    <div key={index} className="text-center bg-gray-50 p-4 rounded-lg">
                      <Icon className="h-6 w-6 mx-auto mb-2 text-blue-600" />
                      <div className="text-lg font-semibold text-gray-900">{stat.value}</div>
                      <div className="text-xs text-gray-600">{stat.label}</div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center">
                    <div className={`w-3 h-3 rounded-full mr-4 ${
                      activity.type === 'completion' ? 'bg-green-500' :
                      activity.type === 'achievement' ? 'bg-yellow-500' :
                      activity.type === 'start' ? 'bg-blue-500' :
                      'bg-purple-500'
                    }`} />
                    <div className="flex-1">
                      <div className="text-gray-900">{activity.action}</div>
                      <div className="text-sm text-gray-500">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Learning Modules</h3>
              <div className="space-y-6">
                {modules.map((category, index) => (
                  <div key={index}>
                    <h4 className="text-md font-medium text-gray-800 mb-3">{category.category}</h4>
                    <div className="space-y-4">
                      {category.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <div className="flex justify-between mb-2">
                            <span 
                              className={`text-gray-700 ${item.name === 'VFS Visa Application' ? 'cursor-pointer text-blue-600 hover:underline' : ''}`}
                              onClick={item.name === 'VFS Visa Application' ? () => setIsVFSPopupOpen(true) : null}
                            >
                              {item.name}
                            </span>
                            <span className="text-gray-600">{item.progress}%</span>
                          </div>
                          <div className="bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full" 
                              style={{ width: `${item.progress}%` }} 
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Achievements</h3>
              <div className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className={`flex items-center p-3 rounded-lg ${
                    achievement.earned ? 'bg-green-50 border border-green-200' : 'bg-gray-50'
                  }`}>
                    <div className="text-2xl mr-3">{achievement.icon}</div>
                    <div>
                      <div className={`font-medium ${
                        achievement.earned ? 'text-green-900' : 'text-gray-700'
                      }`}>
                        {achievement.title}
                      </div>
                      <div className={`text-sm ${
                        achievement.earned ? 'text-green-700' : 'text-gray-500'
                      }`}>
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Next Steps</h3>
              <div className="space-y-3">
                <div className="bg-blue-50 p-3 rounded-lg">
                  <div className="font-medium text-blue-900">Complete Local Insights</div>
                  <div className="text-sm text-blue-700">Learn about your destination city</div>
                </div>
                <div className="bg-purple-50 p-3 rounded-lg">
                  <div className="font-medium text-purple-900">Join Community Discussions</div>
                  <div className="text-sm text-purple-700">Connect with fellow students</div>
                </div>
                <div className="bg-green-50 p-3 rounded-lg">
                  <div className="font-medium text-green-900">Practice French Daily</div>
                  <div className="text-sm text-green-700">Improve your language skills</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  📧 Email Preferences
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🔔 Notification Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  🌍 Language & Region
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  📱 Export Data
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {isVFSPopupOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">VFS Visa Application</h3>
            <div className="space-y-4">
              <div>
                <h4 className="text-md font-medium text-gray-800">Required Documents</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {modules[0].items[0].details.documents.map((doc, index) => (
                    <li key={index}>{doc}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-800">Application Process</h4>
                <ol className="list-decimal pl-5 text-gray-600">
                  {modules[0].items[0].details.process.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
              </div>
              <div>
                <h4 className="text-md font-medium text-gray-800">Fees</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  {modules[0].items[0].details.fees.map((fee, index) => (
                    <li key={index}>{fee}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={() => setIsVFSPopupOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};