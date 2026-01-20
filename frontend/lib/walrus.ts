/**
 * Walrus integration utilities
 * For storing and retrieving event data on Walrus decentralized storage
 */

const WALRUS_PUBLISHER_URL = process.env.NEXT_PUBLIC_WALRUS_PUBLISHER_URL || 'https://publisher.walrus-testnet.walrus.space';
const WALRUS_AGGREGATOR_URL = process.env.NEXT_PUBLIC_WALRUS_AGGREGATOR_URL || 'https://aggregator.walrus-testnet.walrus.space';

export interface EventData {
  name: string;
  description: string;
  location: string;
  imageUrl?: string;
  additionalInfo?: Record<string, any>;
}

/**
 * Upload event data to Walrus
 * @param eventData - Event data to upload
 * @returns Blob ID for the uploaded data
 */
export async function uploadToWalrus(eventData: EventData): Promise<string> {
  try {
    const response = await fetch(`${WALRUS_PUBLISHER_URL}/v1/store`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventData),
    });

    if (!response.ok) {
      throw new Error('Failed to upload to Walrus');
    }

    const result = await response.json();
    
    // Extract blob ID from response
    if (result.newlyCreated) {
      return result.newlyCreated.blobObject.blobId;
    } else if (result.alreadyCertified) {
      return result.alreadyCertified.blobId;
    }
    
    throw new Error('Invalid response from Walrus');
  } catch (error) {
    console.error('Error uploading to Walrus:', error);
    throw error;
  }
}

/**
 * Retrieve event data from Walrus
 * @param blobId - Blob ID to retrieve
 * @returns Event data
 */
export async function retrieveFromWalrus(blobId: string): Promise<EventData> {
  try {
    const response = await fetch(`${WALRUS_AGGREGATOR_URL}/v1/${blobId}`);

    if (!response.ok) {
      throw new Error('Failed to retrieve from Walrus');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error retrieving from Walrus:', error);
    throw error;
  }
}

/**
 * Upload an image file to Walrus
 * @param file - Image file to upload
 * @returns Blob ID for the uploaded image
 */
export async function uploadImageToWalrus(file: File): Promise<string> {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${WALRUS_PUBLISHER_URL}/v1/store`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image to Walrus');
    }

    const result = await response.json();
    
    if (result.newlyCreated) {
      return result.newlyCreated.blobObject.blobId;
    } else if (result.alreadyCertified) {
      return result.alreadyCertified.blobId;
    }
    
    throw new Error('Invalid response from Walrus');
  } catch (error) {
    console.error('Error uploading image to Walrus:', error);
    throw error;
  }
}

/**
 * Get Walrus blob URL for direct access
 * @param blobId - Blob ID
 * @returns URL to access the blob
 */
export function getWalrusBlobUrl(blobId: string): string {
  return `${WALRUS_AGGREGATOR_URL}/v1/${blobId}`;
}
