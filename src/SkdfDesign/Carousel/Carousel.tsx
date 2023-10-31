import { useLayoutEffect, useState, useRef } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classNames from 'classnames';

import SkdfIcon from '../../components/SkdfIcon';
import classes from './Carousel.module.scss';

const slides = new Array(6).fill(['https://via.placeholder.com/800x800', 'https://via.placeholder.com/600x600']).flat();

const thumbWidth = 86;
const thumbOffset = 4;
const thumb = thumbWidth + thumbOffset;

function SkdfCarousel() {
  const thumbsRef = useRef<HTMLDivElement>(null);
  const { current: block } = thumbsRef;

  const [activeSlide, setActiveSlide] = useState(0);

  useLayoutEffect(() => {
    if (block) {
      block.scrollLeft = activeSlide * thumb - thumb / 2 - 1;
    }
  }, [activeSlide, block]);

  return (
    <>
      <Carousel
        fade
        indicators={false}
        interval={null}
        activeIndex={activeSlide}
        onSelect={(index) => setActiveSlide(index)}
        prevIcon={<SkdfIcon name="arrow_left" />}
        nextIcon={<SkdfIcon name="arrow_right" />}
        className="skdf"
      >
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img src={slide} className={classes.slide} alt={`Slide ${index}`} />
          </Carousel.Item>
        ))}
      </Carousel>
      <div
        ref={thumbsRef}
        className={classNames(classes.thumbnails, {
          [classes.thumbnailsCenter]: slides.length < 7,
        })}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className={classNames(classes.thumb, {
              [classes.thumbActive]: index === activeSlide,
            })}
            onClick={() => setActiveSlide(index)}
          >
            <img src={slide} className={classes.image} alt={`Slide ${index}`} />
          </div>
        ))}
      </div>
    </>
  );
}

export default SkdfCarousel;
