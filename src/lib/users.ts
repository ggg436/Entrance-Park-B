import { 
  collection,
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  updateDoc, 
  arrayUnion, 
  arrayRemove,
  increment,
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';
import { initializeUserProfile } from './initializeUserProfiles';

export interface UserProfile {
  id: string;
  displayName: string;
  photoURL: string;
  handle: string;
  userType?: 'agency' | 'user';  // Updated from 'farmer' to 'agency'
  followers: string[]; // Array of user IDs who follow this user
  following: string[]; // Array of user IDs this user follows
  followersCount: number;
  followingCount: number;
  isAdmin?: boolean; // Added for admin access
}

// Get user profile by ID
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    // If user doesn't exist, try to initialize it
    if (!userDoc.exists()) {
      return await initializeUserProfile(userId);
    }
    
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
  } catch (error) {
    console.error("Error getting user profile:", error);
    throw error;
  }
};

// Get current user's profile
export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  
  try {
    return await getUserProfile(currentUser.uid);
  } catch (error) {
    console.error("Error getting current user profile:", error);
    return null;
  }
};

// Follow a user
export const followUser = async (targetUserId: string): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");
    
    if (currentUser.uid === targetUserId) {
      throw new Error("You cannot follow yourself");
    }
    
    // Ensure current user profile exists
    await initializeUserProfile(currentUser.uid);
    
    // Ensure target user profile exists
    await initializeUserProfile(targetUserId);
    
    // Update current user's following list
    const currentUserRef = doc(db, 'users', currentUser.uid);
    await updateDoc(currentUserRef, {
      following: arrayUnion(targetUserId),
      followingCount: increment(1),
      updatedAt: serverTimestamp()
    });
    
    // Update target user's followers list
    const targetUserRef = doc(db, 'users', targetUserId);
    await updateDoc(targetUserRef, {
      followers: arrayUnion(currentUser.uid),
      followersCount: increment(1),
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error("Error following user:", error);
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (targetUserId: string): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) throw new Error("User not authenticated");
    
    // Update current user's following list
    const currentUserRef = doc(db, 'users', currentUser.uid);
    await updateDoc(currentUserRef, {
      following: arrayRemove(targetUserId),
      followingCount: increment(-1),
      updatedAt: serverTimestamp()
    });
    
    // Update target user's followers list
    const targetUserRef = doc(db, 'users', targetUserId);
    await updateDoc(targetUserRef, {
      followers: arrayRemove(currentUser.uid),
      followersCount: increment(-1),
      updatedAt: serverTimestamp()
    });
    
    return true;
  } catch (error) {
    console.error("Error unfollowing user:", error);
    throw error;
  }
};

// Check if current user follows a specific user
export const checkIfFollowing = async (targetUserId: string): Promise<boolean> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) return false;
    
    const currentUserRef = doc(db, 'users', currentUser.uid);
    const currentUserDoc = await getDoc(currentUserRef);
    
    if (!currentUserDoc.exists()) return false;
    
    const userData = currentUserDoc.data();
    const following = userData.following || [];
    
    return following.includes(targetUserId);
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
};

// Toggle follow status (follow if not following, unfollow if following)
export const toggleFollowUser = async (targetUserId: string): Promise<{ isFollowing: boolean }> => {
  try {
    const isFollowing = await checkIfFollowing(targetUserId);
    
    if (isFollowing) {
      await unfollowUser(targetUserId);
      return { isFollowing: false };
    } else {
      await followUser(targetUserId);
      return { isFollowing: true };
    }
  } catch (error) {
    console.error("Error toggling follow status:", error);
    throw error;
  }
}; 