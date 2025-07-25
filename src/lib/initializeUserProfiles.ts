import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db, auth } from './firebase';
import { UserProfile } from './users';

// Initialize a user profile with default values if it doesn't exist
export const initializeUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    // First, check if profile already exists
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    // If user profile already exists, return it
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return {
        id: userDoc.id,
        displayName: userData.displayName || 'Anonymous',
        photoURL: userData.photoURL || '/placeholder.svg',
        handle: userData.handle || `@${userData.displayName?.toLowerCase().replace(/\s/g, '') || 'anonymous'}`,
        userType: userData.userType || 'user', // Default to 'user' if not specified
        followers: userData.followers || [],
        following: userData.following || [],
        followersCount: userData.followersCount || 0,
        followingCount: userData.followingCount || 0,
        isAdmin: userData.isAdmin || false
      };
    }
    
    // Get user information from Firebase Auth
    const currentUser = auth.currentUser;
    if (!currentUser && !userId) return null;
    
    // If creating a profile for the current user, use auth user info
    const userEmail = currentUser?.email || '';
    const displayName = currentUser?.displayName || userEmail?.split('@')[0] || 'Anonymous';
    const photoURL = currentUser?.photoURL || '/placeholder.svg';
    const handle = `@${displayName.toLowerCase().replace(/\s/g, '') || 'anonymous'}`;
    
    // Create default profile data
    const userData = {
      displayName,
      email: userEmail,
      photoURL,
      handle,
      userType: 'user', // Default to 'user'
      followers: [],
      following: [],
      followersCount: 0,
      followingCount: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      isAdmin: userEmail === 'sanjokgharti01@gmail.com' // Mark as admin if it's the designated admin email
    };
    
    // Create the user profile in Firestore
    await setDoc(doc(db, 'users', userId), userData);
    
    // Return the newly created profile
    return {
      id: userId,
      displayName,
      photoURL,
      handle,
      userType: 'user',
      followers: [],
      following: [],
      followersCount: 0,
      followingCount: 0,
      isAdmin: userEmail === 'sanjokgharti01@gmail.com'
    };
    
  } catch (error) {
    console.error("Error initializing user profile:", error);
    return null;
  }
};

// Initialize all test user profiles
export const initializeAllUserProfiles = async (): Promise<void> => {
  try {
    // This would be used for testing or seeding data
    console.log("Initializing all user profiles");
  } catch (error) {
    console.error("Error initializing all user profiles:", error);
  }
}; 