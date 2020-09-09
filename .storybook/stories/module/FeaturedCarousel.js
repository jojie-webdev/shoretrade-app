import React from 'react';

import { storiesOf } from '@storybook/react';

import FeaturedCarousel from '../../../src/components/module/FeaturedCarousel';
import Container from '../../components/Container';

const slides = [
  {
    id: "1",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/f8eb44ae-eef7-410a-8b39-de72bcedd629/d2cc7kv-0ab09a89-35fa-4db5-9610-95623e11d73c.jpg/v1/fill/w_325,h_250,q_70,strp/premade_background_224_by_ashensorrow_d2cc7kv-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9Nzg4IiwicGF0aCI6IlwvZlwvZjhlYjQ0YWUtZWVmNy00MTBhLThiMzktZGU3MmJjZWRkNjI5XC9kMmNjN2t2LTBhYjA5YTg5LTM1ZmEtNGRiNS05NjEwLTk1NjIzZTExZDczYy5qcGciLCJ3aWR0aCI6Ijw9MTAyNCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.jdTY6caVkJks2jlPPKcEcbgKJgfWstBYwHyn99CgbfM"
  },
  {
    id: "2",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/b1ea0a56-cb90-44db-9c9b-bd9ef9e13d11/d2dedgk-a4ad4fde-e49e-40d4-b8d4-f51faf561742.jpg/v1/fill/w_325,h_250,q_70,strp/back_to_summer_by_kariliimatainen_d2dedgk-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjE2IiwicGF0aCI6IlwvZlwvYjFlYTBhNTYtY2I5MC00NGRiLTljOWItYmQ5ZWY5ZTEzZDExXC9kMmRlZGdrLWE0YWQ0ZmRlLWU0OWUtNDBkNC1iOGQ0LWY1MWZhZjU2MTc0Mi5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.UFZT0alUzhbmdMxT-IAq2YBJn7QYyO-z8OMN3-3jJaU"
  },
  {
    id: "3",
    image:
      "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2c18c543-0b3d-463b-8940-f19853c7637c/d2n55fp-5d912a3f-7273-487f-a13c-e9e43378c6de.jpg/v1/fill/w_325,h_250,q_70,strp/m_i_a_m_i_p_a_l_m_s_by_aliwithaneye_d2n55fp-250t.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjE1IiwicGF0aCI6IlwvZlwvMmMxOGM1NDMtMGIzZC00NjNiLTg5NDAtZjE5ODUzYzc2MzdjXC9kMm41NWZwLTVkOTEyYTNmLTcyNzMtNDg3Zi1hMTNjLWU5ZTQzMzc4YzZkZS5qcGciLCJ3aWR0aCI6Ijw9ODAwIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmltYWdlLm9wZXJhdGlvbnMiXX0.Ow4xHgDxyfY2DRNmjcZDjVZ97BvA9tGQBn-pVepbgTk"
  },
  {
    id: "4",
    image:
      "http://www.madeira-levada-walking.com/images/levadas/madeira-lagos-vistas-sudoeste.jpg"
  },
  {
    id: "5",
    image:
      "https://www.pacificforest.org/wp-content/uploads/2019/05/waterfall-or-325x487-325x250.jpg"
  }
];

storiesOf('module/FeaturedCarousel', module).add('Summary', () => (
  <Container appType="buyer">
    <FeaturedCarousel slides={slides}>
      {(slide) => (
          <img
            id={slide.id}
            src={slide.image}
            alt="nature landscape"
          />
      )}
    </FeaturedCarousel>
  </Container>
));
