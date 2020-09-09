import { ReactNode } from "react";

export interface FeaturedCarouselProps {
    slides: any[];
    children: (props: any) => JSX.Element;
}
