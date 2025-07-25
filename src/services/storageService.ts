// Keys for local storage
const CV_DATA_KEY = 'cv_maker_data';
const CV_DRAFTS_KEY = 'cv_maker_drafts';

export interface CVDraft {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  data: any;
}

// Save CV data to local storage
export const saveCV = (data: any): boolean => {
  try {
    localStorage.setItem(CV_DATA_KEY, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error('Error saving CV data to local storage:', error);
    return false;
  }
};

// Load CV data from local storage
export const loadCV = (): any => {
  try {
    const data = localStorage.getItem(CV_DATA_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading CV data from local storage:', error);
    return null;
  }
};

// Save CV as a named draft
export const saveCVDraft = (name: string, data: any): string => {
  try {
    // Load existing drafts
    const draftsJson = localStorage.getItem(CV_DRAFTS_KEY);
    const drafts: CVDraft[] = draftsJson ? JSON.parse(draftsJson) : [];
    
    // Create a new draft ID
    const id = `draft_${Date.now()}`;
    const now = new Date().toISOString();
    
    // Add new draft
    drafts.push({
      id,
      name,
      createdAt: now,
      updatedAt: now,
      data
    });
    
    // Save drafts back to storage
    localStorage.setItem(CV_DRAFTS_KEY, JSON.stringify(drafts));
    
    return id;
  } catch (error) {
    console.error('Error saving CV draft:', error);
    return '';
  }
};

// Update an existing draft
export const updateCVDraft = (id: string, data: any): boolean => {
  try {
    // Load existing drafts
    const draftsJson = localStorage.getItem(CV_DRAFTS_KEY);
    const drafts: CVDraft[] = draftsJson ? JSON.parse(draftsJson) : [];
    
    // Find the draft
    const draftIndex = drafts.findIndex(draft => draft.id === id);
    if (draftIndex === -1) return false;
    
    // Update the draft
    drafts[draftIndex] = {
      ...drafts[draftIndex],
      updatedAt: new Date().toISOString(),
      data
    };
    
    // Save drafts back to storage
    localStorage.setItem(CV_DRAFTS_KEY, JSON.stringify(drafts));
    
    return true;
  } catch (error) {
    console.error('Error updating CV draft:', error);
    return false;
  }
};

// Get all saved drafts
export const getAllCVDrafts = (): CVDraft[] => {
  try {
    const draftsJson = localStorage.getItem(CV_DRAFTS_KEY);
    return draftsJson ? JSON.parse(draftsJson) : [];
  } catch (error) {
    console.error('Error getting CV drafts:', error);
    return [];
  }
};

// Get a specific draft by ID
export const getCVDraftById = (id: string): CVDraft | null => {
  try {
    const drafts = getAllCVDrafts();
    return drafts.find(draft => draft.id === id) || null;
  } catch (error) {
    console.error('Error getting CV draft by ID:', error);
    return null;
  }
};

// Delete a draft by ID
export const deleteCVDraft = (id: string): boolean => {
  try {
    // Load existing drafts
    const drafts = getAllCVDrafts();
    
    // Filter out the draft to delete
    const updatedDrafts = drafts.filter(draft => draft.id !== id);
    
    // Save updated drafts back to storage
    localStorage.setItem(CV_DRAFTS_KEY, JSON.stringify(updatedDrafts));
    
    return true;
  } catch (error) {
    console.error('Error deleting CV draft:', error);
    return false;
  }
}; 