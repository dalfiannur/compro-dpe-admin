export interface Banner {
  id: number;
  imageSource: string;
  imageSourceUrl: string;
  imageSourceCropped: string;
  imageSourceCroppedUrl: string;
  title: string;
  subTitle: string;
  createdAt: string;
}

export interface BannerDto extends Omit<Banner, 'id'|'imageSourceUrl'|'imageSourceCroppedUrl'|'createdAt'> {
  
}