import React, { useState, useEffect } from 'react';
import { useAuthContext } from '@/lib/AuthProvider';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { collection, getDocs, doc, updateDoc, query, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { ArrowLeft, Users, Settings, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserData {
  id: string;
  email: string;
  displayName: string;
  userType: 'agency' | 'user';
  isAdmin?: boolean;
  createdAt: Date;
}

const Admin = () => {
  const { user } = useAuthContext();
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState('users');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const usersRef = collection(db, 'users');
        const usersSnapshot = await getDocs(usersRef);
        
        const usersData: UserData[] = [];
        usersSnapshot.forEach((doc) => {
          const data = doc.data();
          usersData.push({
            id: doc.id,
            email: data.email || 'No email',
            displayName: data.displayName || 'Anonymous',
            userType: data.userType || 'user',
            isAdmin: data.isAdmin || false,
            createdAt: data.createdAt?.toDate() || new Date()
          });
        });
        
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchUsers();
  }, []);

  const changeUserType = async (userId: string, newType: 'agency' | 'user') => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        userType: newType,
        updatedAt: new Date()
      });
      
      setUsers(users.map(u => u.id === userId ? {...u, userType: newType} : u));
    } catch (error) {
      console.error('Error changing user type:', error);
    }
  };

  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const userRef = doc(db, 'users', userId);
      await updateDoc(userRef, {
        isAdmin: !currentStatus,
        updatedAt: new Date()
      });
      
      setUsers(users.map(u => u.id === userId ? {...u, isAdmin: !currentStatus} : u));
    } catch (error) {
      console.error('Error toggling admin status:', error);
    }
  };

  if (!user || user.email !== 'sanjokgharti01@gmail.com') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <Card className="w-[350px]">
          <CardHeader>
            <CardTitle>Access Denied</CardTitle>
            <CardDescription>You don't have permission to view this page.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/dashboard">Go Back to Dashboard</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 flex items-center">
          <Button variant="ghost" asChild className="mr-4">
            <Link to="/dashboard">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>

        <Tabs defaultValue="users" value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="users">
              <Users className="mr-2 h-4 w-4" />
              Users
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>Manage users and permissions</CardDescription>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center py-8">Loading users...</div>
                ) : (
                  <div className="rounded-md border">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            User
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Type
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Admin
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {users.map((user) => (
                          <tr key={user.id}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="font-medium">{user.displayName}</div>
                              <div className="text-sm text-gray-500">ID: {user.id.substring(0, 8)}...</div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.email}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                user.userType === 'agency' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {user.userType}
                              </span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              {user.isAdmin ? (
                                <Shield className="h-5 w-5 text-green-500" />
                              ) : (
                                <span className="text-gray-400">-</span>
                              )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => changeUserType(
                                  user.id, 
                                  user.userType === 'agency' ? 'user' : 'agency'
                                )}
                              >
                                Make {user.userType === 'agency' ? 'User' : 'Agency'}
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant={user.isAdmin ? "destructive" : "outline"}
                                onClick={() => toggleAdmin(user.id, !!user.isAdmin)}
                              >
                                {user.isAdmin ? 'Remove Admin' : 'Make Admin'}
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Configure global settings for the application</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="siteTitle">Site Title</Label>
                    <Input id="siteTitle" defaultValue="CareerBoost" />
                  </div>
                  
                  <div>
                    <Label htmlFor="adminEmail">Admin Email</Label>
                    <Input id="adminEmail" defaultValue="sanjokgharti01@gmail.com" disabled />
                    <p className="text-sm text-gray-500 mt-1">This email has full admin privileges</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin; 