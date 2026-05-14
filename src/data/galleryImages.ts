import img1 from '../assets/images/1.jpg';
import img2 from '../assets/images/2.jpg';
import img3 from '../assets/images/3.jpg';
import img4 from '../assets/images/4.jpg';
import img5 from '../assets/images/5.jpg';

export type SiteLanguage = 'fr' | 'ar';

export type GalleryImage = {
  id: 'img1' | 'img2' | 'img3' | 'img4' | 'img5';
  src: string;
  width: number;
  height: number;
  category: 'billard' | 'snooker' | 'lounge' | 'events';
  title: Record<SiteLanguage, string>;
  alt: Record<SiteLanguage, string>;
};

export const galleryImages = {
  img1: {
    id: 'img1',
    src: img1,
    width: 1280,
    height: 960,
    category: 'snooker',
    title: {
      fr: 'Snooker professionnel',
      ar: 'سنوكر احترافي',
    },
    alt: {
      fr: 'Table de snooker professionnelle',
      ar: 'طاولة سنوكر احترافية',
    },
  },
  img2: {
    id: 'img2',
    src: img2,
    width: 896,
    height: 1109,
    category: 'billard',
    title: {
      fr: 'Billard entre amis',
      ar: 'بلياردو بين الأصدقاء',
    },
    alt: {
      fr: 'Partie de billard entre amis',
      ar: 'مباراة بلياردو بين الأصدقاء',
    },
  },
  img3: {
    id: 'img3',
    src: img3,
    width: 896,
    height: 1114,
    category: 'lounge',
    title: {
      fr: 'Ambiance lounge premium',
      ar: 'أجواء راقية داخل القاعة',
    },
    alt: {
      fr: 'Ambiance premium du lounge',
      ar: 'أجواء راقية داخل القاعة',
    },
  },
  img4: {
    id: 'img4',
    src: img4,
    width: 1194,
    height: 810,
    category: 'events',
    title: {
      fr: 'Tournoi de billard',
      ar: 'بطولة بلياردو',
    },
    alt: {
      fr: 'Tournoi de billard',
      ar: 'بطولة بلياردو',
    },
  },
  img5: {
    id: 'img5',
    src: img5,
    width: 1194,
    height: 896,
    category: 'lounge',
    title: {
      fr: "Expérience Prestige de jeux",
      ar: 'تجربة بريستيج دو جو',
    },
    alt: {
      fr: "Clients profitant de l'expérience Prestige de jeux",
      ar: 'زبناء يستمتعون بتجربة بريستيج دو جو',
    },
  },
} as const satisfies Record<string, GalleryImage>;

export const heroImage = galleryImages.img5;
export const aboutImage = galleryImages.img3;
export const tournamentImage = galleryImages.img4;

export const serviceImages = {
  billiard: galleryImages.img1,
  snooker: galleryImages.img4,
  cafeRestaurant: galleryImages.img3,
  events: galleryImages.img5,
} as const;

export const galleryImageList = [
  galleryImages.img1,
  galleryImages.img2,
  galleryImages.img3,
  galleryImages.img4,
  galleryImages.img5,
] as const;

export function imageAlt(image: GalleryImage, lang: SiteLanguage) {
  return image.alt[lang];
}
