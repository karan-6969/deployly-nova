
export interface DeployedSite {
  id: string;
  name: string;
  url: string;
  status: 'live' | 'building' | 'failed';
  deployedAt: string;
  visits: number;
}

export interface StoredImage {
  id: string;
  name: string;
  url: string;
  size: string;
  uploadedAt: string;
}

// Mock data for deployed sites
export const mockDeployedSites: DeployedSite[] = [
  {
    id: '1',
    name: 'portfolio-site',
    url: 'https://portfolio-site.deployly.app',
    status: 'live',
    deployedAt: '2 hours ago',
    visits: 243
  },
  {
    id: '2',
    name: 'react-dashboard',
    url: 'https://react-dashboard.deployly.app',
    status: 'live',
    deployedAt: '1 day ago',
    visits: 1208
  },
  {
    id: '3',
    name: 'landing-page',
    url: 'https://landing-page.deployly.app',
    status: 'building',
    deployedAt: 'Just now',
    visits: 0
  },
  {
    id: '4',
    name: 'ecommerce-demo',
    url: 'https://ecommerce-demo.deployly.app',
    status: 'failed',
    deployedAt: '3 days ago',
    visits: 18
  }
];

// Mock data for stored images
export const mockStoredImages: StoredImage[] = [
  {
    id: '1',
    name: 'hero-image.jpg',
    url: 'https://images.unsplash.com/photo-1605379399642-870262d3d051',
    size: '1.2 MB',
    uploadedAt: '2 hours ago'
  },
  {
    id: '2',
    name: 'profile-pic.png',
    url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    size: '450 KB',
    uploadedAt: '1 day ago'
  },
  {
    id: '3',
    name: 'banner.jpg',
    url: 'https://images.unsplash.com/photo-1543599538-a6c4f6cc5c05',
    size: '2.3 MB',
    uploadedAt: '3 days ago'
  },
  {
    id: '4',
    name: 'product.png',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e',
    size: '820 KB',
    uploadedAt: '1 week ago'
  },
  {
    id: '5',
    name: 'background.jpg',
    url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab',
    size: '1.8 MB',
    uploadedAt: '2 weeks ago'
  },
  {
    id: '6',
    name: 'icon.svg',
    url: 'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e',
    size: '24 KB',
    uploadedAt: '1 month ago'
  }
];

// Mock API key
export const mockApiKey = 'dply_img_6a8f9c2d3e7b5a1f0e9d8c7b6a5f4e3d2c1b0a9f';

// Get deployed sites
export const getDeployedSites = (): Promise<DeployedSite[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockDeployedSites);
    }, 800);
  });
};

// Get stored images
export const getStoredImages = (): Promise<StoredImage[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStoredImages);
    }, 800);
  });
};

// Get API key
export const getApiKey = (): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockApiKey);
    }, 600);
  });
};
