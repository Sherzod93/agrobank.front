export enum SocialNetwork {
  facebook = 'facebook',
  instagram = 'instagram',
  share = 'share',
  telegram = 'telegram',
  twitter = 'twitter',
  vk = 'vk',
}

export interface SocialNetworkLink {
  title: string;
  type: SocialNetwork;
  url: string;
}
